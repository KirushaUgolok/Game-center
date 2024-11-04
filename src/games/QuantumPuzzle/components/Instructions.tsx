import React from 'react';
import { Lightbulb, Zap, Target, ArrowRight } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function Instructions({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-gray-900 text-white z-50 animate-fadeIn">
      <div className="max-w-lg mx-auto px-4 py-6 h-full flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Квантовая Головоломка
          </h1>

          <div className="space-y-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold mb-1">Цель игры</h3>
                <p className="text-gray-400 text-sm">
                  Сделайте так, чтобы сумма чисел в каждой строке и столбце была одинаковой
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold mb-1">Квантовые клетки</h3>
                <p className="text-gray-400 text-sm">
                  Клетки с градиентом влияют на соседние клетки при нажатии
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold mb-1">Подсказка</h3>
                <p className="text-gray-400 text-sm">
                  Используйте квантовые клетки стратегически для быстрого решения
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-500 
                     transition-colors flex items-center gap-2"
          >
            <span>Понятно</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}