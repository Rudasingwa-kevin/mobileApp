import { GuideQuestion } from '../types';

// Questions recommandées extraites du guide.md
export const recommendedQuestions: GuideQuestion[] = [
  {
    id: 'best_neighborhoods',
    title: 'Quels sont les meilleurs quartiers pour séjourner à Gisenyi?',
    content: `# Les meilleurs quartiers pour séjourner à Gisenyi

Le choix de votre quartier dépendra de vos préférences et de votre budget:

## Quartier Riverain
- Panorama imprenable sur le lac Kivu
- Ambiance détendue et paisible
- Idéal pour les touristes et expatriés
- Accès direct aux plages
- Prix plus élevés (appartements: 400-600$/mois)

## Centre-ville
- Environnement animé et dynamique
- Accès facile aux marchés et restaurants locaux
- Plus abordable (appartements: 150-350$/mois)
- Immersion culturelle
- Proximité avec les principales commodités

## Nyayumba
- Légèrement en dehors du centre-ville
- Atmosphère résidentielle plus calme
- Belles vues panoramiques
- Options d'hébergement haut de gamme
- Protection contre les risques d'éruptions volcaniques grâce à son altitude

## Rubona
- Plus éloigné du centre
- Nombreux hôtels abordables
- Idéal pour les voyageurs au budget limité
- Ambiance plus locale, moins touristique`,
    categoryId: 'neighborhoods'
  },
  {
    id: 'cost_of_living',
    title: 'Quel est le coût de la vie à Gisenyi?',
    content: `# Coût de la vie à Gisenyi

## Budget mensuel selon le style de vie

### Budget étudiant/économique (600-800$)
- Logement: studio simple ou colocation (150-250$)
- Nourriture: marché local et cuisine maison (150-200$)
- Transport: moto-taxis et minibus (50-80$)
- Internet: forfait mobile de base (20-30$)
- Loisirs et extras: (100-150$)

### Budget moyen (1000-1500$)
- Logement: appartement 1-2 chambres de qualité (300-500$)
- Nourriture: mix de cuisine maison et restaurants (250-350$)
- Transport: moto-taxis fréquents, parfois taxis (100-150$)
- Internet: WiFi haut débit à domicile (40-60$)
- Loisirs et extras: (300-400$)

### Budget confort (2000$+)
- Logement: grande maison avec jardin/vue sur le lac (700-1200$)
- Nourriture: restaurants réguliers, produits importés (400-600$)
- Transport: voiture personnelle ou taxis réguliers (200-300$)
- Internet: meilleure connexion disponible (70-100$)
- Personnel de maison: (100-200$)

## Coûts indicatifs
- Repas au restaurant local: 5-10$
- Repas dans un restaurant international: 15-25$
- Bouteille d'eau (1.5L): 0.5-1$
- Café dans un café moderne: 2-3$
- Bière locale: 1-2$
- Trajet en taxi-moto: environ 1$ (1000 RWF)
- Bus Gisenyi-Kigali: 5-7$`,
    categoryId: 'cost_of_living'
  },
  {
    id: 'transportation',
    title: 'Comment se déplacer à Gisenyi et ses environs?',
    content: `# Se déplacer à Gisenyi et ses environs

## Taxis-motos (motos)
- Le moyen de transport le plus populaire et pratique
- Tarifs: environ 1 000 RWF (1$) pour les trajets courts
- Négociez toujours le prix avant de monter
- Idéal pour les trajets courts dans la ville

## Taxis traditionnels
- Disponibles près du marché central et de la station-service Engen
- Plus chers que les motos (5 000 - 10 000 RWF pour les trajets dans la ville)
- Plus confortables et sécurisés, idéals en cas de pluie ou avec des bagages

## Services de bus
- **Bus interurbains:** connexions régulières entre Gisenyi et Kigali (2,5-3 heures)
- Départs fréquents de la gare routière principale
- Prix: environ 5 000 - 7 000 RWF pour Kigali
- Compagnies recommandées: Virunga Express, Volcano Bus

- **Minibus locaux:**
- Relient Gisenyi et Musanze (2 heures)
- Économiques mais moins confortables
- Tarifs: 2 000 - 3 000 RWF selon la destination

## Transport vers le Parc National des Volcans
- Option taxi partagé: environ 10 000 RWF par personne
- Taxi privé: environ 50 000 - 70 000 RWF (aller simple)
- Durée du trajet: environ 1h30

## Traversée de la frontière avec Goma (RDC)
- Points de passage: la "Petite Barrière" (piétons) et la "Grande Barrière" (véhicules)
- Vérifiez toujours l'état actuel de la frontière avant de planifier votre traversée`,
    categoryId: 'transportation'
  },
  {
    id: 'safety_tips',
    title: 'Est-ce sûr de séjourner à Gisenyi?',
    content: `# Sécurité à Gisenyi

Gisenyi est généralement considérée comme une ville sûre, particulièrement en comparaison avec sa voisine Goma en RDC.

## Niveau de sécurité général
- Le côté rwandais de la frontière est souvent décrit comme calme et sûr
- Les zones situées sur les collines sont considérées comme sûres contre d'éventuelles éruptions volcaniques
- La présence policière contribue au sentiment général de sécurité

## Conseils pratiques
- Évitez de marcher seul après la tombée de la nuit
- Organisez votre transport à l'avance pour les déplacements nocturnes
- Gardez les portières verrouillées en voiture et les objets de valeur hors de vue
- Restez vigilant quant à votre environnement
- Évitez d'afficher des signes de richesse ou de porter des bijoux coûteux
- Ne transportez pas de grosses sommes d'argent
- Attention aux boissons dans les bars et clubs (risques de drogues)
- Évitez les zones isolées ou peu fréquentées, surtout la nuit

## Interdictions importantes
- Ne photographiez pas les bâtiments gouvernementaux ou installations militaires
- N'examinez pas ou ne photographiez pas le personnel militaire
- Ne jetez pas de déchets (amendes possibles)
- Les sacs en plastique non biodégradables sont interdits dans tout le Rwanda`,
    categoryId: 'safety'
  },
  {
    id: 'cultural_etiquette',
    title: 'Quelles sont les règles locales et l\'étiquette à respecter?',
    content: `# Étiquette et coutumes rwandaises

## Salutations
- Commencez toujours par "Muraho" (Bonjour) ou "Bwakeye" (Bon matin)
- Une poignée de main et un sourire sont appréciés
- Montrez du respect aux aînés et aux personnes en position d'autorité
- Utilisez des titres formels comme "Mzee" pour les hommes plus âgés et "Mama" pour les femmes adultes

## Tenue vestimentaire
- Adoptez une tenue modeste, particulièrement dans les zones rurales ou lieux de culte
- Les femmes devraient s'assurer que leurs épaules et genoux sont couverts
- Les hommes devraient opter pour des pantalons longs pour les événements formels
- Bien que Kigali soit plus tolérante envers des styles variés, une tenue modeste est généralement appréciée à Gisenyi

## Visites et repas
- Si vous êtes invité chez quelqu'un, acceptez avec gratitude
- Apportez un petit cadeau comme des fruits ou une bouteille de vin
- Enlevez vos chaussures avant d'entrer dans une maison, surtout dans les zones rurales
- Attendez que l'hôte commence à manger avant de commencer votre repas
- Finir ce qui est servi montre votre appréciation

## Communication
- Parlez doucement et respectueusement
- Les Rwandais apprécient la paix et le calme
- Faire l'effort d'apprendre des phrases de base en kinyarwanda sera très apprécié
- "Murakoze" (merci) est une expression importante à connaître
- Montrez du respect pour la gouvernance du Rwanda`,
    categoryId: 'expat_tips'
  },
  {
    id: 'activities',
    title: 'Que faire et voir à Gisenyi?',
    content: `# Activités à faire à Gisenyi

## Plages et lac Kivu
- Le lac Kivu possède plusieurs belles plages de sable
- La plage de Rubavu est idéale pour la détente, la baignade et le bronzage
- Autres plages notables: plage Serena du lac Kivu, plage de Tam Tam et plage de Paradise Malahide
- Le lac est généralement sûr pour la baignade (exempt de bilharziose, crocodiles et hippopotames)
- Sports nautiques: planche à voile, paddle, ski nautique, excursions en hors-bord
- Les couchers de soleil sur le lac Kivu sont à couper le souffle

## Randonnées
- L'ascension du mont Rubavu offre des vues imprenables sur le lac Kivu
- Le sentier Congo Nil est parfait pour la randonnée (meilleure période: mi-mai à mi-octobre)

## Sources chaudes
- Sources chaudes de Rubavu aux propriétés thérapeutiques
- Sources chaudes de Kigarama situées à seulement 2 km de la brasserie Bralirwa
- Sources chaudes près du Lake Kivu Serena Hotel

## Vie nocturne et restauration
- New Bel Air Lounge: atmosphère animée et boissons avec vue sur le lac Kivu
- Bar Gacuba: ambiance charmante, bon endroit pour découvrir la culture locale
- Restaurants recommandés: Lakeside, Saga Bay, Super Five, Paradis Malahide, Palm Garden Resort
- Calafia Café: connu pour son café exquis et ses sandwichs gastronomiques
- Migano Coffee shop and fast food

## Festivals et événements
- Karisimbi Summer Festival (juillet)
- Kivu Sunset Music Fest (juin)
- Festival All-Libérien (décembre)`,
    categoryId: 'transportation'
  },
  {
    id: 'student_life',
    title: 'Comment est la vie étudiante à Gisenyi?',
    content: `# Vie étudiante à Gisenyi

## Établissements d'enseignement
- Université Libre de Kigali (ULK) - campus de Gisenyi
- Rwanda Tourism University College
- UTB (Université du Tourisme, de la Technologie et des Études Commerciales) - campus de Rubavu

## Logement étudiant
- Campus ULK Gisenyi dispose de foyers pour étudiants
- Options de colocation dans le centre-ville à prix raisonnable (100-200$ par personne)
- Chambres chez l'habitant à partir de 10$ par nuit

## Budget mensuel pour étudiants
- Logement: 150-250$
- Nourriture: 150-200$
- Transport: 30-50$
- Matériel d'étude: 30-70$
- Internet et communication: 20-40$
- Loisirs: 50-100$

## Activités pour étudiants
- Plages publiques de Gisenyi (accès gratuit)
- Sports: football, volleyball sur la plage
- Randonnées sur le mont Rubavu
- Événements culturels au Centre Culturel de Rubavu
- Cafés avec WiFi pour étudier (Calafia Café, Migano Coffee shop)

## Conseils pour s'intégrer
- Apprendre quelques phrases en kinyarwanda
- Participer à l'Umuganda (journée mensuelle de travail communautaire)
- S'engager avec les habitants sur les marchés et lors d'événements locaux
- Fréquenter les bars locaux proposant des "brochettes et frites" (1-3$)
- Rejoindre des associations étudiantes`,
    categoryId: 'student_life'
  }
];

export default recommendedQuestions; 