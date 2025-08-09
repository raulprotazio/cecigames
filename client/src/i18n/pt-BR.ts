export const translations = {
  // App title and general
  appTitle: 'CeciFlags',
  appSubtitle: 'Quiz de Bandeiras para Crianças',
  
  // Navigation
  home: 'Início',
  quiz: 'Quiz',
  practice: 'Treino',
  collection: 'Coleção',
  settings: 'Configurações',
  
  // Home screen
  learnFlags: 'Aprenda Bandeiras!',
  discoverCountries: 'Descubra países do mundo todo',
  playQuiz: 'Jogar Quiz',
  freePractice: 'Treino Livre',
  myCollection: 'Minha Coleção',
  chooseContinent: 'Escolha um Continente:',
  
  // Continents
  world: 'Mundo',
  americas: 'Américas',
  europe: 'Europa',
  asia: 'Ásia',
  africa: 'África',
  oceania: 'Oceania',
  
  // Quiz
  whichCountry: 'Qual é este país?',
  question: 'Pergunta',
  of: 'de',
  score: 'Pontuação',
  pause: 'Pausar',
  resume: 'Continuar',
  
  // Results
  congratulations: 'Parabéns!',
  quizComplete: 'Você terminou o quiz!',
  correct: 'Acertos',
  stars: 'Estrelas',
  playAgain: 'Jogar Novamente',
  backToHome: 'Voltar ao Início',
  
  // Settings
  soundAndAudio: 'Som e Áudio',
  soundEffects: 'Efeitos Sonoros',
  vibration: 'Vibração',
  volume: 'Volume',
  accessibility: 'Acessibilidade',
  calmMode: 'Modo Calmo',
  highContrast: 'Alto Contraste',
  reduceMotion: 'Reduzir Movimento',
  defaultTimer: 'Timer Padrão',
  off: 'Desligado',
  seconds: 'seg',
  gameData: 'Dados do Jogo',
  resetProgress: 'Resetar Todo o Progresso',
  resetWarning: 'Esta ação não pode ser desfeita',
  
  // Collection
  totalStars: 'Total de Estrelas',
  stickersUnlocked: 'Adesivos Desbloqueados',
  unlocked: 'Desbloqueado!',
  starsNeeded: 'estrelas',
  nextSticker: 'Próximo Adesivo',
  getMoreStars: 'Consiga mais',
  toUnlock: 'estrelas para desbloquear',
  
  // Timer options
  timerOff: 'Timer Desligado',
  timer10: '10 segundos',
  timer15: '15 segundos',
  timer20: '20 segundos',
  
  // Feedback
  correct_answer: 'Correto!',
  incorrect_answer: 'Incorreto!',
  
  // Errors
  error: 'Erro',
  tryAgain: 'Tente Novamente',
  loadingError: 'Erro ao carregar',
  offline: 'Você está offline',
};

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey): string {
  return translations[key] || key;
}
