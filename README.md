# LocaMap

Application mobile pour aider les étrangers à trouver des logements abordables à Gisenyi, Rwanda.

## Technologies utilisées

- React Native avec Expo
- TypeScript
- React Navigation (Stack et Tab)
- React Native Paper pour les composants UI
- Zustand pour la gestion d'état

## Structure du projet

Le projet suit une architecture modulaire, organisée par fonctionnalités :

```
/src
  /components  → Composants réutilisables 
  /screens     → Écrans principaux
  /navigation  → Configuration de la navigation
  /hooks       → Hooks personnalisés
  /store       → Gestion d'état (Zustand)
  /services    → Services API (mockés pour le moment)
  /types       → Types TypeScript
  /assets      → Ressources statiques
```

## Fonctionnalités

- Affichage des propriétés disponibles
- Recherche et filtrage des propriétés
- Affichage détaillé d'une propriété
- Gestion des favoris
- Connexion/déconnexion utilisateur (simulée)

## Installation

1. Cloner le dépôt
2. Installer les dépendances : `npm install`
3. Lancer l'application : 
   - Android : `npm run android`
   - iOS : `npm run ios` 
   - Web : `npm run web`

## Données de test

Pour tester la connexion, utiliser les identifiants suivants :
- Email : `test@example.com`
- Mot de passe : `password`

## Développement

Ce projet a été configuré avec ESLint et Prettier pour maintenir un code propre et cohérent.

### Scripts disponibles

- `npm start` : Démarre le serveur de développement Expo
- `npm run android` : Lance l'application sur Android
- `npm run ios` : Lance l'application sur iOS
- `npm run web` : Lance l'application en mode web

## Prochaines étapes

- Intégration avec une API réelle
- Ajout de fonctionnalités de cartographie
- Implémentation de la recherche par localisation
- Support multilingue (Français, Anglais, Kinyarwanda)