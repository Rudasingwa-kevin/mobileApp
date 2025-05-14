import { Currency } from '../store/preferences';

// Taux de change fictifs par rapport au RWF (basés sur des valeurs approximatives)
// 1 USD = ~1300 RWF
// 1 EUR = ~1500 RWF
const EXCHANGE_RATES: Record<Currency, number> = {
  RWF: 1, // Taux de base (1 RWF = 1 RWF)
  USD: 0.00077, // 1 RWF = 0.00077 USD (ou 1 USD = 1300 RWF)
  EUR: 0.00067, // 1 RWF = 0.00067 EUR (ou 1 EUR = 1500 RWF)
};

/**
 * Convertit un prix de RWF vers une autre devise
 * @param priceInRwf Prix en RWF
 * @param toCurrency Devise cible
 * @returns Prix converti dans la devise cible
 */
export const convertPrice = (priceInRwf: number, toCurrency: Currency): number => {
  const rate = EXCHANGE_RATES[toCurrency];
  
  if (!rate) {
    console.warn(`Taux de change non trouvé pour la devise ${toCurrency}`);
    return priceInRwf;
  }
  
  const convertedPrice = priceInRwf * rate;
  
  // Arrondir à 2 décimales
  if (toCurrency === 'RWF') {
    return Math.round(convertedPrice);
  } else {
    return Math.round(convertedPrice * 100) / 100;
  }
};

/**
 * Formate un prix avec sa devise
 * @param price Prix
 * @param currency Devise
 * @returns Prix formaté
 */
export const formatPrice = (price: number, currency: Currency): string => {
  // Options de formatage selon la devise
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits: currency === 'RWF' ? 0 : 2,
    maximumFractionDigits: currency === 'RWF' ? 0 : 2,
  };

  // Exception pour RWF car pas bien supporté par le formatter
  if (currency === 'RWF') {
    return `${price.toLocaleString()} RWF`;
  }
  
  return price.toLocaleString('fr-FR', options);
};

/**
 * Formate un prix avec sa devise originale et en RWF
 * @param priceInRwf Prix original en RWF
 * @param displayCurrency Devise d'affichage
 * @param showOriginal Afficher ou non le prix original
 * @returns Prix formaté
 */
export const formatPriceWithOriginal = (
  priceInRwf: number, 
  displayCurrency: Currency,
  showOriginal: boolean = true
): string => {
  const convertedPrice = convertPrice(priceInRwf, displayCurrency);
  const formattedPrice = formatPrice(convertedPrice, displayCurrency);
  
  // Si c'est déjà en RWF ou on ne veut pas afficher l'original, retourner directement
  if (displayCurrency === 'RWF' || !showOriginal) {
    return formattedPrice;
  }
  
  // Sinon, ajouter le prix original en RWF
  const originalFormat = `${priceInRwf.toLocaleString()} RWF`;
  return `${formattedPrice} (${originalFormat})`;
}; 