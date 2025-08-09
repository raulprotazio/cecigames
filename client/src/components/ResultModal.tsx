import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGameStore } from '@/lib/store';
import { audioManager } from '@/lib/audio';
import { t } from '@/i18n/pt-BR';
import { useEffect } from 'react';

interface ResultModalProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export function ResultModal({
  score,
  totalQuestions,
  onPlayAgain,
  onGoHome,
}: ResultModalProps) {
  const { progress, settings } = useGameStore();

  // Calculate stars earned (1 star per 10 correct answers)
  const starsEarned = Math.floor(score / 10);

  useEffect(() => {
    // Play celebration sound if good score
    if (score >= totalQuestions * 0.7) {
      audioManager.playMilestone();
    }

    // Confetti effect if not in calm mode
    if (!settings.calmMode && score >= totalQuestions * 0.5) {
      import('canvas-confetti').then((confetti) => {
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      });
    }
  }, [score, totalQuestions, settings.calmMode]);

  const handlePlayAgain = () => {
    audioManager.playClick();
    onPlayAgain();
  };

  const handleGoHome = () => {
    audioManager.playClick();
    onGoHome();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-sm w-full">
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{t('congratulations')}</h3>
          <p className="text-muted-foreground mb-6">{t('quizComplete')}</p>
          
          <div className="bg-muted p-4 rounded-xl mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-quiz-primary">{score}</div>
                <div className="text-sm text-muted-foreground">{t('correct')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-quiz-accent">{starsEarned}</div>
                <div className="text-sm text-muted-foreground">{t('stars')}</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={handlePlayAgain}
              className="w-full bg-quiz-primary text-white p-3 rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200 touch-target"
            >
              {t('playAgain')}
            </Button>
            <Button
              variant="secondary"
              onClick={handleGoHome}
              className="w-full p-3 rounded-xl font-medium touch-target"
            >
              {t('backToHome')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
