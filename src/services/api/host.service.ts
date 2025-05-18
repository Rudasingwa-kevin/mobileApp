import api from './config';

export interface HostStats {
  propertyCount: number;
  totalBookings: number;
  occupancyRate: number;
  averageRating: number;
  totalRevenue: {
    amount: number;
    currency: string;
  };
  pendingReviews: number;
  unreadMessages: number;
}

export interface PropertyStats {
  propertyId: string;
  bookingCount: number;
  occupancyRate: number;
  revenue: {
    amount: number;
    currency: string;
  };
  averageRating: number;
  reviewCount: number;
}

export interface RevenueData {
  date: string;
  amount: number;
  currency: string;
}

export interface OccupancyData {
  date: string;
  rate: number;
}

// Service pour les appels API liés aux statistiques et fonctionnalités des hôtes
export const hostService = {
  // Récupérer les statistiques globales de l'hôte
  getOverview: async (): Promise<HostStats> => {
    try {
      const response = await api.get('/host/stats/overview');
      return response;
    } catch (error) {
      console.error('Error fetching host statistics overview:', error);
      throw error;
    }
  },

  // Récupérer les statistiques d'une propriété spécifique
  getPropertyStats: async (propertyId: string, period?: 'week' | 'month' | 'year'): Promise<PropertyStats> => {
    try {
      const response = await api.get(`/host/stats/properties/${propertyId}`, {
        params: { period }
      });
      return response;
    } catch (error) {
      console.error(`Error fetching statistics for property ${propertyId}:`, error);
      throw error;
    }
  },

  // Récupérer les données de revenus
  getRevenueData: async (startDate: Date, endDate: Date): Promise<RevenueData[]> => {
    try {
      const response = await api.get('/host/stats/revenue', {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        }
      });
      return response;
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      throw error;
    }
  },

  // Récupérer les données d'occupation
  getOccupancyData: async (startDate: Date, endDate: Date): Promise<OccupancyData[]> => {
    try {
      const response = await api.get('/host/stats/occupancy', {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        }
      });
      return response;
    } catch (error) {
      console.error('Error fetching occupancy data:', error);
      throw error;
    }
  },
}; 