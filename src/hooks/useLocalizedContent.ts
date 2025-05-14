import { useMemo } from 'react';
import { useUserPreferences, Language, Currency } from '../store/userPreferences';

// Traductions simplifiées
const translations = {
  fr: {
    propertyPrice: 'Prix',
    bedrooms: 'Chambres',
    bathrooms: 'Salles de bain',
    size: 'Superficie',
    amenities: 'Équipements',
    contact: 'Contact',
    search: 'Rechercher',
    filters: 'Filtres',
    apply: 'Appliquer',
    reset: 'Réinitialiser',
    login: 'Se connecter',
    logout: 'Se déconnecter',
    favorites: 'Favoris',
    noFavorites: 'Aucun favori',
    // Ajoutez d'autres traductions selon vos besoins
  },
  en: {
    propertyPrice: 'Price',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    size: 'Size',
    amenities: 'Amenities',
    contact: 'Contact',
    search: 'Search',
    filters: 'Filters',
    apply: 'Apply',
    reset: 'Reset',
    login: 'Login',
    logout: 'Logout',
    favorites: 'Favorites',
    noFavorites: 'No favorites',
    // Ajoutez d'autres traductions selon vos besoins
  },
  rw: {
    propertyPrice: 'Igiciro',
    bedrooms: 'Ibyumba',
    bathrooms: 'Ibyumba byo kwiyuhagiramo',
    size: 'Ubunini',
    amenities: 'Ibikoresho',
    contact: 'Aho waboneka',
    search: 'Gushaka',
    filters: 'Gutunganya',
    apply: 'Gushyira',
    reset: 'Gusubiramo',
    login: 'Kwinjira',
    logout: 'Gusohoka',
    favorites: 'Ibyo ukunda',
    noFavorites: 'Nta byo ukunda',
    // Ajoutez d'autres traductions selon vos besoins
  },
  sw: {
    propertyPrice: 'Bei',
    bedrooms: 'Vyumba',
    bathrooms: 'Vyumba vya kuogera',
    size: 'Ukubwa',
    amenities: 'Vifaa',
    contact: 'Mawasiliano',
    search: 'Tafuta',
    filters: 'Chujio',
    apply: 'Tumia',
    reset: 'Anza upya',
    login: 'Ingia',
    logout: 'Toka',
    favorites: 'Vipendwa',
    noFavorites: 'Hakuna vipendwa',
    // Ajoutez d'autres traductions selon vos besoins
  },
};

// Symboles des devises
const currencySymbols = {
  RWF: 'FRw',
  USD: '$',
  EUR: '€',
};

export const useLocalizedContent = () => {
  const { preferences } = useUserPreferences();
  const { language, currency } = preferences;
  
  // Obtenir les traductions selon la langue sélectionnée
  const t = useMemo(() => {
    return translations[language] || translations.fr;
  }, [language]);
  
  // Formatage du prix selon la devise sélectionnée
  const formatPrice = (price: number, originalCurrency?: string): string => {
    // Si la devise de la propriété est différente de celle de l'utilisateur,
    // on devrait faire une conversion ici. Ceci est une simulation simplifiée.
    
    // Taux de change simplifiés (à remplacer par des taux réels)
    const exchangeRates = {
      RWF: { USD: 0.00086, EUR: 0.00079 },
      USD: { RWF: 1163, EUR: 0.92 },
      EUR: { RWF: 1260, USD: 1.09 },
    };
    
    // Convertir le prix si nécessaire
    let convertedPrice = price;
    if (originalCurrency && originalCurrency !== currency) {
      const rate = exchangeRates[originalCurrency as Currency]?.[currency as keyof typeof exchangeRates[Currency]];
      if (rate) {
        convertedPrice = price * (rate as number);
      }
    }
    
    // Formater le prix
    const symbol = currencySymbols[currency];
    return currency === 'RWF'
      ? `${Math.round(convertedPrice).toLocaleString()} ${symbol}`
      : `${symbol}${Math.round(convertedPrice).toLocaleString()}`;
  };
  
  return {
    t,
    formatPrice,
    language,
    currency,
  };
};

export default useLocalizedContent; 