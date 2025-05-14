import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { changeLanguage as i18nChangeLanguage } from '../utils/i18n';

export type Language = 'fr' | 'en' | 'rw' | 'sw';
export type Currency = 'RWF' | 'USD' | 'EUR';

interface PreferencesState {
  language: Language;
  currency: Currency;
  notifications: boolean;
  darkMode: boolean;
  setLanguage: (language: Language) => Promise<void>;
  setCurrency: (currency: Currency) => Promise<void>;
  setNotifications: (enabled: boolean) => Promise<void>;
  setDarkMode: (enabled: boolean) => Promise<void>;
  initializeLanguageFromSystem: () => Promise<void>;
  resetPreferences: () => Promise<void>;
}

const DEFAULT_PREFERENCES: Omit<PreferencesState, 'setLanguage' | 'setCurrency' | 'setNotifications' | 'setDarkMode' | 'initializeLanguageFromSystem' | 'resetPreferences'> = {
  language: 'fr',
  currency: 'RWF',
  notifications: true,
  darkMode: false,
};

// Fonction utilitaire pour obtenir la langue du système
const getSystemLanguage = (): Language => {
  const deviceLocale = Localization.locale.slice(0, 2);
  
  // Vérifier si la langue est supportée, sinon utiliser français par défaut
  switch (deviceLocale) {
    case 'fr': return 'fr';
    case 'en': return 'en';
    case 'rw': return 'rw';
    case 'sw': return 'sw';
    default: return 'fr';
  }
};

// Store persisté avec AsyncStorage
export const usePreferences = create<PreferencesState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_PREFERENCES,

      setLanguage: async (language) => {
        return new Promise<void>((resolve) => {
          set({ language });
          // Synchroniser avec i18n
          i18nChangeLanguage(language);
          setTimeout(resolve, 50);
        });
      },
      
      setCurrency: async (currency) => {
        return new Promise<void>((resolve) => {
          set({ currency });
          setTimeout(resolve, 50);
        });
      },
      
      setNotifications: async (notifications) => {
        return new Promise<void>((resolve) => {
          set({ notifications });
          setTimeout(resolve, 50);
        });
      },
      
      setDarkMode: async (darkMode) => {
        return new Promise<void>((resolve) => {
          set({ darkMode });
          setTimeout(resolve, 50);
        });
      },
      
      initializeLanguageFromSystem: async () => {
        return new Promise<void>((resolve) => {
          const currentLang = get().language;
          
          // Si aucune langue n'est encore définie, utiliser celle du système
          if (!currentLang) {
            const systemLanguage = getSystemLanguage();
            set({ language: systemLanguage });
            // Synchroniser avec i18n
            i18nChangeLanguage(systemLanguage);
          } else {
            // Assurer la synchronisation avec i18n
            i18nChangeLanguage(currentLang);
          }
          
          setTimeout(resolve, 50);
        });
      },
      
      resetPreferences: async () => {
        return new Promise<void>((resolve) => {
          set(DEFAULT_PREFERENCES);
          // Synchroniser avec i18n
          i18nChangeLanguage(DEFAULT_PREFERENCES.language);
          setTimeout(resolve, 50);
        });
      },
    }),
    {
      name: 'preferences-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 