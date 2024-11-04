import React, { useState, useEffect } from 'react';
import { ArrowLeft, Rotate3D, RefreshCw } from 'lucide-react';
import { Grid } from './components/Grid';
import { InfoPanel } from './components/InfoPanel';
import { Instructions } from './components/Instructions';
import type { GridCell, GameState } from './types';

const INITIAL_LEVEL = 1;
const GRID_SIZE = 4;

export function QuantumPuzzle({ onExit }: { onExit: () => void }) {
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameState, setGameState] = useState<GameState>({
    level: INITIAL_LEVEL,
    moves: 0,
    score: 0,
    isComplete: false
  });

  const [grid, setGrid] = useState<GridCell[]>(() => 
    generateLevel(INITIAL_LEVEL)
  );

  function generateLevel(level: number): GridCell[] {
    const cells: GridCell[] = [];
    const complexity = Math.min(level + 2, 8);
    
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      const quantum = Math.random() < 0.3;
      cells.push({
        id: i,
        state: quantum ? 'quantum' : 'normal',
        value: Math.floor(Math.random() * complexity) + 1,
        isLocked: Math.random() < 0.2,
        position: i
      });
    }
    
    return cells;
  }

  const handleCellClick = (cellId: number) => {
    if (gameState.isComplete) return;

    setGrid(current => {
      const newGrid = [...current];
      const clickedCell = newGrid[cellId];
      
      if (clickedCell.isLocked) return current;

      if (clickedCell.state === 'quantum') {
        const adjacentCells = getAdjacentCells(cellId);
        adjacentCells.forEach(adjId => {
          if (!newGrid[adjId].isLocked) {
            newGrid[adjId].value = (newGrid[adjId].value % 8) + 1;
          }
        });
      }

      clickedCell.value = (clickedCell.value % 8) + 1;
      
      return newGrid;
    });

    setGameState(prev => ({
      ...prev,
      moves: prev.moves + 1
    }));
  };

  const getAdjacentCells = (cellId: number) => {
    const row = Math.floor(cellId / GRID_SIZE);
    const col = cellId % GRID_SIZE;
    const adjacent: number[] = [];

    if (row > 0) adjacent.push(cellId - GRID_SIZE);
    if (row < GRID_SIZE - 1) adjacent.push(cellId + GRID_SIZE);
    if (col > 0) adjacent.push(cellId - 1);
    if (col < GRID_SIZE - 1) adjacent.push(cellId + 1);

    return adjacent;
  };

  const resetLevel = () => {
    setGrid(generateLevel(gameState.level));
    setGameState(prev => ({
      ...prev,
      moves: 0,
      isComplete: false
    }));
  };

  const checkWinCondition = () => {
    const targetSum = gameState.level + 10;
    const rows = Array(GRID_SIZE).fill(0);
    const cols = Array(GRID_SIZE).fill(0);

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const cell = grid[i * GRID_SIZE + j];
        rows[i] += cell.value;
        cols[j] += cell.value;
      }
    }

    const isWon = rows.every(sum => sum === targetSum) && 
                 cols.every(sum => sum === targetSum);

    if (isWon && !gameState.isComplete) {
      setGameState(prev => ({
        ...prev,
        isComplete: true,
        score: prev.score + 100 * prev.level,
        level: prev.level + 1
      }));
    }
  };

  useEffect(() => {
    checkWinCondition();
  }, [grid]);

  if (showInstructions) {
    return <Instructions onClose={() => setShowInstructions(false)} />;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 text-white z-50 animate-fadeIn">
      <div className="max-w-lg mx-auto px-4 py-6 h-full flex flex-col">
        <header className="flex items-center justify-between mb-6">
          <button
            onClick={onExit}
            className="px-4 py-2 flex items-center gap-2 bg-white/10 hover:bg-white/20 
                     rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Вернуться в главное меню</span>
          </button>
          <button
            onClick={resetLevel}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
        </header>

        <InfoPanel gameState={gameState} />
        
        <div className="flex-1 flex items-center justify-center">
          <Grid grid={grid} onCellClick={handleCellClick} />
        </div>

        {gameState.isComplete && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Уровень пройден!</h2>
              <p className="text-gray-400 mb-6">Очки: {gameState.score}</p>
              <button
                onClick={() => {
                  setGrid(generateLevel(gameState.level));
                  setGameState(prev => ({
                    ...prev,
                    moves: 0,
                    isComplete: false
                  }));
                }}
                className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors"
              >
                Следующий уровень
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}