import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StickerCard } from '@/components/StickerCard';
import { useGameStore } from '@/lib/store';
import { audioManager } from '@/lib/audio';
import { t } from '@/i18n/pt-BR';
import { ArrowLeft, Trophy, Gift } from 'lucide-react';

export default function Collection() {
  const [, setLocation] = useLocation();
  const { progress, getStickers } = useGameStore();

  const handleBack = () => {
    audioManager.playClick();
    setLocation('/');
  };

  const stickers = getStickers();
  const unlockedCount = stickers.filter(s => s.unlocked).length;
  const nextSticker = stickers.find(s => !s.unlocked);
  const starsNeeded = nextSticker ? nextSticker.requirement - progress.stars : 0;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleBack}
          className="p-2 mr-4 rounded-full touch-target"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-semibold text-foreground">{t('myCollection')}</h2>
      </div>

      {/* Stats Summary */}
      <Card className="bg-gradient-to-r from-quiz-primary to-blue-600 text-white mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm opacity-90">{t('totalStars')}</div>
              <div className="text-2xl font-bold">{progress.stars}</div>
            </div>
            <div>
              <div className="text-sm opacity-90">{t('stickersUnlocked')}</div>
              <div className="text-2xl font-bold">{unlockedCount}/{stickers.length}</div>
            </div>
            <Trophy className="text-3xl opacity-75" />
          </div>
        </CardContent>
      </Card>

      {/* Sticker Collection Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stickers.map((sticker) => (
          <StickerCard key={sticker.id} sticker={sticker} />
        ))}
      </div>

      {/* Next Reward Info */}
      {nextSticker && starsNeeded > 0 && (
        <Card className="bg-quiz-accent bg-opacity-10 border-quiz-accent">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Gift className="text-quiz-accent text-xl" />
              <div>
                <div className="font-medium text-foreground">{t('nextSticker')}</div>
                <div className="text-sm text-muted-foreground">
                  {t('getMoreStars')} {starsNeeded} {t('toUnlock')} "{nextSticker.name}" {nextSticker.emoji}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
