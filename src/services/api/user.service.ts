import api from './config';
import { User } from '../../types';

// Service pour les appels API liés aux utilisateurs
export const userService = {
  // Récupérer le profil de l'utilisateur actuel
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get('/users/me');
      return response;
    } catch (error) {
      console.error('Error fetching current user profile:', error);
      throw error;
    }
  },

  // Mettre à jour le profil de l'utilisateur
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    try {
      const response = await api.put('/users/me', userData);
      return response;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Changer le mot de passe
  changePassword: async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
    try {
      const response = await api.put('/users/me/password', {
        currentPassword,
        newPassword,
      });
      return response;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },

  // Téléverser une photo de profil
  uploadAvatar: async (formData: FormData): Promise<{ avatarUrl: string }> => {
    try {
      const response = await api.post('/users/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  },

  // Mettre à jour les préférences de l'utilisateur
  updatePreferences: async (preferences: { 
    preferredCurrency?: string; 
    preferredLanguage?: string;
    notifications?: boolean;
  }): Promise<User> => {
    try {
      const response = await api.put('/users/me/preferences', preferences);
      return response;
    } catch (error) {
      console.error('Error updating user preferences:', error);
      throw error;
    }
  },

  // Récupérer les propriétés sauvegardées par l'utilisateur
  getSavedProperties: async (): Promise<string[]> => {
    try {
      const response = await api.get('/users/me/saved-properties');
      return response;
    } catch (error) {
      console.error('Error fetching saved properties:', error);
      throw error;
    }
  },

  // Ajouter une propriété aux favoris
  saveProperty: async (propertyId: string): Promise<{ message: string }> => {
    try {
      const response = await api.post('/users/me/saved-properties', { propertyId });
      return response;
    } catch (error) {
      console.error(`Error saving property ${propertyId}:`, error);
      throw error;
    }
  },

  // Retirer une propriété des favoris
  unsaveProperty: async (propertyId: string): Promise<{ message: string }> => {
    try {
      const response = await api.delete(`/users/me/saved-properties/${propertyId}`);
      return response;
    } catch (error) {
      console.error(`Error removing saved property ${propertyId}:`, error);
      throw error;
    }
  },
}; 