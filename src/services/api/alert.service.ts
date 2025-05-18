import api from './config';
import { SearchFilters } from '../../types';

export interface Alert {
  id: string;
  name: string;
  filters: SearchFilters;
  frequency: 'daily' | 'weekly' | 'instant';
  createdAt: Date;
  userId: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'message' | 'system' | 'booking';
  read: boolean;
  createdAt: Date;
  relatedId?: string; // ID de la propriété, conversation, etc. concernée
}

// Service pour les appels API liés aux alertes et notifications
export const alertService = {
  // Récupérer toutes les alertes de l'utilisateur
  getAlerts: async (): Promise<Alert[]> => {
    try {
      const response = await api.get('/alerts');
      return response;
    } catch (error) {
      console.error('Error fetching alerts:', error);
      throw error;
    }
  },

  // Créer une nouvelle alerte
  createAlert: async (alertData: Omit<Alert, 'id' | 'createdAt' | 'userId'>): Promise<Alert> => {
    try {
      const response = await api.post('/alerts', alertData);
      return response;
    } catch (error) {
      console.error('Error creating alert:', error);
      throw error;
    }
  },

  // Mettre à jour une alerte
  updateAlert: async (id: string, alertData: Partial<Alert>): Promise<Alert> => {
    try {
      const response = await api.put(`/alerts/${id}`, alertData);
      return response;
    } catch (error) {
      console.error(`Error updating alert ${id}:`, error);
      throw error;
    }
  },

  // Supprimer une alerte
  deleteAlert: async (id: string): Promise<void> => {
    try {
      await api.delete(`/alerts/${id}`);
    } catch (error) {
      console.error(`Error deleting alert ${id}:`, error);
      throw error;
    }
  },

  // Récupérer toutes les notifications
  getNotifications: async (readStatus?: boolean): Promise<Notification[]> => {
    try {
      const response = await api.get('/notifications', {
        params: { read: readStatus }
      });
      return response;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Marquer une notification comme lue
  markAsRead: async (id: string): Promise<void> => {
    try {
      await api.put(`/notifications/${id}/read`);
    } catch (error) {
      console.error(`Error marking notification ${id} as read:`, error);
      throw error;
    }
  },
}; 