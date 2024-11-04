import React from 'react';
import type { GameState } from '../types';

interface Props {
  gameState: GameState;
}

export function InfoPanel({ gameState }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-gray-800/50 rounded-xl p-3 text-center">
        <div className="text-sm text-gray-400">Уровень</div>
        <div className="text-xl font-bold">{gameState.level}</div>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-3 text-center">
        <div className="text-sm text-gray-400">Ходы</div>
        <div className="text-xl font-bold">{gameState.moves}</div>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-3 text-center">
        <div className="text-sm text-gray-400">Очки</div>
        <div className="text-xl font-bold">{gameState.score}</div>
      </div>
    </div>
  );
}