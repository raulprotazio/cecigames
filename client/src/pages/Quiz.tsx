import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Timer } from '@/components/Timer';
import { QuizOption } from '@/components/QuizOption';
import { ResultModal } from '@/components/ResultModal';
import { useGameStore } from '@/lib/store';
import { audioManager } from '@/lib/audio';
import { t } from '@/i18n/pt-BR';
import { ArrowLeft } from 'lucide-react';

export default function Quiz() {
  const [, setLocation] = useLocation();
  const { 
    gameState, 
    settings, 
    startGame, 
    answerQuestion, 
    nextQuestion, 
    endGame,
    pauseGame 
  } = useGameStore();
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!gameState) {
      const timerEnabled = settings.defaultTimer !== 'off';
      const timerDuration = timerEnabled ? parseInt(settings.defaultTimer) : 15;
      startGame('quiz', timerEnabled, timerDuration);
    }
  }, [gameState, settings.defaultTimer, startGame]);

  useEffect(() => {
    if (gameState?.isComplete && !showResults) {
      setShowResults(true);
    }
  }, [gameState?.isComplete, showResults]);

  if (!gameState) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Preparando quiz...</div>
    </div>;
  }

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const progressPercentage = (gameState.currentQuestionIndex / gameState.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = currentQuestion.options[answerIndex] === currentQuestion.correctAnswer;
    
    answerQuestion(isCorrect);
    
    if (isCorrect) {
      audioManager.playCorrect();
    } else {
      audioManager.playIncorrect();
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (gameState.currentQuestionIndex + 1 >= gameState.questions.length) {
        setShowResults(true);
      } else {
        nextQuestion();
        setSelectedAnswer(null);
        setShowFeedback(false);
      }
    }, 2000);
  };

  const handleTimeout = () => {
    if (showFeedback) return;
    handleAnswerSelect(-1); // Timeout counts as incorrect
  };

  const handlePauseGame = () => {
    audioManager.playClick();
    pauseGame();
  };

  const handleBackHome = () => {
    audioManager.playClick();
    endGame();
    setLocation('/');
  };

  return (
    <>
      <div className="p-6">
        {/* Quiz Header */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleBackHome}
            className="p-3 rounded-full touch-target"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <Timer 
            duration={gameState.timerEnabled ? (gameState.timeRemaining || 15) : 15}
            onTimeout={handleTimeout}
          />
          
          <div className="text-right">
            <div className="text-sm text-muted-foreground">{t('score')}</div>
            <div className="text-xl font-bold text-quiz-primary">{gameState.score}</div>
          </div>
        </div>

        {/* Current Flag */}
        <div className="text-center mb-8">
          <div className="w-48 h-36 mx-auto rounded-xl overflow-hidden flag-shadow mb-4">
            <img 
              src={`/flags/${currentQuestion.flagCode}.svg`}
              alt={`Bandeira de ${currentQuestion.correctAnswer}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.style.background = '#E5E7EB';
                  parent.innerHTML = '<div class="flex items-center justify-center h-full text-gray-500">🏳️</div>';
                }
              }}
            />
          </div>
          <p className="text-lg text-foreground font-medium">{t('whichCountry')}</p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = showFeedback && option === currentQuestion.correctAnswer;
            const isIncorrect = showFeedback && isSelected && !isCorrect;
            
            return (
              <QuizOption
                key={index}
                text={option}
                isSelected={isSelected}
                isCorrect={isCorrect}
                isIncorrect={isIncorrect}
                disabled={showFeedback}
                onClick={() => handleAnswerSelect(index)}
              />
            );
          })}
        </div>

        {/* Progress */}
        <div className="mb-4">
          <Progress value={progressPercentage} className="h-2" />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {t('question')} {gameState.currentQuestionIndex + 1} {t('of')} {gameState.questions.length}
        </p>
      </div>

      {showResults && (
        <ResultModal
          score={gameState.score}
          totalQuestions={gameState.questions.length}
          onPlayAgain={() => {
            setShowResults(false);
            endGame();
            const timerEnabled = settings.defaultTimer !== 'off';
            const timerDuration = timerEnabled ? parseInt(settings.defaultTimer) : 15;
            startGame('quiz', timerEnabled, timerDuration);
          }}
          onGoHome={() => {
            endGame();
            setLocation('/');
          }}
        />
      )}
    </>
  );
}
