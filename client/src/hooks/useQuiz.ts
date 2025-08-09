import { useGameStore } from '@/lib/store';

export function useQuiz() {
  const { 
    gameState, 
    startGame, 
    answerQuestion, 
    nextQuestion, 
    pauseGame, 
    resumeGame, 
    endGame 
  } = useGameStore();
  
  return {
    gameState,
    startGame,
    answerQuestion,
    nextQuestion,
    pauseGame,
    resumeGame,
    endGame,
  };
}
