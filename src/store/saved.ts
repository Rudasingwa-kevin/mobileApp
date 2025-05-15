import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Property } from '../types';

// Mock data for saved properties
const mockSavedProperties: Property[] = [
  {
    id: '1',
    title: 'Villa Moderne avec Vue sur le Lac Kivu',
    description: 'Magnifique villa avec vue panoramique sur le lac Kivu',
    price: 1200,
    currency: 'USD',
    propertyType: 'villa',
    bedrooms: 3,
    bathrooms: 2,
    size: 180,
    location: {
      address: 'Avenue du Lac 123',
      city: 'Gisenyi',
      country: 'Rwanda',
      latitude: -1.6983,
      longitude: 29.2513
    },
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-47971380/original/a924a493-6c82-468d-8df7-3b0ca17d89d3.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-47971380/original/aa078255-d1be-4e76-a28b-c28dc49973c4.jpeg'
    ],
    amenities: ['Wifi', 'Parking', 'Eau chaude', 'Jardin', 'Sécurité 24/7'],
    ownerId: 'owner1',
    verified: true,
    dateAdded: new Date('2023-08-15').toISOString(),
    rating: 4.8,
    reviewCount: 24
  },
  {
    id: '2',
    title: 'Appartement Moderne Centre-Ville',
    description: 'Bel appartement au centre-ville de Gisenyi, proche de toutes commodités',
    price: 750,
    currency: 'USD',
    propertyType: 'appartement',
    bedrooms: 2,
    bathrooms: 1,
    size: 95,
    location: {
      address: 'Rue du Marché 45',
      city: 'Gisenyi',
      country: 'Rwanda',
      latitude: -1.7032,
      longitude: 29.2566
    },
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-826494959841460145/original/d0e6368d-bab0-4394-9947-a5662e6fcd81.jpeg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-826494959841460145/original/32f161d5-b7a4-43a0-8909-f216428f8117.jpeg'
    ],
    amenities: ['Wifi', 'Parking', 'Balcon', 'Climatisation'],
    ownerId: 'owner2',
    verified: true,
    dateAdded: new Date('2023-09-20').toISOString(),
    rating: 4.6,
    reviewCount: 18
  },
  {
    id: '3',
    title: 'Studio Près de la Plage',
    description: 'Studio cosy à 5 minutes à pied de la plage du lac Kivu',
    price: 480000,
    currency: 'RWF',
    propertyType: 'studio',
    bedrooms: 1,
    bathrooms: 1,
    size: 45,
    location: {
      address: 'Avenue de la Plage 78',
      city: 'Gisenyi',
      country: 'Rwanda',
      latitude: -1.6937,
      longitude: 29.2591
    },
    images: [
      'https://a0.muscache.com/im/pictures/e25a9b25-fa98-4160-bfd1-039287bf38b6.jpg',
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48509375/original/0e479ecc-4d7c-41f2-a3c1-9ba74abf15e2.jpeg'
    ],
    amenities: ['Wifi', 'Kitchenette', 'Vue sur le lac'],
    ownerId: 'owner3',
    verified: false,
    dateAdded: new Date('2023-10-05').toISOString(),
    rating: 4.2,
    reviewCount: 8
  },
  {
    id: '4',
    title: 'Maison Familiale Spacieuse',
    description: 'Grande maison idéale pour les familles, avec jardin et aire de jeux',
    price: 1500,
    currency: 'USD',
    propertyType: 'maison',
    bedrooms: 4,
    bathrooms: 3,
    size: 220,
    location: {
      address: 'Rue des Fleurs 12',
      city: 'Gisenyi',
      country: 'Rwanda',
      latitude: -1.7103,
      longitude: 29.2476
    },
    images: [
      'https://a0.muscache.com/im/pictures/c61bbeb8-fbc5-4b8a-8517-af81865bc285.jpg',
      'https://a0.muscache.com/im/pictures/miso/Hosting-43500243/original/f63bc77e-e666-4e1c-8787-497c62ef2a30.jpeg'
    ],
    amenities: ['Wifi', 'Parking', 'Jardin', 'Terrasse', 'Cuisine équipée', 'Machine à laver'],
    ownerId: 'owner4',
    verified: true,
    dateAdded: new Date('2023-07-10').toISOString(),
    rating: 4.9,
    reviewCount: 36
  }
];

interface SavedState {
  savedItems: Property[];
  lastSorted: 'dateAdded' | 'price' | 'type';
  isLoading: boolean;
  
  // Actions
  toggleSave: (property: Property) => void;
  removeSaved: (propertyId: string) => void;
  isSaved: (propertyId: string) => boolean;
  sortBy: (criterion: 'dateAdded' | 'price' | 'type') => void;
  clearAll: () => void;
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      savedItems: [...mockSavedProperties], // Initialize with mock data
      lastSorted: 'dateAdded',
      isLoading: false,
      
      toggleSave: (property: Property) => {
        const { savedItems } = get();
        const isAlreadySaved = savedItems.some(item => item.id === property.id);
        
        if (isAlreadySaved) {
          set({
            savedItems: savedItems.filter(item => item.id !== property.id)
          });
        } else {
          set({
            savedItems: [...savedItems, { ...property, dateAdded: new Date().toISOString() }]
          });
        }
      },
      
      removeSaved: (propertyId: string) => {
        const { savedItems } = get();
        set({
          savedItems: savedItems.filter(item => item.id !== propertyId)
        });
      },
      
      isSaved: (propertyId: string) => {
        return get().savedItems.some(item => item.id === propertyId);
      },
      
      sortBy: (criterion: 'dateAdded' | 'price' | 'type') => {
        const { savedItems } = get();
        let sorted = [...savedItems];
        
        set({ isLoading: true });
        
        switch (criterion) {
          case 'dateAdded':
            sorted.sort((a, b) => {
              return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
            });
            break;
          case 'price':
            sorted.sort((a, b) => {
              // Convert to a common currency for comparison (simple implementation)
              const getComparisonPrice = (property: Property) => {
                if (property.currency === 'RWF') {
                  return property.price / 1200; // Approximate exchange rate to USD
                }
                return property.price;
              };
              return getComparisonPrice(a) - getComparisonPrice(b);
            });
            break;
          case 'type':
            sorted.sort((a, b) => {
              return a.propertyType.localeCompare(b.propertyType);
            });
            break;
        }
        
        // Simulate network delay in a real app fetching from API
        setTimeout(() => {
          set({
            savedItems: sorted,
            lastSorted: criterion,
            isLoading: false
          });
        }, 500);
      },
      
      clearAll: () => {
        set({
          savedItems: []
        });
      }
    }),
    {
      name: 'saved-properties-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 