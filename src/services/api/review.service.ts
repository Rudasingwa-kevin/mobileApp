import api from './config';
import { Review } from '../../types';

// Service pour les appels API liés aux avis
export const reviewService = {
  // Récupérer tous les avis pour une propriété
  getReviewsByPropertyId: async (propertyId: string): Promise<Review[]> => {
    try {
      const response = await api.get(`/properties/${propertyId}/reviews`);
      return response;
    } catch (error) {
      console.error(`Error fetching reviews for property ${propertyId}:`, error);
      throw error;
    }
  },

  // Récupérer un avis par son ID
  getReviewById: async (reviewId: string): Promise<Review> => {
    try {
      const response = await api.get(`/reviews/${reviewId}`);
      return response;
    } catch (error) {
      console.error(`Error fetching review ${reviewId}:`, error);
      throw error;
    }
  },

  // Ajouter un avis
  addReview: async (review: Omit<Review, 'id' | 'date' | 'authorAvatar' | 'authorName' | 'isVerified'>): Promise<Review> => {
    try {
      const response = await api.post(`/properties/${review.propertyId}/reviews`, review);
      return response;
    } catch (error) {
      console.error(`Error adding review for property ${review.propertyId}:`, error);
      throw error;
    }
  },

  // Supprimer un avis
  deleteReview: async (reviewId: string): Promise<void> => {
    try {
      await api.delete(`/reviews/${reviewId}`);
    } catch (error) {
      console.error(`Error deleting review ${reviewId}:`, error);
      throw error;
    }
  },

  // Mettre à jour un avis
  updateReview: async (reviewId: string, reviewData: Partial<Review>): Promise<Review> => {
    try {
      const response = await api.put(`/reviews/${reviewId}`, reviewData);
      return response;
    } catch (error) {
      console.error(`Error updating review ${reviewId}:`, error);
      throw error;
    }
  },

  // Répondre à un avis (en tant que propriétaire)
  replyToReview: async (reviewId: string, replyText: string): Promise<Review> => {
    try {
      const response = await api.post(`/reviews/${reviewId}/reply`, { text: replyText });
      return response;
    } catch (error) {
      console.error(`Error replying to review ${reviewId}:`, error);
      throw error;
    }
  },

  // Récupérer les avis que l'utilisateur a laissés
  getUserReviews: async (): Promise<Review[]> => {
    try {
      const response = await api.get('/users/me/reviews');
      return response;
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      throw error;
    }
  },

  // Récupérer les avis reçus pour les propriétés de l'utilisateur
  getHostReviews: async (): Promise<Review[]> => {
    try {
      const response = await api.get('/users/me/properties/reviews');
      return response;
    } catch (error) {
      console.error('Error fetching host property reviews:', error);
      throw error;
    }
  },
}; 