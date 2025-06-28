import React from 'react';
import { 
  QrCode, 
  Barcode, 
  Key, 
  Hash, 
  Languages,
  Video,
  Sparkles
} from 'lucide-react';
import { ToolType } from '../types';

interface SidebarProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
}

const tools = [
  { id: 'qr' as ToolType, name: 'QR Generator', icon: QrCode, description: 'Generate QR codes', gradient: 'from-blue-500 to-purple-600' },
  { id: 'barcode' as ToolType, name: 'Barcode Generator', icon: Barcode, description: 'Create barcodes', gradient: 'from-green-500 to-teal-600' },
  { id: 'password' as ToolType, name: 'Password Generator', icon: Key, description: 'Secure passwords', gradient: 'from-purple-500 to-pink-600' },
  { id: 'hash' as ToolType, name: 'Hash Generator', icon: Hash, description: 'Hash passwords', gradient: 'from-orange-500 to-red-600' },
  { id: 'translate' as ToolType, name: 'Translator', icon: Languages, description: 'Translate text', gradient: 'from-indigo-500 to-blue-600' },
  { id: 'video-downloader' as ToolType, name: 'Video Downloader', icon: Video, description: 'Download videos', gradient: 'from-red-500 to-pink-600' },
];

export function Sidebar({ activeTool, setActiveTool }: SidebarProps) {
  const handleToolClick = (toolId: ToolType) => {
    console.log('Sidebar: Clicking tool:', toolId); // Debug log
    setActiveTool(toolId);
  };

  return (
    <div className="w-80 bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/70 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl shadow-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <img 
                  src="/logo.png" 
                  alt="Adithaalama Logo" 
                  className="w-full h-full object-contain rounded-xl bg-white/10 backdrop-blur-sm"
                />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Adithaalama
              </h1>
              <p className="text-sm text-gray-500">Premium Multi-Tool Suite</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-3">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            
            return (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden transform hover:scale-[1.02] ${
                  isActive
                    ? `bg-gradient-to-r ${tool.gradient} text-white shadow-xl shadow-blue-500/25`
                    : 'hover:bg-white/60 text-gray-700 hover:text-gray-900 hover:shadow-lg'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Animated background for active state */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50 animate-pulse"></div>
                )}
                
                <div className="flex items-center space-x-4 relative z-10">
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20 shadow-lg' 
                      : 'bg-gray-100 group-hover:bg-white group-hover:shadow-md'
                  }`}>
                    <Icon 
                      className={`w-5 h-5 transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                      }`} 
                    />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-gray-900'
                    }`}>
                      {tool.name}
                    </div>
                    <div className={`text-sm transition-all duration-300 ${
                      isActive ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {tool.description}
                    </div>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="w-2 h-8 bg-white/40 rounded-full animate-pulse"></div>
                  )}
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}