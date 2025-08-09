import { useGameStore } from '@/lib/store';

export function useSettings() {
  const { settings, updateSettings, resetSettings } = useGameStore();
  
  return {
    settings,
    updateSettings,
    resetSettings,
  };
}
