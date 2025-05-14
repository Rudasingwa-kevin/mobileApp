import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthProvider = 'manual' | 'google' | 'facebook' | null;

interface UserState {
  user: {
    id: string | null;
    fullName: string | null;
    email: string | null;
    photoURL: string | null;
    authProvider: AuthProvider;
    isLoggedIn: boolean;
    hasCompletedOnboarding: boolean;
  };
  actions: {
    login: (userData: {
      fullName: string;
      email: string;
      authProvider: AuthProvider;
      photoURL?: string;
    }) => Promise<void>;
    logout: () => Promise<void>;
    updateUserData: (data: Partial<UserState['user']>) => Promise<void>;
    setOnboardingCompleted: (completed: boolean) => Promise<void>;
  };
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        id: null,
        fullName: null,
        email: null,
        photoURL: null,
        authProvider: null,
        isLoggedIn: false,
        hasCompletedOnboarding: false,
      },
      actions: {
        login: async (userData) => {
          set((state) => ({
            user: {
              ...state.user,
              id: `user-${Date.now()}`, // Simulation d'un ID unique
              fullName: userData.fullName,
              email: userData.email,
              photoURL: userData.photoURL || null,
              authProvider: userData.authProvider,
              isLoggedIn: true,
            },
          }));
        },
        logout: async () => {
          set((state) => ({
            user: {
              ...state.user,
              id: null,
              fullName: null,
              email: null,
              photoURL: null,
              authProvider: null,
              isLoggedIn: false,
            },
          }));
        },
        updateUserData: async (data) => {
          set((state) => ({
            user: {
              ...state.user,
              ...data,
            },
          }));
        },
        setOnboardingCompleted: async (completed) => {
          return new Promise<void>((resolve) => {
            set((state) => ({
              user: {
                ...state.user,
                hasCompletedOnboarding: completed,
              },
            }));
            // Petit délai pour s'assurer que le state est mis à jour
            setTimeout(resolve, 100);
          });
        },
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Hooks pour faciliter l'accès aux données et actions
export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions); 