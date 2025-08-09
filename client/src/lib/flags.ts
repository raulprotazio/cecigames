/**
 * Flag utilities using Flagcdn.com for accurate country flags
 * https://flagcdn.com provides free, high-quality SVG and PNG flags
 */

export interface FlagOptions {
  format?: 'svg' | 'png' | 'webp';
  size?: 'w20' | 'w40' | 'w80' | 'w160' | 'w320' | 'w640' | 'w1280';
}

/**
 * Get flag URL from Flagcdn.com
 * @param countryCode ISO 2-letter country code (lowercase)
 * @param options Flag format and size options
 * @returns URL to the flag image
 */
export function getFlagUrl(countryCode: string, options: FlagOptions = {}): string {
  const { format = 'svg', size = 'w160' } = options;
  const code = countryCode.toLowerCase();
  
  if (format === 'svg') {
    return `https://flagcdn.com/${code}.svg`;
  }
  
  return `https://flagcdn.com/${size}/${code}.${format}`;
}

/**
 * Get flag component props for React img elements
 * @param countryCode ISO 2-letter country code
 * @param countryName Country name for alt text
 * @param options Flag options
 * @returns Props object for img element
 */
export function getFlagProps(
  countryCode: string, 
  countryName: string, 
  options: FlagOptions = {}
) {
  return {
    src: getFlagUrl(countryCode, options),
    alt: `Bandeira da ${countryName}`,
    loading: 'lazy' as const,
    decoding: 'async' as const,
  };
}

/**
 * Preload flag images for better performance
 * @param countryCodes Array of ISO 2-letter country codes
 * @param options Flag options
 */
export function preloadFlags(countryCodes: string[], options: FlagOptions = {}): void {
  countryCodes.forEach(code => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getFlagUrl(code, options);
    document.head.appendChild(link);
  });
}