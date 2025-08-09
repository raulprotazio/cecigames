import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { QuizOption } from '@/components/QuizOption';
import { useGameStore } from '@/lib/store';
import { audioManager } from '@/lib/audio';
import { t } from '@/i18n/pt-BR';
import { ArrowLeft } from 'lucide-react';

export default function Practice() {
  const [, setLocation] = useLocation();
  const { gameState, startGame, answerQuestion, nextQuestion } = useGameStore();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (!gameState) {
      startGame('practice', false);
    }
  }, [gameState, startGame]);

  if (!gameState) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Preparando treino...</div>
    </div>;
  }

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

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
  };

  const handleNext = () => {
    if (gameState.currentQuestionIndex + 1 >= gameState.questions.length) {
      // Restart with new questions
      startGame('practice', false);
    } else {
      nextQuestion();
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleBackHome = () => {
    audioManager.playClick();
    setLocation('/');
  };

  return (
    <div className="p-6">
      {/* Practice Header */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleBackHome}
          className="p-3 rounded-full touch-target"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Modo Treino</div>
          <div className="text-lg font-bold text-quiz-secondary">Sem Pressa!</div>
        </div>
        
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
              disabled={false}
              onClick={() => handleAnswerSelect(index)}
            />
          );
        })}
      </div>

      {/* Next Button */}
      {showFeedback && (
        <div className="text-center">
          <Button
            onClick={handleNext}
            className="bg-quiz-secondary text-white px-8 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors duration-200 touch-target"
          >
            Próxima Bandeira
          </Button>
        </div>
      )}
    </div>
  );
}
