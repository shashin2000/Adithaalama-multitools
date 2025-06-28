import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { QRGenerator } from './components/QRGenerator';
import { BarcodeGenerator } from './components/BarcodeGenerator';
import { PasswordGenerator } from './components/PasswordGenerator';
import { HashGenerator } from './components/HashGenerator';
import { Translator } from './components/Translator';
import { VideoDownloader } from './components/VideoDownloader';
import { ToolType } from './types';

function App() {
  const [activeTool, setActiveTool] = useState<ToolType>('qr');

  const renderTool = () => {
    console.log('Current active tool:', activeTool); // Debug log
    
    switch (activeTool) {
      case 'qr':
        return <QRGenerator />;
      case 'barcode':
        return <BarcodeGenerator />;
      case 'password':
        return <PasswordGenerator />;
      case 'hash':
        return <HashGenerator />;
      case 'translate':
        return <Translator />;
      case 'video-downloader':
        console.log('Rendering VideoDownloader component'); // Debug log
        return <VideoDownloader />;
      default:
        console.log('Unknown tool, defaulting to QR Generator');
        return <QRGenerator />;
    }
  };

  const handleSetActiveTool = (tool: ToolType) => {
    console.log('Setting active tool to:', tool); // Debug log
    setActiveTool(tool);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-red-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <Sidebar activeTool={activeTool} setActiveTool={handleSetActiveTool} />
      <main className="flex-1 overflow-auto relative z-10">
        <div className="p-8">
          <div className="animate-fadeIn">
            {renderTool()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;