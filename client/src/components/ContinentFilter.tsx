import { Button } from '@/components/ui/button';
import { useGameStore } from '@/lib/store';
import { audioManager } from '@/lib/audio';
import { t } from '@/i18n/pt-BR';
import { cn } from '@/lib/utils';

const continents = [
  { id: 'mundo', name: t('world'), emoji: '🌍' },
  { id: 'Americas', name: t('americas'), emoji: '🌎' },
  { id: 'Europe', name: t('europe'), emoji: '🇪🇺' },
  { id: 'Asia', name: t('asia'), emoji: '🌏' },
  { id: 'Africa', name: t('africa'), emoji: '🌍' },
  { id: 'Oceania', name: t('oceania'), emoji: '🏝️' },
] as const;

export function ContinentFilter() {
  const { settings, updateSettings } = useGameStore();

  const selectContinent = (continentId: string) => {
    audioManager.playClick();
    updateSettings({ 
      selectedContinent: continentId as any
    });
  };

  return (
    <div className="bg-muted p-4 rounded-xl">
      <h3 className="font-medium text-foreground mb-3">{t('chooseContinent')}</h3>
      <div className="flex flex-wrap gap-2">
        {continents.map((continent) => (
          <Button
            key={continent.id}
            variant={settings.selectedContinent === continent.id ? "default" : "secondary"}
            size="sm"
            onClick={() => selectContinent(continent.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 touch-target",
              settings.selectedContinent === continent.id
                ? "bg-quiz-primary text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            )}
          >
            <span className="mr-1">{continent.emoji}</span>
            {continent.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
