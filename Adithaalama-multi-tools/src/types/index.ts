export type ToolType = 'qr' | 'barcode' | 'password' | 'hash' | 'translate' | 'video-downloader';

export interface Tool {
  id: ToolType;
  name: string;
  description: string;
  icon: string;
}

export interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  quality: string[];
  platform: string;
  url: string;
  views?: string;
  uploadDate?: string;
  fileSize?: string;
}