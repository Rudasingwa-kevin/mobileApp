import { Review } from '../types';

// Mock de données d'avis pour les logements
export const mockReviews: Record<string, Review[]> = {
  // Logement 1
  '1': [
    {
      id: '101',
      propertyId: '1',
      authorId: 'user1',
      authorName: 'Marie',
      authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4.5,
      comment: "Superbe studio avec une vue incroyable sur le lac Kivu! La décoration est soignée et l'appartement est très propre. Le propriétaire a été très réactif et nous a donné de bons conseils pour découvrir Gisenyi. Seul petit bémol, le wifi était un peu instable.",
      date: new Date('2023-09-15'),
      isVerified: true,
      stayDuration: 'court terme'
    },
    {
      id: '102',
      propertyId: '1',
      authorId: 'user2',
      authorName: 'Jean',
      authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      comment: "Excellent séjour dans ce studio moderne. Tout était parfait, de l'accueil à la propreté. La vue sur le lac est à couper le souffle, surtout au coucher du soleil. Je recommande vivement!",
      date: new Date('2023-08-22'),
      isVerified: true,
      stayDuration: 'court terme'
    },
    {
      id: '103',
      propertyId: '1',
      authorId: 'user3',
      authorName: 'Amina',
      authorAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 4,
      comment: "Bel appartement, bien situé près du lac. Cuisine bien équipée et lit confortable. J'ai passé un bon moment mais je retire une étoile car la climatisation faisait un peu de bruit la nuit.",
      date: new Date('2023-07-10'),
      isVerified: false,
      stayDuration: 'court terme'
    }
  ],
  
  // Logement 2
  '2': [
    {
      id: '201',
      propertyId: '2',
      authorId: 'user4',
      authorName: 'Patrick',
      authorAvatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      rating: 5,
      comment: "Une vue panoramique extraordinaire! L'appartement est spacieux, lumineux et très bien équipé. Nous avons passé un merveilleux séjour en famille. Le propriétaire a été très attentionné, il nous a même laissé une corbeille de fruits frais à notre arrivée.",
      date: new Date('2023-09-05'),
      isVerified: true,
      stayDuration: 'long terme'
    },
    {
      id: '202',
      propertyId: '2',
      authorId: 'user5',
      authorName: 'Claire',
      authorAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      rating: 4.5,
      comment: "Très bel appartement avec une vue spectaculaire sur le lac et les montagnes. Idéal pour une famille, les chambres sont spacieuses et la cuisine est bien équipée. Le quartier est calme et sécurisé. Je recommande!",
      date: new Date('2023-08-14'),
      isVerified: true,
      stayDuration: 'court terme'
    },
    {
      id: '203',
      propertyId: '2',
      authorId: 'user6',
      authorName: 'Robert',
      authorAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 3.5,
      comment: "L'appartement correspond aux photos et la vue est effectivement magnifique. Cependant, il y avait quelques problèmes de plomberie dans la salle de bain et le wifi était assez lent. Le propriétaire était réactif, mais ces problèmes n'ont pas été complètement résolus pendant notre séjour.",
      date: new Date('2023-07-25'),
      isVerified: false,
      stayDuration: 'court terme'
    }
  ],
  
  // Logement 3
  '3': [
    {
      id: '301',
      propertyId: '3',
      authorId: 'user7',
      authorName: 'Sophie',
      authorAvatar: 'https://randomuser.me/api/portraits/women/56.jpg',
      rating: 5,
      comment: "Cette maison est un véritable petit paradis! À deux pas de la plage, nous avons profité pleinement de notre séjour. Le jardin est magnifique et la terrasse parfaite pour les repas en famille. Tout était impeccable et le propriétaire très sympathique.",
      date: new Date('2023-09-20'),
      isVerified: true,
      stayDuration: 'court terme'
    },
    {
      id: '302',
      propertyId: '3',
      authorId: 'user8',
      authorName: 'David',
      authorAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 4,
      comment: "Maison charmante et bien située, à environ 5 minutes à pied de la plage. L'intérieur est cosy et bien décoré. La cuisine est bien équipée même si elle pourrait bénéficier de quelques ustensiles supplémentaires. Dans l'ensemble, un très bon séjour!",
      date: new Date('2023-08-30'),
      isVerified: true,
      stayDuration: 'court terme'
    },
    {
      id: '303',
      propertyId: '3',
      authorId: 'user9',
      authorName: 'Laurence',
      authorAvatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      rating: 4.5,
      comment: "Nous avons séjourné dans cette maison pendant une semaine et c'était parfait! Très propre, bien décorée et idéalement située près de la plage. Le petit jardin est un vrai plus pour les enfants. Le propriétaire a été très accueillant et disponible.",
      date: new Date('2023-07-18'),
      isVerified: false,
      stayDuration: 'court terme'
    }
  ],
  
  // Logement 4
  '4': [
    {
      id: '401',
      propertyId: '4',
      authorId: 'user10',
      authorName: 'Théo',
      authorAvatar: 'https://randomuser.me/api/portraits/men/13.jpg',
      rating: 4,
      comment: "Bon rapport qualité-prix pour ce logement étudiant. L'appartement est simple mais fonctionnel, avec tout le nécessaire pour étudier confortablement. Bien situé près de l'université et des commerces. Le wifi est excellent, ce qui est un gros plus!",
      date: new Date('2023-09-10'),
      isVerified: true,
      stayDuration: 'long terme'
    },
    {
      id: '402',
      propertyId: '4',
      authorId: 'user11',
      authorName: 'Aisha',
      authorAvatar: 'https://randomuser.me/api/portraits/women/91.jpg',
      rating: 3.5,
      comment: "Logement correct pour un étudiant avec un budget limité. L'appartement est propre mais assez basique. La proximité avec l'université est très pratique. Il manque quelques équipements dans la cuisine, mais pour le prix, c'est un bon choix.",
      date: new Date('2023-08-19'),
      isVerified: true,
      stayDuration: 'long terme'
    },
    {
      id: '403',
      propertyId: '4',
      authorId: 'user12',
      authorName: 'Mohammed',
      authorAvatar: 'https://randomuser.me/api/portraits/men/99.jpg',
      rating: 4.5,
      comment: "Excellent logement étudiant! Bien plus confortable que ce à quoi je m'attendais. La chambre est lumineuse, le bureau parfait pour travailler et la connexion internet très rapide. Le propriétaire est compréhensif et arrangeant avec les étudiants. Je recommande vivement!",
      date: new Date('2023-07-05'),
      isVerified: false,
      stayDuration: 'long terme'
    }
  ]
};

export default mockReviews; 