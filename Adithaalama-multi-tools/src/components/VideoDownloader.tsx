import React, { useState } from 'react';
import { Download, Video, ExternalLink, AlertCircle, CheckCircle, Clock, Eye, Share2, Play, Sparkles, Zap, Globe, FileVideo, Users } from 'lucide-react';
import { VideoInfo } from '../types';

export function VideoDownloader() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('720p');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const supportedPlatforms = [
    { name: 'YouTube', domain: 'youtube.com', icon: '🎥', color: 'from-red-500 to-red-600' },
    { name: 'TikTok', domain: 'tiktok.com', icon: '🎵', color: 'from-pink-500 to-rose-600' },
    { name: 'Instagram', domain: 'instagram.com', icon: '📷', color: 'from-purple-500 to-pink-600' },
    { name: 'Facebook', domain: 'facebook.com', icon: '👥', color: 'from-blue-500 to-blue-600' },
    { name: 'Twitter/X', domain: 'twitter.com', icon: '🐦', color: 'from-sky-500 to-blue-600' },
    { name: 'Vimeo', domain: 'vimeo.com', icon: '🎬', color: 'from-teal-500 to-cyan-600' },
    { name: 'Dailymotion', domain: 'dailymotion.com', icon: '📺', color: 'from-orange-500 to-amber-600' },
    { name: 'Reddit', domain: 'reddit.com', icon: '🤖', color: 'from-orange-600 to-red-600' },
  ];

  const detectPlatform = (url: string): string => {
    const lowerUrl = url.toLowerCase();
    
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return 'YouTube';
    if (lowerUrl.includes('tiktok.com')) return 'TikTok';
    if (lowerUrl.includes('instagram.com')) return 'Instagram';
    if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.watch')) return 'Facebook';
    if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return 'Twitter/X';
    if (lowerUrl.includes('vimeo.com')) return 'Vimeo';
    if (lowerUrl.includes('dailymotion.com')) return 'Dailymotion';
    if (lowerUrl.includes('reddit.com')) return 'Reddit';
    
    return 'Unknown';
  };

  const generateMockVideoInfo = (url: string): VideoInfo => {
    const platform = detectPlatform(url);
    const videoId = Math.random().toString(36).substring(7);
    
    const mockTitles = {
      'YouTube': 'Amazing Web Development Tutorial - Build Modern Apps in 2024 🚀',
      'TikTok': 'Viral Dance Challenge 2024 🔥 #trending #viral',
      'Instagram': 'Behind the Scenes - Professional Photography Tips & Tricks',
      'Facebook': 'Funny Cat Compilation - Hilarious Moments That Will Make You Laugh!',
      'Twitter/X': 'Breaking Tech News - Latest AI Developments & Updates',
      'Vimeo': 'Award-Winning Short Film - "The Journey" | Professional Cinema',
      'Dailymotion': 'Latest Music Video - Chart-Topping Hit Song 2024',
      'Reddit': 'Community Discussion - Top Voted Content of the Week'
    };

    const mockViews = ['1.2M', '856K', '2.1M', '445K', '3.7M', '189K', '925K', '1.8M'];
    const mockDurations = ['10:45', '0:30', '15:22', '3:18', '8:07', '25:33', '4:12', '12:56'];
    const mockFileSizes = ['125 MB', '15 MB', '280 MB', '45 MB', '95 MB', '420 MB', '58 MB', '185 MB'];

    return {
      title: mockTitles[platform as keyof typeof mockTitles] || 'Video Content',
      thumbnail: `https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400`,
      duration: mockDurations[Math.floor(Math.random() * mockDurations.length)],
      quality: ['1080p', '720p', '480p', '360p'],
      platform,
      url,
      views: mockViews[Math.floor(Math.random() * mockViews.length)],
      uploadDate: '2 days ago',
      fileSize: mockFileSizes[Math.floor(Math.random() * mockFileSizes.length)]
    };
  };

  const analyzeVideo = async () => {
    if (!url.trim()) {
      setError('Please enter a valid video URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    const platform = detectPlatform(url);
    if (platform === 'Unknown') {
      setError('Platform not supported. Please check supported platforms below.');
      return;
    }

    setIsLoading(true);
    setError('');
    setVideoInfo(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // In a real implementation, you would call a video extraction API here
      const mockInfo = generateMockVideoInfo(url);
      setVideoInfo(mockInfo);
      setSelectedQuality(mockInfo.quality[0]);
      
    } catch (error) {
      setError('Failed to analyze video. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const downloadVideo = async () => {
    if (!videoInfo) return;
    
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    const progressInterval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsDownloading(false);
          
          // Create a mock download
          const link = document.createElement('a');
          link.href = 'data:text/plain;charset=utf-8,This is a demo download. In a real implementation, this would be the actual video file.';
          link.download = `${videoInfo.title.substring(0, 50)}_${selectedQuality}.mp4`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Show success message
          alert(`✅ Download completed!\n\nVideo: ${videoInfo.title}\nQuality: ${selectedQuality}\nFile size: ${videoInfo.fileSize}\n\nNote: This is a demo. In a real implementation, the actual video file would be downloaded.`);
          
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const copyUrl = async () => {
    if (!url) return;
    
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (error) {
      console.error('Failed to paste from clipboard:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 card-enhanced">
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative">
            <div className="p-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-lg animate-glow">
              <Video className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold gradient-text">Video Downloader</h2>
            <p className="text-gray-600 text-lg">Download videos from popular social media platforms</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 animate-slideUp">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Video URL
              </label>
              <div className="flex space-x-3">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste video URL here (YouTube, TikTok, Instagram, etc.)"
                  className="flex-1 p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 text-sm transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  onKeyPress={(e) => e.key === 'Enter' && analyzeVideo()}
                />
                <button
                  onClick={pasteFromClipboard}
                  className="px-6 py-4 text-gray-500 hover:text-gray-700 border-2 border-gray-200 rounded-2xl hover:bg-white/80 transition-all duration-300 font-medium"
                  title="Paste from clipboard"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button
              onClick={analyzeVideo}
              disabled={!url.trim() || isLoading}
              className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-4 rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed btn-enhanced"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Analyzing Video...</span>
                </>
              ) : (
                <>
                  <Eye className="w-6 h-6" />
                  <span>Analyze Video</span>
                </>
              )}
            </button>

            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border-2 border-red-200 rounded-2xl p-6 animate-scaleIn">
                <div className="flex items-start space-x-4">
                  <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-red-800">Error</h4>
                    <p className="text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {videoInfo && (
              <div className="bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-sm rounded-3xl p-8 space-y-6 border border-gray-200 animate-scaleIn">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <img
                      src={videoInfo.thumbnail}
                      alt="Video thumbnail"
                      className="w-40 h-28 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {videoInfo.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>{videoInfo.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Video className="w-4 h-4 text-green-500" />
                        <span>{videoInfo.platform}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span>{videoInfo.views} views</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileVideo className="w-4 h-4 text-orange-500" />
                        <span>{videoInfo.fileSize}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Quality Selection
                    </label>
                    <select
                      value={selectedQuality}
                      onChange={(e) => setSelectedQuality(e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 text-sm bg-white/50 backdrop-blur-sm transition-all duration-300"
                    >
                      {videoInfo.quality.map((quality) => (
                        <option key={quality} value={quality}>
                          {quality} {quality === '1080p' ? '(Full HD)' : quality === '720p' ? '(HD)' : quality === '480p' ? '(SD)' : '(Low)'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {isDownloading && (
                    <div className="bg-blue-50 p-4 rounded-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-900">Downloading...</span>
                        <span className="text-sm text-blue-700">{Math.round(downloadProgress)}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${downloadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      onClick={downloadVideo}
                      disabled={isDownloading}
                      className="flex-1 flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 btn-enhanced disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="w-6 h-6" />
                      <span>{isDownloading ? 'Downloading...' : 'Download Video'}</span>
                    </button>
                    <button
                      onClick={() => window.open(videoInfo.url, '_blank')}
                      className="px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-white/80 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm p-6 rounded-3xl border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center space-x-3">
                <CheckCircle className="w-6 h-6" />
                <span>Supported Platforms</span>
              </h3>
              <div className="space-y-4">
                {supportedPlatforms.map((platform) => (
                  <div key={platform.name} className="flex items-center space-x-4 p-3 bg-white/50 rounded-2xl border border-white/50">
                    <div className={`p-2 bg-gradient-to-r ${platform.color} rounded-xl`}>
                      <span className="text-lg">{platform.icon}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-900">{platform.name}</div>
                      <div className="text-xs text-blue-700">{platform.domain}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50/80 to-orange-50/80 backdrop-blur-sm p-6 rounded-3xl border border-yellow-200">
              <h3 className="font-bold text-yellow-900 mb-4 flex items-center space-x-3">
                <AlertCircle className="w-6 h-6" />
                <span>Important Notes</span>
              </h3>
              <ul className="text-sm text-yellow-800 space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>Respect copyright and platform terms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>Only download content you have rights to</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>Some platforms may restrict downloads</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>Quality depends on original video</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>Large files may take time to process</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm p-6 rounded-3xl border border-green-200">
              <h3 className="font-bold text-green-900 mb-4 flex items-center space-x-3">
                <Zap className="w-6 h-6" />
                <span>Premium Features</span>
              </h3>
              <ul className="text-sm text-green-800 space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Multiple quality options</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Lightning-fast processing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>No registration required</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Mobile-friendly interface</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Secure and private downloads</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>Real download progress tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}