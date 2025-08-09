import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameSettings, Progress, GameState, QuizQuestion, Sticker } from '@shared/schema';
import { countries } from '@/data/countries';
import { stickers as stickerData } from '@/data/stickers';

interface GameStore {
  settings: GameSettings;
  progress: Progress;
  gameState: GameState | null;
  
  // Settings actions
  updateSettings: (settings: Partial<GameSettings>) => void;
  resetSettings: () => void;
  
  // Progress actions
  addCorrectAnswer: () => void;
  addIncorrectAnswer: () => void;
  updateStreak: (streak: number) => void;
  addStar: () => void;
  unlockSticker: (stickerId: string) => void;
  resetProgress: () => void;
  
  // Game actions
  startGame: (mode: 'quiz' | 'practice', timerEnabled: boolean, timerDuration?: number) => void;
  answerQuestion: (isCorrect: boolean) => void;
  nextQuestion: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  
  // Utility functions
  getStickers: () => Sticker[];
  getFilteredCountries: () => typeof countries;
}

const defaultSettings: GameSettings = {
  soundEnabled: true,
  hapticEnabled: true,
  calmMode: true,
  highContrast: false,
  reducedMotion: true,
  volumeLevel: 75,
  defaultTimer: 'off',
  selectedContinent: 'mundo',
};

const defaultProgress: Progress = {
  totalCorrect: 0,
  totalAnswered: 0,
  bestStreak: 0,
  currentStreak: 0,
  stars: 0,
  unlockedStickers: [],
  continentProgress: {},
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      progress: defaultProgress,
      gameState: null,

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }));
      },

      resetSettings: () => {
        set({ settings: defaultSettings });
      },

      addCorrectAnswer: () => {
        set((state) => {
          const newProgress = {
            ...state.progress,
            totalCorrect: state.progress.totalCorrect + 1,
            totalAnswered: state.progress.totalAnswered + 1,
            currentStreak: state.progress.currentStreak + 1,
            bestStreak: Math.max(state.progress.bestStreak, state.progress.currentStreak + 1),
          };

          // Award star every 10 correct answers
          if (newProgress.totalCorrect % 10 === 0) {
            newProgress.stars += 1;
          }

          return { progress: newProgress };
        });
      },

      addIncorrectAnswer: () => {
        set((state) => ({
          progress: {
            ...state.progress,
            totalAnswered: state.progress.totalAnswered + 1,
            currentStreak: 0,
          }
        }));
      },

      updateStreak: (streak) => {
        set((state) => ({
          progress: {
            ...state.progress,
            currentStreak: streak,
            bestStreak: Math.max(state.progress.bestStreak, streak),
          }
        }));
      },

      addStar: () => {
        set((state) => ({
          progress: {
            ...state.progress,
            stars: state.progress.stars + 1,
          }
        }));
      },

      unlockSticker: (stickerId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            unlockedStickers: [...new Set([...state.progress.unlockedStickers, stickerId])],
          }
        }));
      },

      resetProgress: () => {
        set({ progress: defaultProgress });
      },

      startGame: (mode, timerEnabled, timerDuration = 15) => {
        const filteredCountries = get().getFilteredCountries();
        const shuffledCountries = [...filteredCountries].sort(() => Math.random() - 0.5);
        const questionsCount = mode === 'quiz' ? 10 : shuffledCountries.length;
        const selectedCountries = shuffledCountries.slice(0, questionsCount);

        const questions: QuizQuestion[] = selectedCountries.map(country => {
          const otherCountries = countries.filter(c => c.iso2 !== country.iso2);
          const wrongOptions = otherCountries
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(c => c.name_pt);
          
          const options = [country.name_pt, ...wrongOptions].sort(() => Math.random() - 0.5);
          
          return {
            flagCode: country.iso2,
            correctAnswer: country.name_pt,
            options,
          };
        });

        set({
          gameState: {
            mode,
            questions,
            currentQuestionIndex: 0,
            score: 0,
            timeRemaining: timerEnabled ? timerDuration : undefined,
            timerEnabled,
            isPaused: false,
            isComplete: false,
          }
        });
      },

      answerQuestion: (isCorrect) => {
        if (isCorrect) {
          get().addCorrectAnswer();
        } else {
          get().addIncorrectAnswer();
        }

        set((state) => ({
          gameState: state.gameState ? {
            ...state.gameState,
            score: isCorrect ? state.gameState.score + 1 : state.gameState.score,
          } : null
        }));
      },

      nextQuestion: () => {
        set((state) => {
          if (!state.gameState) return state;

          const nextIndex = state.gameState.currentQuestionIndex + 1;
          const isComplete = nextIndex >= state.gameState.questions.length;

          return {
            gameState: {
              ...state.gameState,
              currentQuestionIndex: nextIndex,
              isComplete,
              timeRemaining: state.gameState.timerEnabled && !isComplete ? 
                (state.settings.defaultTimer === 'off' ? 15 : parseInt(state.settings.defaultTimer)) : 
                state.gameState.timeRemaining,
            }
          };
        });
      },

      pauseGame: () => {
        set((state) => ({
          gameState: state.gameState ? {
            ...state.gameState,
            isPaused: true,
          } : null
        }));
      },

      resumeGame: () => {
        set((state) => ({
          gameState: state.gameState ? {
            ...state.gameState,
            isPaused: false,
          } : null
        }));
      },

      endGame: () => {
        set({ gameState: null });
      },

      getStickers: () => {
        const { progress } = get();
        return stickerData.map(sticker => ({
          ...sticker,
          unlocked: progress.stars >= sticker.requirement || progress.unlockedStickers.includes(sticker.id),
        }));
      },

      getFilteredCountries: () => {
        const { settings } = get();
        if (settings.selectedContinent === 'mundo') {
          return countries;
        }
        return countries.filter(country => country.continent === settings.selectedContinent);
      },
    }),
    {
      name: 'ceciflags-storage',
      partialize: (state) => ({
        settings: state.settings,
        progress: state.progress,
      }),
    }
  )
);
