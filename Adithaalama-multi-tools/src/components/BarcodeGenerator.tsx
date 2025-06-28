import React, { useState, useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import { Download, Copy, Check, Barcode } from 'lucide-react';

export function BarcodeGenerator() {
  const [text, setText] = useState('');
  const [format, setFormat] = useState('CODE128');
  const [barcodeDataUrl, setBarcodeDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formats = [
    { value: 'CODE128', label: 'CODE128' },
    { value: 'EAN13', label: 'EAN-13' },
    { value: 'EAN8', label: 'EAN-8' },
    { value: 'UPC', label: 'UPC' },
    { value: 'ITF14', label: 'ITF-14' },
    { value: 'MSI', label: 'MSI' },
    { value: 'pharmacode', label: 'Pharmacode' },
  ];

  const generateBarcode = () => {
    if (!text.trim() || !canvasRef.current) return;
    
    try {
      JsBarcode(canvasRef.current, text, {
        format: format,
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 14,
        textMargin: 5,
        background: '#ffffff',
        lineColor: '#000000',
      });
      
      const dataUrl = canvasRef.current.toDataURL();
      setBarcodeDataUrl(dataUrl);
    } catch (error) {
      console.error('Error generating barcode:', error);
      setBarcodeDataUrl('');
    }
  };

  const downloadBarcode = () => {
    if (!barcodeDataUrl) return;
    
    const link = document.createElement('a');
    link.download = 'barcode.png';
    link.href = barcodeDataUrl;
    link.click();
  };

  const copyToClipboard = async () => {
    if (!barcodeDataUrl) return;
    
    try {
      const response = await fetch(barcodeDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  useEffect(() => {
    if (text.trim()) {
      generateBarcode();
    }
  }, [text, format]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
            <Barcode className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Barcode Generator</h2>
            <p className="text-gray-600">Generate various types of barcodes</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Barcode Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or numbers..."
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Barcode Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
              >
                {formats.map((fmt) => (
                  <option key={fmt.value} value={fmt.value}>
                    {fmt.label}
                  </option>
                ))}
              </select>
            </div>
            
            {barcodeDataUrl && (
              <div className="flex space-x-3">
                <button
                  onClick={downloadBarcode}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-3 rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-200 font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center">
            {barcodeDataUrl ? (
              <div className="bg-gray-50 p-6 rounded-2xl max-w-full overflow-hidden">
                <img 
                  src={barcodeDataUrl} 
                  alt="Generated Barcode" 
                  className="w-full h-auto max-w-md"
                />
              </div>
            ) : (
              <div className="bg-gray-50 p-12 rounded-2xl text-center">
                <Barcode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Enter text to generate barcode</p>
              </div>
            )}
          </div>
        </div>
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}