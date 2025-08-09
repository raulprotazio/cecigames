import type { Country } from '@shared/schema';

export const countries: Country[] = [
  // Americas
  { iso2: 'BR', name_pt: 'Brasil', continent: 'Americas' },
  { iso2: 'US', name_pt: 'Estados Unidos', continent: 'Americas' },
  { iso2: 'CA', name_pt: 'Canadá', continent: 'Americas' },
  { iso2: 'MX', name_pt: 'México', continent: 'Americas' },
  { iso2: 'AR', name_pt: 'Argentina', continent: 'Americas' },
  
  // Europe
  { iso2: 'DE', name_pt: 'Alemanha', continent: 'Europe' },
  { iso2: 'FR', name_pt: 'França', continent: 'Europe' },
  { iso2: 'IT', name_pt: 'Itália', continent: 'Europe' },
  { iso2: 'ES', name_pt: 'Espanha', continent: 'Europe' },
  { iso2: 'GB', name_pt: 'Reino Unido', continent: 'Europe' },
  { iso2: 'RU', name_pt: 'Rússia', continent: 'Europe' },
  
  // Asia
  { iso2: 'JP', name_pt: 'Japão', continent: 'Asia' },
  { iso2: 'CN', name_pt: 'China', continent: 'Asia' },
  { iso2: 'IN', name_pt: 'Índia', continent: 'Asia' },
  
  // Africa
  { iso2: 'ZA', name_pt: 'África do Sul', continent: 'Africa' },
  { iso2: 'EG', name_pt: 'Egito', continent: 'Africa' },
  { iso2: 'NG', name_pt: 'Nigéria', continent: 'Africa' },
  { iso2: 'KE', name_pt: 'Quênia', continent: 'Africa' },
  
  // Oceania
  { iso2: 'AU', name_pt: 'Austrália', continent: 'Oceania' },
  { iso2: 'NZ', name_pt: 'Nova Zelândia', continent: 'Oceania' },
];

export const stickerRequirements = [
  { id: 'first-victory', name: 'Primeira Vitória', emoji: '🏆', requirement: 1 },
  { id: 'explorer', name: 'Explorador', emoji: '🌍', requirement: 3 },
  { id: 'specialist', name: 'Especialista', emoji: '⭐', requirement: 5 },
  { id: 'speed', name: 'Velocidade', emoji: '⚡', requirement: 8 },
  { id: 'master', name: 'Mestre', emoji: '🏅', requirement: 15 },
  { id: 'perfect', name: 'Perfeito', emoji: '💎', requirement: 21 },
  { id: 'legend', name: 'Lenda', emoji: '👑', requirement: 30 },
  { id: 'champion', name: 'Campeão', emoji: '🎯', requirement: 50 },
];

export const stickers = stickerRequirements;
