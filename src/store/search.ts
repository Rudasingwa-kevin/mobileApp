import { create } from 'zustand';
import { Property } from '../types';
import { mockListings } from '../data/mockListings';
import { usePreferences } from './preferences';

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
  
  applyFilters: () => {
    const { listings, filters } = get();
    const { currency } = usePreferences.getState();
    
    set({ isLoading: true });
    
    // Simuler un délai d'API
    setTimeout(() => {
      let filtered = [...listings];
      
      // Filtre par texte
      if (filters.query) {
        const query = filters.query.toLowerCase();
        filtered = filtered.filter(
          (property) =>
            property.title.toLowerCase().includes(query) ||
            property.description.toLowerCase().includes(query) ||
            property.location.city.toLowerCase().includes(query) ||
            property.location.district?.toLowerCase().includes(query) ||
            property.location.address?.toLowerCase().includes(query)
        );
      }
      
      // Filtre par prix
      if (filters.minPrice !== undefined) {
        filtered = filtered.filter((property) => property.price >= filters.minPrice!);
      }
      
      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter((property) => property.price <= filters.maxPrice!);
      }
      
      // Filtre par type de propriété
      if (filters.propertyType && filters.propertyType.length > 0) {
        filtered = filtered.filter((property) => 
          property.type && filters.propertyType!.includes(property.type)
        );
      }
      
      // Filtre par nombre de chambres
      if (filters.bedrooms !== undefined) {
        filtered = filtered.filter((property) => property.bedrooms >= filters.bedrooms!);
      }
      
      // Filtre par commodités
      if (filters.amenities && filters.amenities.length > 0) {
        filtered = filtered.filter((property) =>
          filters.amenities!.every((amenity) =>
            property.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
          )
        );
      }
      
      // Tri
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price_asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'date_newest':
            filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            break;
          case 'date_oldest':
            filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
            break;
        }
      }
      
      set({ 
        filteredListings: filtered,
        isLoading: false 
      });
    }, 500);
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
    const listing = id ? get().listings.find((l) => l.id === id) || null : null;
    set({ selectedListing: listing });
  },
  
  fetchListings: async () => {
    set({ isLoading: true });
    
    // Simuler un appel API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        set({ 
          listings: mockListings,
          filteredListings: mockListings,
          isLoading: false
        });
        resolve();
      }, 1000);
    });
  }
})); 