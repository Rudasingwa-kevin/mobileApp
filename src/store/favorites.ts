import { create } from 'zustand';
import { Property } from '../types';

interface FavoritesState {
  favoriteIds: string[];
  favorites: Property[];
  addFavorite: (property: Property) => void;
  removeFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteIds: [],
  favorites: [],
  
  addFavorite: (property) => {
    set((state) => {
      // Vérifier si le logement est déjà dans les favoris
      if (state.favoriteIds.includes(property.id)) {
        return state;
      }
      
      return {
        favoriteIds: [...state.favoriteIds, property.id],
        favorites: [...state.favorites, property],
      };
    });
  },
  
  removeFavorite: (propertyId) => {
    set((state) => ({
      favoriteIds: state.favoriteIds.filter(id => id !== propertyId),
      favorites: state.favorites.filter(property => property.id !== propertyId),
    }));
  },
  
  isFavorite: (propertyId) => {
    return get().favoriteIds.includes(propertyId);
  },
}));
