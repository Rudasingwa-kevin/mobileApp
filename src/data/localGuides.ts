import { Guide, GuideCategory } from '../types';

// Catégories de guides
export const guideCategories: GuideCategory[] = [
  {
    id: 'neighborhoods',
    title: 'Quartiers recommandés',
    icon: 'home',
    description: 'Découvrez les meilleurs quartiers pour vivre à Gisenyi'
  },
  {
    id: 'transportation',
    title: 'Se déplacer à Gisenyi',
    icon: 'car',
    description: 'Comment se déplacer facilement dans la ville'
  },
  {
    id: 'cost_of_living',
    title: 'Coût de la vie',
    icon: 'cash',
    description: 'Budget et dépenses locales pour mieux planifier'
  },
  {
    id: 'safety',
    title: 'Sécurité',
    icon: 'shield',
    description: 'Conseils de sécurité et zones à connaître'
  },
  {
    id: 'expat_tips',
    title: 'Conseils expatriés',
    icon: 'globe',
    description: 'Informations essentielles pour les étrangers'
  },
  {
    id: 'student_life',
    title: 'Vie étudiante',
    icon: 'school',
    description: 'Tout savoir pour les étudiants internationaux'
  }
];

// Guides locaux
export const localGuides: Guide[] = [
  // Quartiers recommandés
  {
    id: 'gisenyi_center',
    categoryId: 'neighborhoods',
    title: 'Centre-ville de Gisenyi',
    summary: 'Le cœur animé de Gisenyi, avec ses commerces et cafés au bord du lac Kivu',
    image: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a',
    content: `# Centre-ville de Gisenyi

Le centre-ville de Gisenyi est le quartier le plus dynamique de la ville. Situé directement au bord du magnifique lac Kivu, c'est un mélange parfait entre commodités modernes et charme local.

## Avantages
- Proximité des commerces, restaurants et cafés
- Accès facile aux plages et au lac Kivu
- Bonne connexion internet et infrastructure
- Vie nocturne animée

## Inconvénients
- Prix des logements plus élevés
- Plus touristique et parfois bruyant
- Moins d'espace que dans les quartiers résidentiels

## À ne pas manquer
- Les cafés en terrasse avec vue sur le lac
- Le marché local les mercredis et samedis
- Les restaurants servant des poissons fraîchement pêchés

## Budget
Comptez entre 300$ et 700$ par mois pour un appartement de qualité dans ce quartier.`,
    isNew: true,
    createdAt: new Date('2023-11-15')
  },
  {
    id: 'rubavu',
    categoryId: 'neighborhoods',
    title: 'Rubavu - Le quartier calme',
    summary: 'Un quartier résidentiel paisible offrant des vues imprenables sur le lac',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    content: `# Rubavu - Le quartier calme

Rubavu est le choix idéal pour ceux qui recherchent un environnement plus tranquille tout en restant à distance raisonnable du centre-ville.

## Avantages
- Quartier résidentiel paisible
- Magnifiques vues sur le lac et les montagnes
- Plusieurs parcs et espaces verts
- Logements plus spacieux

## Inconvénients
- Moins de commerces à proximité immédiate
- Nécessite souvent un véhicule personnel
- Vie nocturne limitée

## Type de logements
On trouve principalement des maisons individuelles et quelques petites résidences. Les jardins sont plus grands et plusieurs propriétés offrent une vue sur le lac.

## Budget
Les prix varient entre 250$ et 600$ par mois selon la taille et la qualité du logement.`,
    isNew: false,
    createdAt: new Date('2023-08-10')
  },
  {
    id: 'bugoyi',
    categoryId: 'neighborhoods',
    title: 'Bugoyi - Quartier étudiant',
    summary: 'Dynamique et abordable, idéal pour les étudiants et jeunes professionnels',
    image: 'https://images.unsplash.com/photo-1540965659724-7348aa3a1253',
    content: `# Bugoyi - Quartier étudiant

Bugoyi est le quartier préféré des étudiants et des jeunes actifs. Son ambiance décontractée et ses prix abordables en font un lieu de vie très recherché.

## Pourquoi choisir Bugoyi ?
- Proximité des établissements d'enseignement
- Loyers plus abordables
- Nombreux cafés et restaurants économiques
- Bonne ambiance communautaire

## Vie quotidienne
Le quartier dispose de plusieurs supérettes, d'un petit marché local et de nombreux services adaptés aux besoins des étudiants (imprimeries, cafés internet, etc.).

## Budget
C'est l'un des quartiers les plus abordables : comptez entre 150$ et 350$ pour un logement confortable.`,
    isNew: false,
    createdAt: new Date('2023-07-15')
  },
  
  // Transport
  {
    id: 'transport_guide',
    categoryId: 'transportation',
    title: 'Guide complet des transports',
    summary: 'Toutes les options pour se déplacer efficacement dans et autour de Gisenyi',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e',
    content: `# Guide complet des transports à Gisenyi

Gisenyi offre plusieurs options de transport adaptées à différents besoins et budgets.

## Transports en commun

### Moto-taxis (Boda-boda)
- Option la plus répandue et flexible
- Prix : environ 300-500 RWF pour un trajet court en ville
- Conseil : négociez le prix avant de monter et demandez un casque
- Idéal pour les trajets courts et éviter les embouteillages

### Minibus ("Matatus")
- Desservent les principaux axes de la ville
- Prix : 300-800 RWF selon la distance
- Fréquence : toutes les 10-15 minutes sur les axes principaux
- Avantages : économiques mais souvent bondés

## Taxis
- Plus confortables mais plus chers
- Prix : environ 2,000-5,000 RWF pour un trajet en ville
- Possibilité de négocier un service à la journée
- Idéal pour les touristes et déplacements en groupe

## Location de véhicules
- Plusieurs agences proposent des voitures à partir de 40$ par jour
- Permis international recommandé
- Scooters disponibles à la location (25$ par jour environ)

## À pied
Le centre-ville est facilement explorable à pied, avec la plupart des services accessibles dans un rayon de 20-30 minutes de marche.`,
    isNew: false,
    createdAt: new Date('2023-06-20')
  },
  {
    id: 'border_crossing',
    categoryId: 'transportation',
    title: 'Traverser la frontière RDC-Rwanda',
    summary: 'Guide pratique pour les voyages entre Gisenyi et Goma',
    image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60',
    content: `# Traverser la frontière RDC-Rwanda

La proximité de Gisenyi avec Goma (RDC) offre une opportunité unique d'explorer deux pays. Voici comment traverser la frontière en toute sécurité.

## Documents nécessaires
- Passeport valide avec au moins 6 mois de validité
- Visa pour la RDC (peut être obtenu à la frontière)
- Certificat de vaccination contre la fièvre jaune

## Le poste frontière
- Nom officiel : Poste frontière de La Corniche
- Heures d'ouverture : 6h - 18h
- Procédure : simple mais peut prendre du temps pendant les heures de pointe

## Coûts
- Visa RDC pour une journée : environ 30-50$
- Petit passage : environ 5,000 RWF

## Sécurité
- Renseignez-vous sur la situation sécuritaire avant de traverser
- Évitez de transporter des objets de valeur ou de grandes sommes d'argent
- Utilisez des taxis officiels de l'autre côté de la frontière

## Excursions populaires
- Marché central de Goma
- Observatoire volcanologique (avec autorisation)
- Lac Kivu côté congolais`,
    isNew: true,
    createdAt: new Date('2023-11-02')
  },
  
  // Coût de la vie
  {
    id: 'cost_of_living_overview',
    categoryId: 'cost_of_living',
    title: 'Budget mensuel à Gisenyi',
    summary: 'Estimation détaillée des dépenses pour différents styles de vie',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
    content: `# Budget mensuel à Gisenyi

Voici un aperçu des coûts mensuels moyens pour vivre à Gisenyi, adapté à différents styles de vie.

## Budget étudiant/économique (600-800$)
- Logement : studio simple ou colocation (150-250$)
- Nourriture : marché local et cuisine maison (150-200$)
- Transport : moto-taxis et minibus (50-80$)
- Internet : forfait mobile de base (20-30$)
- Loisirs et extras : (100-150$)

## Budget moyen (1000-1500$)
- Logement : appartement 1-2 chambres de qualité (300-500$)
- Nourriture : mix de cuisine maison et restaurants (250-350$)
- Transport : moto-taxis fréquents, parfois taxis (100-150$)
- Internet : WiFi haut débit à domicile (40-60$)
- Loisirs et extras : (300-400$)

## Budget confort (2000$+)
- Logement : grande maison avec jardin/vue sur le lac (700-1200$)
- Nourriture : restaurants réguliers, produits importés (400-600$)
- Transport : voiture personnelle ou taxis réguliers (200-300$)
- Internet : meilleure connexion disponible (70-100$)
- Personnel de maison : (100-200$)
- Loisirs et extras : (500+$)

## Coûts indicatifs
- Repas au restaurant local : 5-10$
- Repas dans un restaurant international : 15-25$
- Bouteille d'eau (1.5L) : 0.5-1$
- Café dans un café moderne : 2-3$
- Bière locale : 1-2$`,
    isNew: false,
    createdAt: new Date('2023-09-05')
  },
  {
    id: 'shopping_guide',
    categoryId: 'cost_of_living',
    title: 'Où faire ses courses',
    summary: 'Les meilleurs endroits pour acheter produits locaux et importés',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d',
    content: `# Où faire ses courses à Gisenyi

Guide pratique des différents lieux d'approvisionnement, du marché local aux supermarchés.

## Marché central de Gisenyi
**Lieu :** Centre-ville, près de la gare routière
**Horaires :** 7h-18h, plus animé le matin
**Idéal pour :** Fruits, légumes, viande fraîche, épices
**Prix :** Les plus bas de la ville
**Conseil :** Négociez les prix, allez-y tôt pour les meilleurs produits

## Supermarchés

### Simba Supermarket
**Lieu :** Avenue principale
**Horaires :** 8h-21h
**Points forts :** Produits internationaux, rayon frais de qualité
**Prix :** Moyen à élevé

### Nakumatt
**Lieu :** Quartier commercial
**Horaires :** 8h-22h
**Points forts :** Grande surface, choix varié, produits importés
**Prix :** Élevé pour les produits importés

## Épiceries locales
Plusieurs petites épiceries sont dispersées dans tous les quartiers avec des produits de base à prix raisonnable.

## Marchés spécialisés

### Marché aux poissons
**Lieu :** Port de Gisenyi
**Horaires :** 6h-10h
**Spécialité :** Poissons frais du lac Kivu
**Conseil :** Y aller tôt, les meilleurs produits partent vite !

### Marché artisanal
**Lieu :** Près des hôtels principaux
**Horaires :** 9h-18h
**Spécialité :** Artisanat local, souvenirs, tissus

## Achats en ligne
La livraison de courses commence à se développer à Gisenyi. Quelques applications locales comme "Vuba Deliver" proposent ce service.`,
    isNew: false,
    createdAt: new Date('2023-08-12')
  },
  
  // Sécurité
  {
    id: 'safety_tips',
    categoryId: 'safety',
    title: 'Conseils de sécurité essentiels',
    summary: 'Comment profiter de Gisenyi en toute tranquillité',
    image: 'https://images.unsplash.com/photo-1517329782449-810562a4ec2f',
    content: `# Conseils de sécurité essentiels à Gisenyi

Gisenyi est généralement une ville sûre, mais comme partout, quelques précautions sont recommandées.

## Sécurité générale
- Gisenyi est l'une des villes les plus sûres de la région
- La police est présente et efficace
- Les numéros d'urgence : Police (112), Ambulance (912)

## Précautions de base
- Évitez de montrer ostensiblement des objets de valeur
- Ne transportez pas de grandes sommes d'argent
- Utilisez les coffres-forts de votre logement
- Gardez une copie de vos documents importants

## Zones à éviter
- Les zones frontalières isolées la nuit
- Certaines plages non surveillées après le coucher du soleil
- Les quartiers périphériques mal éclairés

## Transports
- Privilégiez les moto-taxis recommandés par votre logement
- Notez la plaque d'immatriculation des taxis
- Évitez les transports en commun bondés avec vos objets de valeur

## Santé
- Hôpital recommandé : Gisenyi Regional Hospital
- Pharmacies ouvertes 24/7 : Central Pharmacy (Centre-ville)
- Eau : buvez uniquement de l'eau en bouteille scellée

## Conseils spécifiques pour les femmes voyageant seules
- Gisenyi est relativement sûr, mais restez vigilante la nuit
- Les habitants sont respectueux, mais certains regards peuvent être insistants
- Habillez-vous de manière relativement modeste pour éviter l'attention excessive`,
    isNew: false,
    createdAt: new Date('2023-07-15')
  },
  
  // Expat tips
  {
    id: 'administrative_procedures',
    categoryId: 'expat_tips',
    title: 'Démarches administratives',
    summary: 'Guide des formalités pour vivre légalement à Gisenyi',
    image: 'https://images.unsplash.com/photo-1554224155-1696413565d3',
    content: `# Démarches administratives pour expatriés

Ce guide vous aidera à comprendre les procédures administratives essentielles pour vous installer à Gisenyi.

## Visa et permis de séjour

### Visa touristique
- Disponible à l'arrivée pour de nombreuses nationalités (30 jours)
- Coût : 30$ (vérifiez les changements récents)
- Extension possible pour 30 jours supplémentaires

### Permis de travail
- Doit être demandé par votre employeur
- Documents nécessaires : contrat de travail, passeport, photos, diplômes
- Délai : environ 1-2 mois
- Coût : varie selon la durée (500-1000$)

### Permis de séjour longue durée
- Nécessite un sponsor local (emploi, études, investissement)
- Validité : 1-2 ans, renouvelable
- Documents à fournir : justificatif de revenus, certificat médical, casier judiciaire

## Enregistrement obligatoire
Tout étranger séjournant plus de 30 jours doit s'enregistrer auprès du bureau local de l'immigration.
- Lieu : Direction Générale de l'Immigration, antenne de Gisenyi
- Délai : dans les 15 jours suivant l'arrivée
- Documents : passeport, justificatif de logement, formulaire d'enregistrement

## Compte bancaire
- Banques recommandées : Bank of Kigali, Equity Bank
- Documents nécessaires : passeport, permis de séjour, justificatif de domicile
- Conseils : optez pour un compte en dollars américains et en francs rwandais

## Assurance santé
Une assurance santé internationale est fortement recommandée, car les coûts médicaux peuvent être élevés pour les non-résidents.

## Fiscalité
Les résidents (plus de 183 jours par an) sont imposables sur leurs revenus mondiaux. Consultez un conseiller fiscal pour comprendre vos obligations.`,
    isNew: true,
    createdAt: new Date('2023-10-10')
  },
  
  // Student life
  {
    id: 'student_guide',
    categoryId: 'student_life',
    title: 'Guide étudiant complet',
    summary: "Tout ce qu'un étudiant international doit savoir pour réussir à Gisenyi",
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f',
    content: `# Guide étudiant complet pour Gisenyi

Ce guide est conçu pour aider les étudiants internationaux à s'installer et réussir à Gisenyi.

## Établissements d'enseignement

### Université de Gisenyi
- Campus principal : quartier Mbugangari
- Spécialités : Business, Tourisme, Sciences environnementales
- Frais pour étudiants internationaux : 1500-2500$ par semestre

### Institut Technique de Rubavu
- Spécialités : Ingénierie, Agriculture, Informatique
- Programmes en français et en anglais
- Frais : 1000-2000$ par semestre

## Logement étudiant
- Résidences universitaires : 150-250$ par mois (services inclus)
- Colocations hors campus : 100-200$ par mois et par personne
- Quartiers recommandés : Bugoyi, Mbugangari (proches des campus)

## Bourses disponibles
- Programme d'excellence Rwanda-EAC : couvre les frais et allocation mensuelle
- Bourses Mastercard Foundation : pour étudiants africains
- Bourse de la Francophonie : pour étudiants des pays francophones

## Vie étudiante
- Associations étudiantes actives : AERG (Association des Étudiants Rwandais de Gisenyi)
- Sports populaires : football, volleyball, basketball
- Événements annuels : Festival universitaire (mai), compétitions inter-universités

## Coûts mensuels estimés
- Logement : 150-250$
- Nourriture : 150-200$
- Transport : 30-50$
- Matériel d'étude : 30-70$
- Internet et communication : 20-40$
- Loisirs : 50-100$

## Conseils pratiques
- Wifi gratuit : bibliothèque municipale, certains cafés près du campus
- Impression pas chère : Copy Center près de l'université (3-5 RWF/page)
- Librairies d'occasion : marché aux livres mensuel (dernier samedi)

## Jobs étudiants
Plusieurs opportunités existent dans :
- Hôtellerie et restauration (15-20h/semaine)
- Tutorat en langues
- Centres d'appels (si vous parlez français/anglais couramment)`,
    isNew: false,
    createdAt: new Date('2023-05-20')
  }
];

export default localGuides; 