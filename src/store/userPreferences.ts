import { create } from 'zustand';

export type Language = 'fr' | 'en' | 'rw' | 'sw';
export type Currency = 'RWF' | 'USD' | 'EUR';

export interface UserPreferences {
  fullName: string;
  email: string;
  language: Language;
  currency: Currency;
  isLoggedIn: boolean;
  authProvider?: 'google' | 'facebook' | 'manual';
  hasCompletedOnboarding: boolean;
}

interface UserPreferencesState {
  preferences: UserPreferences;
  setUserPreferences: (preferences: Partial<UserPreferences>) => void;
  resetUserPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  fullName: '',
  email: '',
  language: 'fr',
  currency: 'USD',
  isLoggedIn: false,
  hasCompletedOnboarding: false,
};

export const useUserPreferences = create<UserPreferencesState>((set) => ({
  preferences: defaultPreferences,
  
  setUserPreferences: (newPreferences) => 
    set((state) => ({
      preferences: { ...state.preferences, ...newPreferences }
    })),
  
  resetUserPreferences: () => 
    set({ preferences: defaultPreferences }),
})); 