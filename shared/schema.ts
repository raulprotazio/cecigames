import { z } from "zod";

// Core data types
export const continentSchema = z.enum([
  'Africa', 
  'Americas', 
  'Asia', 
  'Europe', 
  'Oceania'
]);

export const countrySchema = z.object({
  iso2: z.string().length(2),
  name_pt: z.string(),
  continent: continentSchema,
});

export const gameSettingsSchema = z.object({
  soundEnabled: z.boolean().default(true),
  hapticEnabled: z.boolean().default(true),
  calmMode: z.boolean().default(true),
  highContrast: z.boolean().default(false),
  reducedMotion: z.boolean().default(true),
  volumeLevel: z.number().min(0).max(100).default(75),
  defaultTimer: z.enum(['off', '10', '15', '20']).default('off'),
  selectedContinent: z.enum(['mundo', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']).default('mundo'),
});

export const progressSchema = z.object({
  totalCorrect: z.number().default(0),
  totalAnswered: z.number().default(0),
  bestStreak: z.number().default(0),
  currentStreak: z.number().default(0),
  stars: z.number().default(0),
  unlockedStickers: z.array(z.string()).default([]),
  continentProgress: z.record(z.object({
    correct: z.number().default(0),
    total: z.number().default(0),
    bestTime: z.number().optional(),
  })).default({}),
});

export const stickerSchema = z.object({
  id: z.string(),
  name: z.string(),
  emoji: z.string(),
  requirement: z.number(), // stars needed
  unlocked: z.boolean().default(false),
});

export const quizQuestionSchema = z.object({
  flagCode: z.string(),
  correctAnswer: z.string(),
  options: z.array(z.string()).length(4),
});

export const gameStateSchema = z.object({
  mode: z.enum(['quiz', 'practice']),
  questions: z.array(quizQuestionSchema),
  currentQuestionIndex: z.number(),
  score: z.number(),
  timeRemaining: z.number().optional(),
  timerEnabled: z.boolean(),
  isPaused: z.boolean(),
  isComplete: z.boolean(),
});

// Type exports
export type Continent = z.infer<typeof continentSchema>;
export type Country = z.infer<typeof countrySchema>;
export type GameSettings = z.infer<typeof gameSettingsSchema>;
export type Progress = z.infer<typeof progressSchema>;
export type Sticker = z.infer<typeof stickerSchema>;
export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
export type GameState = z.infer<typeof gameStateSchema>;
