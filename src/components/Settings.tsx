import React from 'react';
import { X } from 'lucide-react';
import { wallpapers } from '../data/wallpapers';
import type { Settings as SettingsType } from '../types';

interface Props {
  settings: SettingsType;
  onClose: () => void;
  onUpdate: (settings: Partial<SettingsType>) => void;
}

export function Settings({ settings, onClose, onUpdate }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ customWallpaper: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/90 border border-white/10 rounded-2xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Настройки</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="text-white" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-white mb-2">Загрузить обои</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0 file:text-sm file:font-semibold
                       file:bg-indigo-600 file:text-white hover:file:bg-indigo-700
                       cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Предустановленные обои</label>
            <div className="grid grid-cols-3 gap-2">
              {wallpapers.map((wallpaper) => (
                <button
                  key={wallpaper.id}
                  onClick={() => onUpdate({ wallpaper: wallpaper.url })}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all
                            ${settings.wallpaper === wallpaper.url
                      ? 'border-indigo-500 scale-[1.02]'
                      : 'border-transparent hover:border-white/20'
                    }`}
                >
                  <img
                    src={wallpaper.url}
                    alt={wallpaper.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Цвет фона</label>
            <input
              type="color"
              value={settings.backgroundColor}
              onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-white mb-2">
              Прозрачность фона: {Math.round(settings.opacity * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.opacity}
              onChange={(e) => onUpdate({ opacity: parseFloat(e.target.value) })}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}