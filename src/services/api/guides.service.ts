import api from './config';

export interface GuideCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface Guide {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  image: string;
  content: string;
  isNew?: boolean;
  createdAt: Date;
}

// Service pour les appels API liés aux guides locaux
export const guidesService = {
  // Récupérer toutes les catégories de guides
  getCategories: async (): Promise<GuideCategory[]> => {
    try {
      const response = await api.get('/guides/categories');
      return response;
    } catch (error) {
      console.error('Error fetching guide categories:', error);
      throw error;
    }
  },

  // Récupérer tous les guides
  getAll: async (categoryId?: string): Promise<Guide[]> => {
    try {
      const response = await api.get('/guides', {
        params: { categoryId }
      });
      return response;
    } catch (error) {
      console.error('Error fetching guides:', error);
      throw error;
    }
  },

  // Récupérer un guide par son ID
  getById: async (id: string): Promise<Guide> => {
    try {
      const response = await api.get(`/guides/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching guide with ID ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les guides récents
  getNew: async (): Promise<Guide[]> => {
    try {
      const response = await api.get('/guides/new');
      return response;
    } catch (error) {
      console.error('Error fetching new guides:', error);
      throw error;
    }
  },
}; 