# Module Guides Locaux - LocaMap

## Présentation

Le module Guides Locaux de LocaMap fournit des informations essentielles sur la ville de Gisenyi au Rwanda pour aider les utilisateurs (résidents, expatriés, étudiants, touristes) à mieux comprendre leur environnement et faciliter leur intégration.

## Structure des données

Les guides sont organisés selon la structure suivante :

```typescript
interface Guide {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  image: string;
  content: string;
  isNew?: boolean;
  createdAt: Date;
}
```

## Catégories de guides

Six catégories principales ont été créées pour organiser l'information de manière logique :

1. **Quartiers recommandés** (`neighborhoods`) - Informations sur les différents quartiers résidentiels de Gisenyi
2. **Se déplacer** (`transportation`) - Moyens de transport dans et autour de Gisenyi
3. **Coût de la vie** (`cost_of_living`) - Prix, budget et dépenses locales
4. **Sécurité** (`safety`) - Conseils de sécurité et informations sanitaires
5. **Conseils expatriés** (`expat_tips`) - Ressources pour les étrangers
6. **Vie étudiante** (`student_life`) - Informations spécifiques pour les étudiants internationaux

## Fonctionnalités du module

- **Affichage des guides par catégorie** - Les guides sont regroupés par catégorie pour une navigation intuitive
- **Recherche** - Possibilité de rechercher dans tous les guides
- **Filtrage** - Filtrage par catégorie 
- **Détails riches** - Contenu détaillé en Markdown pour chaque guide
- **Internationalisation** - Support de plusieurs langues (français, anglais)
- **Images** - Chaque guide est illustré par une image pertinente

## Source des données

Les informations contenues dans les guides sont issues d'une recherche approfondie sur Gisenyi, incluant :
- Données géographiques et climatiques
- Informations sur les quartiers et logements
- Coûts réels et estimations de budget
- Informations sur les transports locaux
- Conseils culturels et pratiques
- Établissements d'enseignement et vie étudiante

## Améliorations futures

- Ajout de vidéos explicatives
- Cartes interactives pour les quartiers
- Mise à jour régulière des prix
- Avis et contributions des utilisateurs
- Version hors-ligne des guides

## Utilisation dans l'application

Les guides sont accessibles via l'écran "Guides Locaux" dans l'application LocaMap, accessibles depuis l'écran Explorer ou directement depuis la barre de navigation.

---

*Dernière mise à jour : Novembre 2023* 