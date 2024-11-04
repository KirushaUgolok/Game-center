export interface GridCell {
  id: number;
  state: 'normal' | 'quantum';
  value: number;
  isLocked: boolean;
  position: number;
}

export interface GameState {
  level: number;
  moves: number;
  score: number;
  isComplete: boolean;
}