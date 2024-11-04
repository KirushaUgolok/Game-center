import React from 'react';
import { Play } from 'lucide-react';
import type { GameCard as GameCardType } from '../types';

interface Props {
  game: GameCardType;
  onPlay: (id: string) => void;
}

export function GameCard({ game, onPlay }: Props) {
  return (
    <div className="w-full px-4 py-2">
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      
      <div className="px-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            {game.title}
          </h3>
          <div className="flex items-center gap-2">
            {game.comingSoon && (
              <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Скоро
              </span>
            )}
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {game.description}
        </p>
        
        <button
          onClick={() => onPlay(game.id)}
          disabled={game.comingSoon}
          className="w-full py-3 px-6 rounded-2xl flex items-center justify-center gap-3
                   bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500
                   disabled:from-gray-700 disabled:to-gray-600 disabled:opacity-50
                   text-white font-medium transition-all duration-300 transform hover:scale-[1.02]
                   shadow-lg shadow-indigo-500/25"
        >
          <Play className="w-5 h-5" />
          {game.comingSoon ? 'Скоро' : 'Играть'}
        </button>
      </div>
    </div>
  );
}