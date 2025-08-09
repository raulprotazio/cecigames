import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameStore } from '@/lib/store';
import { audioManager } from '@/lib/audio';
import { t } from '@/i18n/pt-BR';
import { ArrowLeft, Volume2, Accessibility, Clock, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Settings() {
  const [, setLocation] = useLocation();
  const { settings, updateSettings, resetProgress } = useGameStore();

  const handleBack = () => {
    audioManager.playClick();
    setLocation('/');
  };

  const handleToggle = (key: keyof typeof settings) => {
    audioManager.playClick();
    updateSettings({ [key]: !settings[key] });
  };

  const handleVolumeChange = (value: number[]) => {
    const volume = value[0];
    updateSettings({ volumeLevel: volume });
    audioManager.setVolume(volume / 100);
  };

  const handleTimerSelect = (timer: 'off' | '10' | '15' | '20') => {
    audioManager.playClick();
    updateSettings({ defaultTimer: timer });
  };

  const handleReset = () => {
    if (confirm(t('resetWarning'))) {
      audioManager.playClick();
      resetProgress();
    }
  };

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
        <h2 className="text-2xl font-semibold text-foreground">{t('settings')}</h2>
      </div>

      <div className="space-y-6">
        {/* Audio Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Volume2 className="mr-2 h-5 w-5 text-quiz-primary" />
              {t('soundAndAudio')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-foreground">{t('soundEffects')}</span>
              <Switch
                checked={settings.soundEnabled}
                onCheckedChange={() => handleToggle('soundEnabled')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-foreground">{t('vibration')}</span>
              <Switch
                checked={settings.hapticEnabled}
                onCheckedChange={() => handleToggle('hapticEnabled')}
              />
            </div>
            
            <div>
              <label className="block text-foreground mb-2">{t('volume')}</label>
              <Slider
                value={[settings.volumeLevel]}
                onValueChange={handleVolumeChange}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Accessibility className="mr-2 h-5 w-5 text-quiz-primary" />
              {t('accessibility')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-foreground">{t('calmMode')}</span>
              <Switch
                checked={settings.calmMode}
                onCheckedChange={() => handleToggle('calmMode')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-foreground">{t('highContrast')}</span>
              <Switch
                checked={settings.highContrast}
                onCheckedChange={() => handleToggle('highContrast')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-foreground">{t('reduceMotion')}</span>
              <Switch
                checked={settings.reducedMotion}
                onCheckedChange={() => handleToggle('reducedMotion')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Timer Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-quiz-primary" />
              {t('defaultTimer')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {(['off', '10', '15', '20'] as const).map((timer) => (
                <Button
                  key={timer}
                  variant={settings.defaultTimer === timer ? "default" : "outline"}
                  onClick={() => handleTimerSelect(timer)}
                  className={cn(
                    "p-3 text-center touch-target",
                    settings.defaultTimer === timer
                      ? "bg-quiz-primary text-white"
                      : "bg-background text-foreground"
                  )}
                >
                  {timer === 'off' ? t('off') : `${timer} ${t('seconds')}`}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reset Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <RefreshCw className="mr-2 h-5 w-5 text-destructive" />
              {t('gameData')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              onClick={handleReset}
              className="w-full p-3 touch-target"
            >
              {t('resetProgress')}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">{t('resetWarning')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
