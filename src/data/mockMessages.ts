import { ImageSourcePropType } from 'react-native';

export interface Message {
  id: string;
  text: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  sent: boolean;
  received: boolean;
  read: boolean;
}

export interface Conversation {
  id: string;
  propertyId: string;
  propertyTitle: string;
  otherUser: {
    id: string;
    name: string;
    avatar: string;
    isOwner: boolean;
  };
  messages: Message[];
  unreadCount: number;
  lastMessageAt: Date;
}

// The current user (me)
export const currentUser = {
  id: 'user-1',
  name: 'Moi',
  avatar: 'https://a0.muscache.com/defaults/user_pic-50x50.png?v=3',
};

// Create dates relative to now for a more realistic conversation
const now = new Date();
const minutesAgo = (minutes: number) => new Date(now.getTime() - minutes * 60000);
const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 3600000);
const daysAgo = (days: number) => new Date(now.getTime() - days * 86400000);

// Mock conversations with property owners
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    propertyId: '1',
    propertyTitle: 'Studio moderne au bord du lac Kivu',
    otherUser: {
      id: 'owner-1',
      name: 'Marie Uwamahoro',
      avatar: 'https://a0.muscache.com/im/pictures/user/bd95b0e4-84ad-4782-b5c9-512061e8f381.jpg?im_w=240',
      isOwner: true,
    },
    messages: [
      {
        id: 'msg-1-1',
        text: 'Bonjour Marie, est-ce que votre studio est disponible du 15 au 20 juillet ? Nous sommes un couple qui souhaite visiter Gisenyi.',
        createdAt: daysAgo(2),
        user: { ...currentUser },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-1-2',
        text: 'Bonjour ! Merci pour votre message. Oui, le studio est disponible pour ces dates. C\'est parfait pour un couple qui souhaite découvrir notre belle ville.',
        createdAt: daysAgo(2),
        user: {
          id: 'owner-1',
          name: 'Marie Uwamahoro',
          avatar: 'https://a0.muscache.com/im/pictures/user/bd95b0e4-84ad-4782-b5c9-512061e8f381.jpg?im_w=240',
        },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-1-3',
        text: 'Excellent ! Est-ce que le prix affiché inclut tous les frais ? Y a-t-il un dépôt de garantie à prévoir ?',
        createdAt: daysAgo(1),
        user: { ...currentUser },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-1-4',
        text: 'Le prix inclut tous les frais (eau, électricité, WiFi). Nous demandons un dépôt de garantie de 100 USD, remboursable à votre départ si tout est en ordre.',
        createdAt: daysAgo(1),
        user: {
          id: 'owner-1',
          name: 'Marie Uwamahoro',
          avatar: 'https://a0.muscache.com/im/pictures/user/bd95b0e4-84ad-4782-b5c9-512061e8f381.jpg?im_w=240',
        },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-1-5',
        text: 'Parfait, c\'est raisonnable. Qu\'est-ce qui est disponible pour cuisiner dans le studio ? Nous aimons préparer nos repas.',
        createdAt: hoursAgo(5),
        user: { ...currentUser },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-1-6',
        text: 'Le studio dispose d\'une cuisine équipée avec réfrigérateur, plaques de cuisson, micro-ondes, bouilloire et ustensiles de base. Il y a aussi un petit marché à 5 minutes à pied pour les produits frais.',
        createdAt: hoursAgo(4),
        user: {
          id: 'owner-1',
          name: 'Marie Uwamahoro',
          avatar: 'https://a0.muscache.com/im/pictures/user/bd95b0e4-84ad-4782-b5c9-512061e8f381.jpg?im_w=240',
        },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-1-7',
        text: 'C\'est parfait ! Je pense que nous allons réserver. Comment procédons-nous pour la suite ?',
        createdAt: hoursAgo(1),
        user: { ...currentUser },
        sent: true,
        received: true,
        read: false,
      },
    ],
    unreadCount: 0,
    lastMessageAt: hoursAgo(1),
  },
  {
    id: 'conv-2',
    propertyId: '2',
    propertyTitle: 'Appartement familial avec vue panoramique',
    otherUser: {
      id: 'owner-2',
      name: 'Jean Hakizimana',
      avatar: 'https://a0.muscache.com/im/pictures/user/1214a769-3eff-4f72-878c-c96c720be01e.jpg?im_w=240',
      isOwner: true,
    },
    messages: [
      {
        id: 'msg-2-1',
        text: 'Bonjour Jean, j\'ai vu votre appartement sur LocaMap et il semble parfait pour notre famille de 4 personnes. Est-il disponible la première semaine d\'août ?',
        createdAt: daysAgo(3),
        user: { ...currentUser },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-2-2',
        text: 'Bonjour ! Oui, l\'appartement est disponible cette semaine-là. Il offre 2 chambres et peut accueillir confortablement 4 personnes. La vue sur le lac est magnifique, surtout au coucher du soleil.',
        createdAt: daysAgo(3),
        user: {
          id: 'owner-2',
          name: 'Jean Hakizimana',
          avatar: 'https://a0.muscache.com/im/pictures/user/1214a769-3eff-4f72-878c-c96c720be01e.jpg?im_w=240',
        },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-2-3',
        text: 'Ça a l\'air parfait ! Est-ce que le quartier est adapté aux enfants ? Y a-t-il des activités à proximité ?',
        createdAt: daysAgo(2),
        user: { ...currentUser },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-2-4',
        text: 'Absolument ! Le quartier est très familial et sécurisé. La plage publique est à 10 minutes à pied, il y a un petit parc à 5 minutes et plusieurs restaurants familiaux à proximité. Je peux vous recommander quelques activités pour les enfants si vous le souhaitez.',
        createdAt: daysAgo(2),
        user: {
          id: 'owner-2',
          name: 'Jean Hakizimana',
          avatar: 'https://a0.muscache.com/im/pictures/user/1214a769-3eff-4f72-878c-c96c720be01e.jpg?im_w=240',
        },
        sent: true,
        received: true,
        read: false,
      },
    ],
    unreadCount: 1,
    lastMessageAt: daysAgo(2),
  },
  {
    id: 'conv-3',
    propertyId: '3',
    propertyTitle: 'Maison charmante près de la plage',
    otherUser: {
      id: 'owner-3',
      name: 'Claire Mugisha',
      avatar: 'https://a0.muscache.com/im/pictures/user/e79aaf9b-148d-4856-a7ab-3ca6af7f586b.jpg?im_w=240',
      isOwner: true,
    },
    messages: [
      {
        id: 'msg-3-1',
        text: 'Bonjour Claire, je suis intéressé par votre maison pour un séjour de 3 mois à partir de septembre. Je suis consultant et je cherche un endroit calme pour travailler à distance. Est-ce que votre logement serait adapté ?',
        createdAt: daysAgo(7),
        user: { ...currentUser },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-3-2',
        text: 'Bonjour ! Ma maison serait parfaite pour un séjour de travail à distance. Elle est située dans un quartier calme, dispose d\'une connexion internet fibre optique stable et d\'un espace bureau avec vue sur le jardin. Pour un séjour longue durée comme le vôtre, je propose également une réduction de 15% sur le prix mensuel.',
        createdAt: daysAgo(7),
        user: {
          id: 'owner-3',
          name: 'Claire Mugisha',
          avatar: 'https://a0.muscache.com/im/pictures/user/e79aaf9b-148d-4856-a7ab-3ca6af7f586b.jpg?im_w=240',
        },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-3-3',
        text: 'C\'est très intéressant ! Quelle est la vitesse de la connexion internet ? J\'ai souvent des visioconférences et j\'ai besoin d\'une connexion fiable.',
        createdAt: daysAgo(6),
        user: { ...currentUser },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-3-4',
        text: 'La connexion est de 50 Mbps en download et 20 Mbps en upload, ce qui est largement suffisant pour les visioconférences. J\'ai également un routeur de secours avec une connexion 4G en cas de coupure exceptionnelle. Plusieurs de mes précédents locataires travaillaient à distance et n\'ont jamais eu de problèmes.',
        createdAt: daysAgo(6),
        user: {
          id: 'owner-3',
          name: 'Claire Mugisha',
          avatar: 'https://a0.muscache.com/im/pictures/user/e79aaf9b-148d-4856-a7ab-3ca6af7f586b.jpg?im_w=240',
        },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-3-5',
        text: 'C\'est parfait ! Je serais intéressé par une visite virtuelle si c\'est possible avant de confirmer ma réservation. Serait-ce envisageable dans les prochains jours ?',
        createdAt: daysAgo(5),
        user: { ...currentUser },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-3-6',
        text: 'Bien sûr ! Je peux organiser une visite virtuelle par WhatsApp ou Zoom. Seriez-vous disponible demain vers 17h heure de Gisenyi ? Je pourrai vous montrer tous les espaces et répondre à vos questions en direct.',
        createdAt: daysAgo(4),
        user: {
          id: 'owner-3',
          name: 'Claire Mugisha',
          avatar: 'https://a0.muscache.com/im/pictures/user/e79aaf9b-148d-4856-a7ab-3ca6af7f586b.jpg?im_w=240',
        },
        sent: true,
        received: true,
        read: false,
      },
    ],
    unreadCount: 1,
    lastMessageAt: daysAgo(4),
  },
];

// Helper functions to simulate responses
export const getRandomResponse = (): string => {
  const responses = [
    "Merci pour votre message ! Je vais vérifier cette information et reviens vers vous rapidement.",
    "C'est noté ! Avez-vous d'autres questions concernant le logement ?",
    "Bien sûr, je comprends votre demande. Pouvons-nous prévoir un appel pour en discuter plus en détail ?",
    "Je peux vous proposer plusieurs options adaptées à vos besoins. Dites-moi ce qui vous conviendrait le mieux.",
    "Absolument ! C'est tout à fait possible. Quand souhaiteriez-vous que nous organisions cela ?",
    "J'apprécie votre intérêt pour mon logement. Je ferais de mon mieux pour rendre votre séjour agréable.",
    "Pas de problème, je peux m'adapter à vos besoins. N'hésitez pas à me préciser vos attentes.",
    "C'est une excellente question. En fait, vous avez plusieurs options à ce sujet...",
    "Je confirme que tout est disponible comme demandé. Vous pouvez être tranquille sur ce point.",
    "Je vous remercie pour ces précisions. Cela m'aide à mieux comprendre vos attentes."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}; 