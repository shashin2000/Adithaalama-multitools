import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, Check, QrCode, Sparkles, Zap } from 'lucide-react';

export function QRGenerator() {
  const [text, setText] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    if (!text.trim()) return;
    
    try {
      const dataUrl = await QRCode.toDataURL(text, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrDataUrl(dataUrl);
      
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, text, {
          width: 300,
          margin: 2,
        });
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataUrl;
    link.click();
  };

  const copyToClipboard = async () => {
    if (!qrDataUrl) return;
    
    try {
      const response = await fetch(qrDataUrl);
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
      generateQR();
    }
  }, [text]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 card-enhanced">
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg animate-glow">
              <QrCode className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold gradient-text">QR Code Generator</h2>
            <p className="text-gray-600 text-lg">Create stunning QR codes for any text or URL</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-slideUp">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Enter text or URL
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com or any text..."
                className="w-full h-36 p-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-sm transition-all duration-300 bg-white/50 backdrop-blur-sm"
              />
            </div>
            
            {qrDataUrl && (
              <div className="flex space-x-4 animate-scaleIn">
                <button
                  onClick={downloadQR}
                  className="flex-1 flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 btn-enhanced"
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex-1 flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-4 rounded-2xl hover:bg-white transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-200"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center animate-fadeIn">
            {qrDataUrl ? (
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-xl border border-gray-100 animate-float">
                <img 
                  src={qrDataUrl} 
                  alt="Generated QR Code" 
                  className="w-full max-w-xs h-auto rounded-2xl shadow-lg"
                />
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span>Ready to scan!</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-white p-16 rounded-3xl text-center border-2 border-dashed border-gray-300">
                <QrCode className="w-20 h-20 text-gray-400 mx-auto mb-6 animate-pulse" />
                <p className="text-gray-500 text-lg font-medium">Enter text to generate QR code</p>
                <p className="text-gray-400 text-sm mt-2">Your QR code will appear here</p>
              </div>
            )}
          </div>
        </div>
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}