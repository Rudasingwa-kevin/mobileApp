import { create } from 'zustand';
import { Property, SearchFilters as AppSearchFilters } from '../types';
import { usePreferences } from './preferences';
import { propertyService } from '../services/api';

// Types pour les filtres de recherche avancée
export interface SearchFilters {
  query: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string[];
  bedrooms?: number;
  amenities?: string[];
  nearbyPointOfInterest?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'date_newest' | 'date_oldest';
}

// État du store de recherche
interface SearchState {
  // Données
  listings: Property[];
  filteredListings: Property[];
  selectedListing: Property | null;
  isLoading: boolean;
  error: string | null;
  
  // Filtres
  filters: SearchFilters;
  
  // Vue
  viewMode: 'list' | 'map';
  showFiltersModal: boolean;
  
  // Actions
  setQuery: (query: string) => void;
  setFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  toggleViewMode: () => void;
  toggleFiltersModal: () => void;
  selectListing: (id: string | null) => void;
  fetchListings: () => Promise<void>;
  fetchListingById: (id: string) => Promise<Property | null>;
  clearError: () => void;
}

// Filtres par défaut
const DEFAULT_FILTERS: SearchFilters = {
  query: '',
  sortBy: 'price_asc',
};

// Création du store
export const useSearchStore = create<SearchState>((set, get) => ({
  // État initial
  listings: [],
  filteredListings: [],
  selectedListing: null,
  isLoading: false,
  error: null,
  filters: DEFAULT_FILTERS,
  viewMode: 'list',
  showFiltersModal: false,
  
  // Actions
  setQuery: (query: string) => {
    set((state) => ({
      filters: { ...state.filters, query }
    }));
    get().applyFilters();
  },
  
  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value }
    }));
  },
  
  setFilters: (filters: Partial<SearchFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ...filters }
    }));
  },
  
  resetFilters: () => {
    set({ filters: DEFAULT_FILTERS });
    get().applyFilters();
  },
  
  applyFilters: async () => {
    const { filters } = get();
    
    set({ isLoading: true, error: null });
    
    try {
      // Convertir les filtres au format attendu par l'API
      const apiFilters: AppSearchFilters = {
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        bedrooms: filters.bedrooms,
        amenities: filters.amenities,
        type: filters.propertyType,
      };
      
      // Appel à l'API avec les filtres
      const properties = await propertyService.search(filters.query, apiFilters);
      
      // Tri côté client (si l'API ne gère pas le tri)
      let sortedProperties = [...properties];
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price_asc':
            sortedProperties.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            sortedProperties.sort((a, b) => b.price - a.price);
            break;
          case 'date_newest':
            sortedProperties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case 'date_oldest':
            sortedProperties.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
        }
      }
      
      set({ 
        filteredListings: sortedProperties,
        listings: properties,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Une erreur est survenue lors de la recherche',
        isLoading: false 
      });
    }
  },
  
  toggleViewMode: () => {
    set((state) => ({
      viewMode: state.viewMode === 'list' ? 'map' : 'list'
    }));
  },
  
  toggleFiltersModal: () => {
    set((state) => ({
      showFiltersModal: !state.showFiltersModal
    }));
  },
  
  selectListing: (id: string | null) => {
    if (!id) {
      set({ selectedListing: null });
      return;
    }
    
    // Si la propriété est déjà dans notre liste, utilisons-la
    const listingInState = get().listings.find((l) => l.id === id);
    if (listingInState) {
      set({ selectedListing: listingInState });
      return;
    }
    
    // Sinon, chargeons-la depuis l'API
    get().fetchListingById(id);
  },
  
  fetchListingById: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const property = await propertyService.getById(id);
      set({ 
        selectedListing: property,
        isLoading: false 
      });
      return property;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Une erreur est survenue lors du chargement de la propriété',
        isLoading: false 
      });
      return null;
    }
  },
  
  fetchListings: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const properties = await propertyService.getAll();
      set({ 
        listings: properties,
        filteredListings: properties,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Une erreur est survenue lors du chargement des propriétés',
        isLoading: false 
      });
    }
  },
  
  clearError: () => {
    set({ error: null });
  }
})); 