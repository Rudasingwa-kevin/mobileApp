import { NavigatorScreenParams } from '@react-navigation/native';
import { AuthStackParamList } from '../navigation/AuthNavigator';

// Type pour les propriétés de navigation
export type RootStackParamList = {
  // Auth flow
  Auth: NavigatorScreenParams<AuthStackParamList>;
  // Main app flow
  MainTabs: undefined;
  Home: undefined;
  Search: undefined;
  PropertyDetails: { propertyId: string };
  Profile: undefined;
  PreferenceCarousel: undefined;
  MapScreen: undefined;
  Map: undefined;
  Saved: undefined;
  
  // Messaging screens
  MessagesList: undefined;
  Conversation: { conversationId: string };
  NewMessage: { 
    propertyId: string; 
    propertyTitle: string; 
    ownerId: string; 
    ownerName: string; 
    ownerAvatar: string;
  };
  
  // Reviews screens
  LeaveReview: { 
    propertyId: string;
    propertyTitle: string;
    ownerId: string;
    ownerName: string;
  };

  // Local guides screens
  LocalGuide: undefined;
  GuideDetail: { guideId: string };
};

// Type pour les propriétés immobilières
export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  bedrooms?: number;
  bathrooms?: number;
  surface?: number;
  location: {
    district?: string;
    city: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    }
  };
  amenities?: string[];
  images: string[];
  rating?: number;
  reviews?: number;
  contactPhone?: string;
  contactEmail?: string;
  owner?: {
    id: string;
    name: string;
    avatar?: string;
  }
}

// Type pour le filtre de recherche
export interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  type?: string[];
  district?: string[];
}

// Type pour l'état d'authentification
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Type pour l'utilisateur
export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  savedProperties?: string[];
  preferredCurrency?: string;
  preferredLanguage?: string;
  notifications?: boolean;
}

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  VILLA = 'villa',
  STUDIO = 'studio',
  ROOM = 'room',
}

export enum Amenity {
  WIFI = 'wifi',
  AC = 'ac',
  KITCHEN = 'kitchen',
  WASHING_MACHINE = 'washing_machine',
  TV = 'tv',
  PARKING = 'parking',
  POOL = 'pool',
  LAKE_VIEW = 'lake_view',
}

// Ajoutez le type Review pour le système d'avis
export interface Review {
  id: string;
  propertyId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
  isVerified?: boolean;
  stayDuration?: 'court terme' | 'long terme';
  ownerReply?: {
    text: string;
    date: Date;
  };
}

// Ajoutez les types pour la gestion des états des avis
export interface ReviewsState {
  reviews: Record<string, Review[]>;
  isLoading: boolean;
  error: string | null;
  // Actions
  fetchReviews: (propertyId: string) => Promise<void>;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  deleteReview: (reviewId: string, propertyId: string) => void;
  replyToReview: (reviewId: string, propertyId: string, replyText: string) => void;
  getAverageRating: (propertyId: string) => number;
  getReviewsForProperty: (propertyId: string) => Review[];
  getSortedReviews: (propertyId: string, sortOrder: 'recent' | 'highest' | 'lowest') => Review[];
}

// Type pour la configuration de tri des avis
export type ReviewSortOrder = 'recent' | 'highest' | 'lowest';

// Ajoutez les types pour les guides locaux
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