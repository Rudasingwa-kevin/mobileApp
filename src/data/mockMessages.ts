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
        text: 'Bonjour Marie, votre appartement est-il disponible pour le weekend du 20 juin?',
        createdAt: new Date('2023-06-12T14:22:00'),
        user: { ...currentUser },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-1-2',
        text: 'Bonjour! Oui, l\'appartement est disponible pour ce weekend. Combien de personnes serez-vous?',
        createdAt: new Date('2023-06-12T15:05:00'),
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
        text: 'Nous serons 2 personnes. Est-ce que le petit-déjeuner est inclus?',
        createdAt: new Date('2023-06-12T15:10:00'),
        user: { ...currentUser },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-1-4',
        text: 'Le petit-déjeuner n\'est pas inclus, mais il y a une cuisine équipée à votre disposition.',
        createdAt: new Date('2023-06-12T15:20:00'),
        user: {
          id: 'owner-1',
          name: 'Marie Uwamahoro',
          avatar: 'https://a0.muscache.com/im/pictures/user/bd95b0e4-84ad-4782-b5c9-512061e8f381.jpg?im_w=240',
        },
        sent: true,
        received: true,
        read: true,
      },
    ],
    unreadCount: 0,
    lastMessageAt: new Date('2023-06-12T15:20:00'),
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
        text: 'Bonjour Jean, est-ce que le parking est sécurisé pour notre véhicule?',
        createdAt: new Date('2023-06-11T09:15:00'),
        user: { ...currentUser },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-2-2',
        text: 'Bonjour! Oui, nous avons un parking privé avec surveillance 24h/24.',
        createdAt: new Date('2023-06-11T10:20:00'),
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
    lastMessageAt: new Date('2023-06-11T10:20:00'),
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
        text: 'Bonjour Claire, y a-t-il des restaurants à proximité de votre maison?',
        createdAt: new Date('2023-06-10T18:30:00'),
        user: { ...currentUser },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-3-2',
        text: 'Bonjour! Oui, il y a plusieurs restaurants à moins de 5 minutes à pied. Je vous recommande particulièrement "Le Lac", qui sert une excellente cuisine locale.',
        createdAt: new Date('2023-06-10T19:45:00'),
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
        text: 'Merci pour l\'information, je vais le noter!',
        createdAt: new Date('2023-06-10T20:00:00'),
        user: { ...currentUser },
        sent: true,
        received: true,
        read: true,
      },
      {
        id: 'msg-3-4',
        text: 'Je vous en prie. N\'hésitez pas si vous avez d\'autres questions!',
        createdAt: new Date('2023-06-11T08:15:00'),
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
    lastMessageAt: new Date('2023-06-11T08:15:00'),
  },
];

// Helper functions to simulate responses
export const getRandomResponse = (): string => {
  const responses = [
    "D'accord, je vais vérifier et vous tenir informé.",
    "Merci pour votre message. C'est noté!",
    "Avez-vous besoin d'autres informations?",
    "Je suis disponible pour répondre à toutes vos questions.",
    "C'est parfait, je confirme votre demande.",
    "N'hésitez pas à me contacter si vous avez d'autres questions."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}; 