'use client';

import { useState, useEffect } from 'react';
import { Toast } from '@/components/ui/Toast';
import { copyToClipboard, rgbToHex, hexToRgb, hslToRgb, rgbToHsl } from '@/lib/utils';

export default function Home() {
  const [hex, setHex] = useState('#3B82F6');
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [toast, setToast] = useState({ message: '', isVisible: false });

  useEffect(() => {
    const rgbFromHex = hexToRgb(hex);
    if (rgbFromHex) {
      setRgb(rgbFromHex);
      setHsl(rgbToHsl(rgbFromHex.r, rgbFromHex.g, rgbFromHex.b));
    }
  }, [hex]);

  const handleHexChange = (value: string) => {
    const cleanHex = value.replace('#', '');
    if (/^[0-9A-Fa-f]{0,6}$/.test(cleanHex)) {
      setHex('#' + cleanHex);
    }
  };

  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0 && numValue <= 255) {
      const newRgb = { ...rgb, [channel]: numValue };
      setRgb(newRgb);
      setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
      setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    }
  };

  const handleHslChange = (channel: 'h' | 's' | 'l', value: string) => {
    const numValue = parseInt(value) || 0;
    const maxValue = channel === 'h' ? 360 : 100;
    if (numValue >= 0 && numValue <= maxValue) {
      const newHsl = { ...hsl, [channel]: numValue };
      setHsl(newHsl);
      const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
      setRgb(newRgb);
      setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
  };

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
  };

  const hideToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  const copyToClipboardWithToast = async (text: string, type: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      showToast(`${type} copied to clipboard!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            Color Picker
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Choose, convert, and copy colors in different formats
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Color Display */}
            <div className="mb-8">
              <div
                className="w-full h-48 rounded-xl shadow-inner transition-colors duration-300"
                style={{ backgroundColor: hex }}
              />
            </div>

            {/* Color Format Sections */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* HEX Format */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">HEX</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={hex}
                    onChange={(e) => handleHexChange(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#000000"
                  />
                  <button
                    onClick={() => copyToClipboardWithToast(hex, 'HEX color')}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Copy to clipboard"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* RGB Format */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">RGB</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 w-4">R</span>
                    <input
                      type="number"
                      min="0"
                      max="255"
                      value={rgb.r}
                      onChange={(e) => handleRgbChange('r', e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 w-4">G</span>
                    <input
                      type="number"
                      min="0"
                      max="255"
                      value={rgb.g}
                      onChange={(e) => handleRgbChange('g', e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 w-4">B</span>
                    <input
                      type="number"
                      min="0"
                      max="255"
                      value={rgb.b}
                      onChange={(e) => handleRgbChange('b', e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboardWithToast(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'RGB color')}
                  className="mt-3 w-full px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  Copy RGB
                </button>
              </div>

              {/* HSL Format */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">HSL</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 w-4">H</span>
                    <input
                      type="number"
                      min="0"
                      max="360"
                      value={hsl.h}
                      onChange={(e) => handleHslChange('h', e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-500">°</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 w-4">S</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={hsl.s}
                      onChange={(e) => handleHslChange('s', e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-500">%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 w-4">L</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={hsl.l}
                      onChange={(e) => handleHslChange('l', e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-500">%</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboardWithToast(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'HSL color')}
                  className="mt-3 w-full px-3 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  Copy HSL
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
                    setHex(randomHex);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Random Color
                </button>
                <button
                  onClick={() => setHex('#000000')}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Black
                </button>
                <button
                  onClick={() => setHex('#FFFFFF')}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  White
                </button>
                <button
                  onClick={() => setHex('#EF4444')}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Red
                </button>
                <button
                  onClick={() => setHex('#10B981')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Green
                </button>
                <button
                  onClick={() => setHex('#3B82F6')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Blue
                </button>
                <button
                  onClick={() => setHex('#F59E0B')}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Yellow
                </button>
                <button
                  onClick={() => setHex('#8B5CF6')}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Purple
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}