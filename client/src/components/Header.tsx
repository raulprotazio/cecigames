import { Star, Volume2, VolumeX, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/lib/store';
import { audioManager } from '@/lib/audio';
import { useLocation } from 'wouter';
import { t } from '@/i18n/pt-BR';

export function Header() {
  const { settings, progress, updateSettings } = useGameStore();
  const [, setLocation] = useLocation();

  const toggleSound = () => {
    const newSoundState = !settings.soundEnabled;
    updateSettings({ soundEnabled: newSoundState });
    audioManager.setEnabled(newSoundState);
    if (newSoundState) {
      audioManager.playClick();
    }
  };

  return (
    <header className="bg-quiz-primary text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <i className="fas fa-flag text-2xl" />
        <h1 className="text-xl font-semibold">{t('appTitle')}</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSound}
          className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200 touch-target text-white"
        >
          {settings.soundEnabled ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </Button>
        
        <div className="flex items-center space-x-1">
          <Star className="h-5 w-5 text-quiz-accent fill-current" />
          <span className="font-medium">{progress.stars}</span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            audioManager.playClick();
            setLocation('/settings');
          }}
          className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200 touch-target text-white"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
