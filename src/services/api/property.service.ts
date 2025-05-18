import api from './config';
import { Property, SearchFilters } from '../../types';

// Service pour les appels API liés aux propriétés
export const propertyService = {
  // Récupérer toutes les propriétés
  getAll: async (): Promise<Property[]> => {
    try {
      const response = await api.get('/properties');
      return response;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },

  // Récupérer une propriété par son ID
  getById: async (id: string): Promise<Property> => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching property with ID ${id}:`, error);
      throw error;
    }
  },

  // Rechercher des propriétés
  search: async (query: string, filters?: SearchFilters): Promise<Property[]> => {
    try {
      const response = await api.get('/properties/search', { 
        params: { 
          query,
          ...filters 
        } 
      });
      return response;
    } catch (error) {
      console.error('Error searching properties:', error);
      throw error;
    }
  },

  // Créer une nouvelle propriété
  create: async (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> => {
    try {
      const response = await api.post('/properties', propertyData);
      return response;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  },

  // Mettre à jour une propriété
  update: async (id: string, propertyData: Partial<Property>): Promise<Property> => {
    try {
      const response = await api.put(`/properties/${id}`, propertyData);
      return response;
    } catch (error) {
      console.error(`Error updating property with ID ${id}:`, error);
      throw error;
    }
  },

  // Supprimer une propriété
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/properties/${id}`);
    } catch (error) {
      console.error(`Error deleting property with ID ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les propriétés d'un propriétaire
  getByOwnerId: async (ownerId: string): Promise<Property[]> => {
    try {
      const response = await api.get(`/properties/owner/${ownerId}`);
      return response;
    } catch (error) {
      console.error(`Error fetching properties for owner ${ownerId}:`, error);
      throw error;
    }
  },
}; 