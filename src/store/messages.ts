import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { mockConversations, currentUser, getRandomResponse, Conversation, Message } from '../data/mockMessages';

interface MessagesState {
  conversations: Conversation[];
  totalUnreadCount: number;
  
  // Actions
  sendMessage: (conversationId: string, text: string) => Promise<void>;
  markConversationAsRead: (conversationId: string) => void;
  getConversation: (conversationId: string) => Conversation | undefined;
  startNewConversation: (propertyId: string, propertyTitle: string, ownerId: string, ownerName: string, ownerAvatar: string) => string;
}

export const useMessagesStore = create<MessagesState>((set, get) => ({
  conversations: [...mockConversations],
  totalUnreadCount: mockConversations.reduce((sum, conv) => sum + conv.unreadCount, 0),
  
  sendMessage: async (conversationId: string, text: string) => {
    // Check if the conversation exists
    const { conversations } = get();
    const conversationIndex = conversations.findIndex(c => c.id === conversationId);
    
    if (conversationIndex === -1) return;
    
    // Create a new message
    const newMessage: Message = {
      id: uuidv4(),
      text,
      createdAt: new Date(),
      user: { ...currentUser },
      sent: true,
      received: false,
      read: false,
    };
    
    // Update the conversation
    const updatedConversations = [...conversations];
    updatedConversations[conversationIndex] = {
      ...updatedConversations[conversationIndex],
      messages: [...updatedConversations[conversationIndex].messages, newMessage],
      lastMessageAt: newMessage.createdAt,
    };
    
    // Update state
    set({ conversations: updatedConversations });
    
    // Mark message as received after 1 second
    setTimeout(() => {
      const { conversations } = get();
      const conversationIndex = conversations.findIndex(c => c.id === conversationId);
      
      if (conversationIndex === -1) return;
      
      const updatedMessages = [...conversations[conversationIndex].messages];
      const messageIndex = updatedMessages.findIndex(m => m.id === newMessage.id);
      
      if (messageIndex === -1) return;
      
      updatedMessages[messageIndex] = {
        ...updatedMessages[messageIndex],
        received: true,
      };
      
      const updatedConversations = [...conversations];
      updatedConversations[conversationIndex] = {
        ...updatedConversations[conversationIndex],
        messages: updatedMessages,
      };
      
      set({ conversations: updatedConversations });
      
      // Simulate owner response after 3 seconds
      setTimeout(() => {
        const { conversations } = get();
        const conversationIndex = conversations.findIndex(c => c.id === conversationId);
        
        if (conversationIndex === -1) return;
        
        const ownerResponse: Message = {
          id: uuidv4(),
          text: getRandomResponse(),
          createdAt: new Date(),
          user: {
            id: conversations[conversationIndex].otherUser.id,
            name: conversations[conversationIndex].otherUser.name,
            avatar: conversations[conversationIndex].otherUser.avatar,
          },
          sent: true,
          received: true,
          read: false,
        };
        
        const updatedConversations = [...conversations];
        updatedConversations[conversationIndex] = {
          ...updatedConversations[conversationIndex],
          messages: [...updatedConversations[conversationIndex].messages, ownerResponse],
          unreadCount: updatedConversations[conversationIndex].unreadCount + 1,
          lastMessageAt: ownerResponse.createdAt,
        };
        
        set({ 
          conversations: updatedConversations,
          totalUnreadCount: get().totalUnreadCount + 1,
        });
      }, 3000);
    }, 1000);
  },
  
  markConversationAsRead: (conversationId: string) => {
    const { conversations } = get();
    const conversationIndex = conversations.findIndex(c => c.id === conversationId);
    
    if (conversationIndex === -1) return;
    
    const previousUnreadCount = conversations[conversationIndex].unreadCount;
    
    // Mark all messages as read
    const updatedMessages = conversations[conversationIndex].messages.map(message => ({
      ...message,
      read: true,
    }));
    
    const updatedConversations = [...conversations];
    updatedConversations[conversationIndex] = {
      ...updatedConversations[conversationIndex],
      messages: updatedMessages,
      unreadCount: 0,
    };
    
    set({ 
      conversations: updatedConversations,
      totalUnreadCount: get().totalUnreadCount - previousUnreadCount,
    });
  },
  
  getConversation: (conversationId: string) => {
    return get().conversations.find(c => c.id === conversationId);
  },
  
  startNewConversation: (propertyId: string, propertyTitle: string, ownerId: string, ownerName: string, ownerAvatar: string) => {
    // Check if a conversation already exists
    const { conversations } = get();
    const existingConversation = conversations.find(
      c => c.propertyId === propertyId && c.otherUser.id === ownerId
    );
    
    if (existingConversation) {
      return existingConversation.id;
    }
    
    // Create a new conversation
    const newConversationId = uuidv4();
    const newConversation: Conversation = {
      id: newConversationId,
      propertyId,
      propertyTitle,
      otherUser: {
        id: ownerId,
        name: ownerName,
        avatar: ownerAvatar,
        isOwner: true,
      },
      messages: [],
      unreadCount: 0,
      lastMessageAt: new Date(),
    };
    
    set({
      conversations: [...conversations, newConversation],
    });
    
    return newConversationId;
  },
})); 