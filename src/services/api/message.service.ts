import api from './config';

// Types pour les messages et conversations
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  lastMessage?: {
    text: string;
    senderId: string;
    createdAt: Date;
    read: boolean;
  };
  propertyId?: string;
  propertyTitle?: string;
  unreadCount: number;
  updatedAt: Date;
}

// Service pour les appels API liés aux messages
export const messageService = {
  // Récupérer toutes les conversations
  getConversations: async (): Promise<Conversation[]> => {
    try {
      const response = await api.get('/conversations');
      return response;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },

  // Récupérer une conversation par son ID
  getConversationById: async (conversationId: string): Promise<Conversation> => {
    try {
      const response = await api.get(`/conversations/${conversationId}`);
      return response;
    } catch (error) {
      console.error(`Error fetching conversation ${conversationId}:`, error);
      throw error;
    }
  },

  // Récupérer les messages d'une conversation
  getMessages: async (conversationId: string): Promise<Message[]> => {
    try {
      const response = await api.get(`/conversations/${conversationId}/messages`);
      return response;
    } catch (error) {
      console.error(`Error fetching messages for conversation ${conversationId}:`, error);
      throw error;
    }
  },

  // Envoyer un message
  sendMessage: async (conversationId: string, text: string): Promise<Message> => {
    try {
      const response = await api.post(`/conversations/${conversationId}/messages`, { text });
      return response;
    } catch (error) {
      console.error(`Error sending message to conversation ${conversationId}:`, error);
      throw error;
    }
  },

  // Marquer une conversation comme lue
  markAsRead: async (conversationId: string): Promise<void> => {
    try {
      await api.put(`/conversations/${conversationId}/read`);
    } catch (error) {
      console.error(`Error marking conversation ${conversationId} as read:`, error);
      throw error;
    }
  },

  // Créer une nouvelle conversation avec un propriétaire
  createConversation: async (ownerId: string, propertyId: string, initialMessage: string): Promise<Conversation> => {
    try {
      const response = await api.post('/conversations', {
        ownerId,
        propertyId,
        initialMessage,
      });
      return response;
    } catch (error) {
      console.error('Error creating new conversation:', error);
      throw error;
    }
  },

  // Récupérer les statistiques des messages pour un hôte
  getMessageStats: async (): Promise<{ total: number; unread: number }> => {
    try {
      const response = await api.get('/conversations/stats');
      return response;
    } catch (error) {
      console.error('Error fetching message statistics:', error);
      throw error;
    }
  },
}; 