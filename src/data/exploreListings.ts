// Mock data for the Explorer screen
export interface ExploreCategory {
  id: string;
  name: string;
  icon: string;
  emoji?: string;
}

export interface ExploreListing {
  id: string;
  title: string;
  images: string[];
  price: number;
  currency: string;
  location: {
    district: string;
    city: string;
  };
  rating: number;
  reviews: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  featured?: boolean;
  nearLake?: boolean;
  furnished?: boolean;
  longTerm?: boolean;
  forStudents?: boolean;
  affordable?: boolean;
}

// Categories for horizontal scrolling section
export const exploreCategories: ExploreCategory[] = [
  { 
    id: 'lake', 
    name: 'Proche du lac', 
    icon: 'water-outline',
    emoji: '🌊' 
  },
  { 
    id: 'furnished', 
    name: 'Meublés', 
    icon: 'bed-outline',
    emoji: '🛋️' 
  },
  { 
    id: 'affordable', 
    name: 'Moins de 300 USD', 
    icon: 'cash-outline',
    emoji: '💵' 
  },
  { 
    id: 'longTerm', 
    name: 'Pour longue durée', 
    icon: 'calendar-outline',
    emoji: '📆' 
  },
  { 
    id: 'students', 
    name: 'Idéal étudiants', 
    icon: 'school-outline',
    emoji: '🎓' 
  },
  { 
    id: 'new', 
    name: 'Nouvelles annonces', 
    icon: 'star-outline',
    emoji: '✨' 
  }
];

// Mock editorial sections
export const editorialSections = [
  {
    id: 'neighborhoods',
    title: 'Nos quartiers recommandés',
    description: 'Découvrez les meilleurs endroits pour vivre à Gisenyi',
    image: 'https://a0.muscache.com/im/pictures/f4400a44-d368-4a8f-aa0c-c7343c68c098.jpg',
    type: 'neighborhoods'
  },
  {
    id: 'safety',
    title: 'Louer avec sécurité',
    description: 'Nos conseils pour une location sereine et sans risques',
    image: 'https://a0.muscache.com/im/pictures/a27abca7-d2c8-4787-b487-4df663a4ec30.jpg',
    type: 'guide'
  },
  {
    id: 'tips',
    title: 'Conseils pour s\'installer à Gisenyi',
    description: 'Tout ce que vous devez savoir avant de déménager',
    image: 'https://a0.muscache.com/im/pictures/c0ae27a9-3fe5-4f2d-b57b-f251a9665f94.jpg',
    type: 'guide'
  }
];

// Mock listings for the explore screen
export const exploreListings: ExploreListing[] = [
  {
    id: '1',
    title: 'Studio moderne avec vue sur le lac Kivu',
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-47971380/original/a924a493-6c82-468d-8df7-3b0ca17d89d3.jpeg'
    ],
    price: 250,
    currency: 'USD',
    location: {
      district: 'Bord du Lac',
      city: 'Gisenyi'
    },
    rating: 4.8,
    reviews: 24,
    type: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    size: 35,
    featured: true,
    nearLake: true,
    furnished: true
  },
  {
    id: '2',
    title: 'Appartement spacieux dans résidence sécurisée',
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-826494959841460145/original/d0e6368d-bab0-4394-9947-a5662e6fcd81.jpeg'
    ],
    price: 350,
    currency: 'USD',
    location: {
      district: 'Centre-ville',
      city: 'Gisenyi'
    },
    rating: 4.6,
    reviews: 32,
    type: 'Appartement',
    bedrooms: 2,
    bathrooms: 1,
    size: 65,
    featured: true,
    furnished: true,
    longTerm: true
  },
  {
    id: '3',
    title: 'Maison familiale avec jardin',
    images: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/0da70267-d9da-4efb-9123-2714b651c9fd.jpeg'
    ],
    price: 480,
    currency: 'USD',
    location: {
      district: 'Rubavu',
      city: 'Gisenyi'
    },
    rating: 4.9,
    reviews: 15,
    type: 'Maison',
    bedrooms: 3,
    bathrooms: 2,
    size: 120,
    longTerm: true
  },
  {
    id: '4',
    title: 'Studio étudiant proche de l\'université',
    images: [
      'https://a0.muscache.com/im/pictures/7db51ae5-3848-4c1a-a9e0-6ee11902cbeb.jpg'
    ],
    price: 180,
    currency: 'USD',
    location: {
      district: 'Campus',
      city: 'Gisenyi'
    },
    rating: 4.3,
    reviews: 42,
    type: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    size: 28,
    forStudents: true,
    affordable: true
  },
  {
    id: '5',
    title: 'Appartement vue lac avec balcon',
    images: [
      'https://a0.muscache.com/im/pictures/31fb3cb1-9a1f-4f53-8bf9-d2c7b9c1b3b3.jpg'
    ],
    price: 320,
    currency: 'USD',
    location: {
      district: 'Bord du Lac',
      city: 'Gisenyi'
    },
    rating: 4.7,
    reviews: 19,
    type: 'Appartement',
    bedrooms: 2,
    bathrooms: 1,
    size: 55,
    nearLake: true,
    featured: true
  },
  {
    id: '6',
    title: 'Chambre chez l\'habitant pour étudiant',
    images: [
      'https://a0.muscache.com/im/pictures/92650ace-f631-456d-9a1a-fa9df1127ed3.jpg'
    ],
    price: 120,
    currency: 'USD',
    location: {
      district: 'Centre-ville',
      city: 'Gisenyi'
    },
    rating: 4.5,
    reviews: 28,
    type: 'Chambre',
    bedrooms: 1,
    bathrooms: 1,
    size: 18,
    forStudents: true,
    affordable: true
  },
  {
    id: '7',
    title: 'Maison de vacances au bord de l\'eau',
    images: [
      'https://a0.muscache.com/im/pictures/937e2b76-092e-4c95-a250-88c077a9a1c2.jpg'
    ],
    price: 550,
    currency: 'USD',
    location: {
      district: 'Plage Nord',
      city: 'Gisenyi'
    },
    rating: 4.9,
    reviews: 36,
    type: 'Maison',
    bedrooms: 4,
    bathrooms: 3,
    size: 150,
    nearLake: true,
    featured: true
  },
  {
    id: '8',
    title: 'Studio économique en centre-ville',
    images: [
      'https://a0.muscache.com/im/pictures/b3e820d1-c3f2-485c-a8bf-2a2eecbcbf52.jpg'
    ],
    price: 200,
    currency: 'USD',
    location: {
      district: 'Centre-ville',
      city: 'Gisenyi'
    },
    rating: 4.2,
    reviews: 45,
    type: 'Studio',
    bedrooms: 1,
    bathrooms: 1,
    size: 30,
    affordable: true
  },
  {
    id: '9',
    title: 'Résidence étudiante toute équipée',
    images: [
      'https://a0.muscache.com/im/pictures/90bf3aa0-841a-4248-a6a0-03a613b727de.jpg'
    ],
    price: 220,
    currency: 'USD',
    location: {
      district: 'Campus',
      city: 'Gisenyi'
    },
    rating: 4.4,
    reviews: 52,
    type: 'Résidence',
    bedrooms: 1,
    bathrooms: 1,
    size: 32,
    forStudents: true,
    affordable: true,
    furnished: true
  },
  {
    id: '10',
    title: 'Appartement longue durée avec parking',
    images: [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-664576088220297202/original/05a04aa6-74c5-4a8c-b47f-d4e76d001ba7.jpeg'
    ],
    price: 370,
    currency: 'USD',
    location: {
      district: 'Rubavu',
      city: 'Gisenyi'
    },
    rating: 4.6,
    reviews: 17,
    type: 'Appartement',
    bedrooms: 2,
    bathrooms: 2,
    size: 70,
    longTerm: true,
    furnished: true
  }
]; 