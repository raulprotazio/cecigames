import { useGameStore } from '@/lib/store';

export function useProgress() {
  const { 
    progress, 
    addCorrectAnswer, 
    addIncorrectAnswer, 
    addStar, 
    unlockSticker, 
    resetProgress 
  } = useGameStore();
  
  return {
    progress,
    addCorrectAnswer,
    addIncorrectAnswer,
    addStar,
    unlockSticker,
    resetProgress,
  };
}
