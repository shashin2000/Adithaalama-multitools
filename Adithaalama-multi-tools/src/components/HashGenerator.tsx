import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import { Copy, Check, Hash, Shield } from 'lucide-react';

export function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashType, setHashType] = useState('bcrypt');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [saltRounds, setSaltRounds] = useState(10);

  const hashTypes = [
    { value: 'bcrypt', label: 'bcrypt (Recommended for passwords)' },
    { value: 'sha256', label: 'SHA-256' },
    { value: 'sha512', label: 'SHA-512' },
    { value: 'md5', label: 'MD5 (Not recommended for security)' },
    { value: 'sha1', label: 'SHA-1 (Not recommended for security)' },
  ];

  const generateHash = async () => {
    if (!input.trim()) return;
    
    try {
      let hash = '';
      
      switch (hashType) {
        case 'bcrypt':
          hash = await bcrypt.hash(input, saltRounds);
          break;
        case 'sha256':
          hash = CryptoJS.SHA256(input).toString();
          break;
        case 'sha512':
          hash = CryptoJS.SHA512(input).toString();
          break;
        case 'md5':
          hash = CryptoJS.MD5(input).toString();
          break;
        case 'sha1':
          hash = CryptoJS.SHA1(input).toString();
          break;
        default:
          hash = '';
      }
      
      setResult(hash);
    } catch (error) {
      console.error('Error generating hash:', error);
      setResult('Error generating hash');
    }
  };

  const copyHash = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying hash:', error);
    }
  };

  const getHashInfo = () => {
    switch (hashType) {
      case 'bcrypt':
        return {
          description: 'bcrypt is a password hashing function designed to be slow and secure against brute-force attacks.',
          security: 'High',
          useCase: 'Password storage',
          color: 'green'
        };
      case 'sha256':
        return {
          description: 'SHA-256 is a cryptographic hash function that produces a 256-bit hash value.',
          security: 'High',
          useCase: 'Data integrity verification',
          color: 'blue'
        };
      case 'sha512':
        return {
          description: 'SHA-512 is a cryptographic hash function that produces a 512-bit hash value.',
          security: 'High',
          useCase: 'Data integrity verification',
          color: 'blue'
        };
      case 'md5':
        return {
          description: 'MD5 is a widely used hash function producing a 128-bit hash value.',
          security: 'Low',
          useCase: 'Checksums (not for security)',
          color: 'red'
        };
      case 'sha1':
        return {
          description: 'SHA-1 is a cryptographic hash function producing a 160-bit hash value.',
          security: 'Low',
          useCase: 'Legacy systems (not recommended)',
          color: 'orange'
        };
      default:
        return null;
    }
  };

  const hashInfo = getHashInfo();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
            <Hash className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Hash Generator</h2>
            <p className="text-gray-600">Generate secure hashes for passwords and data</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Text
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to hash..."
                className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hash Type
              </label>
              <select
                value={hashType}
                onChange={(e) => setHashType(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
              >
                {hashTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {hashType === 'bcrypt' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salt Rounds: {saltRounds}
                </label>
                <input
                  type="range"
                  min="4"
                  max="15"
                  value={saltRounds}
                  onChange={(e) => setSaltRounds(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Fast (4)</span>
                  <span>Secure (15)</span>
                </div>
              </div>
            )}

            <button
              onClick={generateHash}
              disabled={!input.trim()}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-4 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Hash className="w-5 h-5" />
              <span>Generate Hash</span>
            </button>

            {hashInfo && (
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-gray-900">Hash Information</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    hashInfo.color === 'green' ? 'bg-green-100 text-green-800' :
                    hashInfo.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                    hashInfo.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {hashInfo.security} Security
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{hashInfo.description}</p>
                <p className="text-xs text-gray-500">Use case: {hashInfo.useCase}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generated Hash
              </label>
              <div className="relative">
                <textarea
                  value={result}
                  readOnly
                  placeholder="Generated hash will appear here..."
                  className="w-full h-48 p-4 pr-12 border border-gray-300 rounded-xl bg-gray-50 font-mono text-xs resize-none"
                />
                {result && (
                  <button
                    onClick={copyHash}
                    className="absolute right-3 top-3 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {result && (
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-2">Hash Details</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Algorithm: {hashType.toUpperCase()}</p>
                  <p>Length: {result.length} characters</p>
                  {hashType === 'bcrypt' && <p>Salt rounds: {saltRounds}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}