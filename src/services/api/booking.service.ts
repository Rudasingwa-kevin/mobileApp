import api from './config';

export interface Booking {
  id: string;
  propertyId: string;
  guestId: string;
  startDate: Date;
  endDate: Date;
  guestCount: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed';
  totalPrice: number;
  currency: string;
  message?: string;
  createdAt: Date;
}

export interface Availability {
  date: Date;
  available: boolean;
}

// Service pour les appels API liés aux réservations
export const bookingService = {
  // Récupérer toutes les réservations
  getAll: async (status?: string, propertyId?: string): Promise<Booking[]> => {
    try {
      const response = await api.get('/bookings', {
        params: { status, propertyId }
      });
      return response;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Récupérer une réservation par son ID
  getById: async (id: string): Promise<Booking> => {
    try {
      const response = await api.get(`/bookings/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching booking with ID ${id}:`, error);
      throw error;
    }
  },

  // Créer une nouvelle réservation
  create: async (bookingData: Omit<Booking, 'id' | 'status' | 'totalPrice' | 'createdAt'>): Promise<Booking> => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Mettre à jour le statut d'une réservation
  updateStatus: async (id: string, status: 'approved' | 'rejected' | 'cancelled'): Promise<Booking> => {
    try {
      const response = await api.put(`/bookings/${id}/status`, { status });
      return response;
    } catch (error) {
      console.error(`Error updating booking status ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les statistiques de réservation (pour les hôtes)
  getStats: async (): Promise<{ total: number; pending: number; approved: number; cancelled: number }> => {
    try {
      const response = await api.get('/bookings/stats');
      return response;
    } catch (error) {
      console.error('Error fetching booking statistics:', error);
      throw error;
    }
  },

  // Récupérer la disponibilité d'une propriété
  getAvailability: async (propertyId: string, startDate: Date, endDate: Date): Promise<Availability[]> => {
    try {
      const response = await api.get(`/properties/${propertyId}/availability`, {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        }
      });
      return response;
    } catch (error) {
      console.error(`Error fetching availability for property ${propertyId}:`, error);
      throw error;
    }
  },

  // Définir la disponibilité d'une propriété
  setAvailability: async (propertyId: string, dates: Date[], available: boolean): Promise<void> => {
    try {
      await api.post(`/properties/${propertyId}/availability`, {
        dates: dates.map(date => date.toISOString().split('T')[0]),
        available
      });
    } catch (error) {
      console.error(`Error setting availability for property ${propertyId}:`, error);
      throw error;
    }
  },
}; 