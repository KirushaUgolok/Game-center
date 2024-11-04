import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { GameCard } from './components/GameCard';
import { Settings } from './components/Settings';
import { QuantumPuzzle } from './games/QuantumPuzzle/QuantumPuzzle';
import { games } from './data/games';
import type { Settings as SettingsType } from './types';

import 'swiper/css';
import 'swiper/css/effect-cards';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [settings, setSettings] = useState<SettingsType>({
    wallpaper: 'https://images.unsplash.com/photo-1515705576963-95cad62945b6?auto=format&fit=crop&q=80&w=2070',
    customWallpaper: null,
    backgroundColor: '#000000',
    opacity: 0.7
  });

  const handlePlay = (gameId: string) => {
    setActiveGame(gameId);
  };

  const updateSettings = (newSettings: Partial<SettingsType>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const backgroundStyle = {
    backgroundImage: settings.customWallpaper
      ? `url(${settings.customWallpaper})`
      : `url(${settings.wallpaper})`,
    backgroundColor: settings.backgroundColor,
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={backgroundStyle}
    >
      <div
        className="min-h-screen backdrop-blur-sm flex flex-col"
        style={{ backgroundColor: `${settings.backgroundColor}${Math.round(settings.opacity * 255).toString(16).padStart(2, '0')}` }}
      >
        <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
          <header className="flex justify-end p-4">
            <button
              onClick={() => setShowSettings(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full
                       bg-white/10 hover:bg-white/20 backdrop-blur-md
                       transition-all duration-300"
            >
              <SettingsIcon className="text-white/80 w-5 h-5" />
            </button>
          </header>

          <main className="flex-1 flex items-center">
            <Swiper
              effect="cards"
              grabCursor={true}
              modules={[EffectCards]}
              className="w-full"
            >
              {games.map((game) => (
                <SwiperSlide key={game.id}>
                  <GameCard game={game} onPlay={handlePlay} />
                </SwiperSlide>
              ))}
            </Swiper>
          </main>
        </div>

        {showSettings && (
          <Settings
            settings={settings}
            onClose={() => setShowSettings(false)}
            onUpdate={updateSettings}
          />
        )}

        {activeGame === 'quantum-puzzle' && (
          <QuantumPuzzle onExit={() => setActiveGame(null)} />
        )}
      </div>
    </div>
  );
}

export default App;