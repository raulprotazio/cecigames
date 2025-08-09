import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play } from 'lucide-react';
import { useGameStore } from '@/lib/store';
import { audioManager } from '@/lib/audio';

interface TimerProps {
  duration: number;
  onTimeout: () => void;
}

export function Timer({ duration, onTimeout }: TimerProps) {
  const { gameState, pauseGame, resumeGame } = useGameStore();
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!gameState?.timerEnabled || gameState.isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState?.isPaused, gameState?.timerEnabled, onTimeout]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, gameState?.currentQuestionIndex]);

  if (!gameState?.timerEnabled) return null;

  const progress = (timeLeft / duration) * 175.9; // Circumference calculation for SVG circle

  const togglePause = () => {
    audioManager.playClick();
    if (gameState.isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <Button
        variant="secondary"
        size="sm"
        onClick={togglePause}
        className="p-3 rounded-full touch-target"
      >
        {gameState.isPaused ? (
          <Play className="h-5 w-5" />
        ) : (
          <Pause className="h-5 w-5" />
        )}
      </Button>
      
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 progress-ring">
          <circle 
            cx="32" 
            cy="32" 
            r="28" 
            stroke="currentColor" 
            strokeWidth="4" 
            fill="none" 
            className="text-gray-200"
          />
          <circle 
            cx="32" 
            cy="32" 
            r="28" 
            stroke="currentColor" 
            strokeWidth="4" 
            fill="none"
            className="text-quiz-primary transition-all duration-1000"
            strokeDasharray="175.9"
            strokeDashoffset={175.9 - progress}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-foreground">{timeLeft}</span>
        </div>
      </div>
    </div>
  );
}
