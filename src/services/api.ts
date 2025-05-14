import { Property, User } from '../types';

// Données mockées
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Villa moderne à Gisenyi',
    description: 'Belle villa avec vue sur le lac Kivu, entièrement meublée.',
    price: 800,
    currency: 'USD',
    location: {
      address: '123 Rue du Lac',
      city: 'Gisenyi',
      coordinates: {
        latitude: -1.7011,
        longitude: 29.2569,
      },
    },
    bedrooms: 3,
    bathrooms: 2,
    size: 120,
    images: ['https://example.com/image1.jpg'],
    amenities: ['Wifi', 'Parking', 'Sécurité'],
    contactInfo: {
      name: 'John Doe',
      phone: '+250123456789',
      email: 'john@example.com',
    },
  },
  {
    id: '2',
    title: 'Appartement au centre-ville',
    description: 'Appartement confortable au centre de Gisenyi.',
    price: 500,
    currency: 'USD',
    location: {
      address: '56 Avenue Centrale',
      city: 'Gisenyi',
      coordinates: {
        latitude: -1.6998,
        longitude: 29.2567,
      },
    },
    bedrooms: 2,
    bathrooms: 1,
    size: 75,
    images: ['https://example.com/image2.jpg'],
    amenities: ['Wifi', 'Eau chaude'],
    contactInfo: {
      name: 'Jane Smith',
      phone: '+250987654321',
      email: 'jane@example.com',
    },
  },
  {
    id: '3',
    title: 'Maison familiale',
    description: 'Grande maison pour famille, proche des écoles.',
    price: 650,
    currency: 'USD',
    location: {
      address: '78 Rue des Écoles',
      city: 'Gisenyi',
      coordinates: {
        latitude: -1.7050,
        longitude: 29.2600,
      },
    },
    bedrooms: 4,
    bathrooms: 2,
    size: 150,
    images: ['https://example.com/image3.jpg'],
    amenities: ['Wifi', 'Jardin', 'Sécurité', 'Parking'],
    contactInfo: {
      name: 'Robert Johnson',
      phone: '+250567891234',
      email: 'robert@example.com',
    },
  },
];

// Délai simulé pour les appels API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Service API
export const api = {
  // Authentification
  auth: {
    login: async (email: string, password: string): Promise<User> => {
      await delay(1000);
      
      if (email === 'test@example.com' && password === 'password') {
        return {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          favorites: [],
        };
      }
      
      throw new Error('Identifiants invalides');
    },
    
    register: async (name: string, email: string, password: string): Promise<User> => {
      await delay(1000);
      
      return {
        id: '2',
        name,
        email,
        favorites: [],
      };
    },
  },
  
  // Propriétés
  properties: {
    getAll: async (): Promise<Property[]> => {
      await delay(1000);
      return [...mockProperties];
    },
    
    getById: async (id: string): Promise<Property> => {
      await delay(800);
      
      const property = mockProperties.find(p => p.id === id);
      
      if (!property) {
        throw new Error('Propriété non trouvée');
      }
      
      return { ...property };
    },
    
    search: async (query: string): Promise<Property[]> => {
      await delay(1200);
      
      const lowerQuery = query.toLowerCase();
      
      return mockProperties.filter(
        property => 
          property.title.toLowerCase().includes(lowerQuery) || 
          property.description.toLowerCase().includes(lowerQuery) ||
          property.location.address.toLowerCase().includes(lowerQuery) ||
          property.location.city.toLowerCase().includes(lowerQuery)
      );
    },
  },
  
  // Favoris
  favorites: {
    add: async (userId: string, propertyId: string): Promise<void> => {
      await delay(500);
      // Dans une vraie API, cela modifierait la base de données
    },
    
    remove: async (userId: string, propertyId: string): Promise<void> => {
      await delay(500);
      // Dans une vraie API, cela modifierait la base de données
    },
    
    getAll: async (userId: string): Promise<string[]> => {
      await delay(800);
      // Simuler des favoris
      return ['1', '3'];
    },
  },
}; 