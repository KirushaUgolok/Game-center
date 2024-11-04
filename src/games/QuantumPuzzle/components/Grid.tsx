import React from 'react';
import type { GridCell } from '../types';

interface Props {
  grid: GridCell[];
  onCellClick: (id: number) => void;
}

export function Grid({ grid, onCellClick }: Props) {
  return (
    <div className="grid grid-cols-4 gap-2 p-2 bg-gray-800/50 rounded-2xl">
      {grid.map((cell) => (
        <button
          key={cell.id}
          onClick={() => onCellClick(cell.id)}
          disabled={cell.isLocked}
          className={`
            aspect-square rounded-xl text-2xl font-bold relative
            transition-all duration-300 transform hover:scale-[1.02]
            ${cell.state === 'quantum' 
              ? 'bg-gradient-to-br from-indigo-600 to-cyan-600' 
              : 'bg-gray-700'}
            ${cell.isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <span className="relative z-10">{cell.value}</span>
          {cell.state === 'quantum' && (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-indigo-900/50 rounded-xl" />
          )}
        </button>
      ))}
    </div>
  );
}