import { useEffect } from 'react';
import { usePreferences } from '../store/preferences';
import i18n from '../utils/i18n';

/**
 * Hook React pour synchroniser la langue entre i18n et les préférences utilisateur
 * Ce hook devrait être utilisé dans les écrans principaux pour s'assurer
 * que la langue est correctement synchronisée à chaque changement.
 */
export const useSyncLanguage = () => {
  const { language, initializeLanguageFromSystem } = usePreferences();
  
  useEffect(() => {
    // Initialise la langue au démarrage si nécessaire
    initializeLanguageFromSystem();
    
    // S'assure que i18n utilise la même langue que celle dans les préférences
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, initializeLanguageFromSystem]);
}; 