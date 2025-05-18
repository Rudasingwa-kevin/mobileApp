import api from './config';
import { User } from '../../types';

// Service pour les appels API liés à l'authentification
export const authService = {
  // Authentifier un utilisateur
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  // Enregistrer un nouvel utilisateur
  register: async (userData: { fullName: string; email: string; password: string; phoneNumber?: string }): Promise<{ user: User; token: string }> => {
    try {
      const response = await api.post('/auth/register', userData);
      return response;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  },

  // Réinitialiser le mot de passe
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response;
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
  },

  // Réinitialiser le mot de passe avec un token
  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return response;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },

  // Vérifier si le token est valide
  verifyToken: async (): Promise<{ valid: boolean; user?: User }> => {
    try {
      const response = await api.get('/auth/verify');
      return response;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw error;
    }
  },

  // Déconnecter l'utilisateur (côté serveur)
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  },
}; 