# 📋 Liste exhaustive des endpoints REST API nécessaires pour le backend LocaMap

## 👤 Authentification

| Méthode | URL                      | Description                                          | Payload                                              |
|---------|--------------------------|------------------------------------------------------|------------------------------------------------------|
| POST    | `/api/auth/login`        | Connexion utilisateur                                | `{ email, password }`                                |
| POST    | `/api/auth/register`     | Création d'un compte utilisateur                     | `{ fullName, email, password, phoneNumber? }`        |
| POST    | `/api/auth/forgot-password` | Demande de réinitialisation de mot de passe       | `{ email }`                                          |
| POST    | `/api/auth/reset-password` | Définition d'un nouveau mot de passe               | `{ token, newPassword }`                             |
| GET     | `/api/auth/verify`       | Vérification de validité du token                    | -                                                    |
| POST    | `/api/auth/logout`       | Déconnexion utilisateur                              | -                                                    |

## 🏠 Propriétés

| Méthode | URL                      | Description                                          | Payload                                              |
|---------|--------------------------|------------------------------------------------------|------------------------------------------------------|
| GET     | `/api/properties`        | Récupérer toutes les propriétés                      | -                                                    |
| GET     | `/api/properties/:id`    | Récupérer une propriété par son ID                   | -                                                    |
| GET     | `/api/properties/search` | Rechercher des propriétés avec filtres               | Query: `{ query, minPrice, maxPrice, bedrooms, bathrooms, amenities, type, district }` |
| POST    | `/api/properties`        | Créer une nouvelle propriété                         | `{ title, description, price, currency, location, bedrooms, bathrooms, surface, amenities, images, type }` |
| PUT     | `/api/properties/:id`    | Mettre à jour une propriété                          | `{ title?, description?, price?, currency?, etc. }`  |
| DELETE  | `/api/properties/:id`    | Supprimer une propriété                              | -                                                    |
| GET     | `/api/properties/owner/:ownerId` | Récupérer les propriétés d'un propriétaire   | -                                                    |

## 👥 Utilisateurs

| Méthode | URL                      | Description                                          | Payload                                              |
|---------|--------------------------|------------------------------------------------------|------------------------------------------------------|
| GET     | `/api/users/me`          | Récupérer le profil utilisateur courant              | -                                                    |
| PUT     | `/api/users/me`          | Mettre à jour le profil utilisateur                  | `{ fullName?, email?, phoneNumber?, avatar? }`       |
| PUT     | `/api/users/me/password` | Changer le mot de passe                              | `{ currentPassword, newPassword }`                   |
| POST    | `/api/users/me/avatar`   | Téléverser une photo de profil                       | `FormData` avec fichier image                        |
| PUT     | `/api/users/me/preferences` | Mettre à jour les préférences utilisateur         | `{ preferredCurrency?, preferredLanguage?, notifications? }` |

## ❤️ Favoris

| Méthode | URL                                  | Description                           | Payload                |
|---------|--------------------------------------|---------------------------------------|------------------------|
| GET     | `/api/users/me/saved-properties`     | Récupérer tous les favoris utilisateur| -                      |
| POST    | `/api/users/me/saved-properties`     | Ajouter une propriété aux favoris     | `{ propertyId }`       |
| DELETE  | `/api/users/me/saved-properties/:propertyId` | Retirer une propriété des favoris | -                   |

## 💬 Messagerie

| Méthode | URL                                | Description                              | Payload                        |
|---------|------------------------------------|-----------------------------------------|--------------------------------|
| GET     | `/api/conversations`               | Récupérer toutes les conversations       | -                              |
| GET     | `/api/conversations/:id`           | Récupérer une conversation par ID        | -                              |
| GET     | `/api/conversations/:id/messages`  | Récupérer les messages d'une conversation| -                              |
| POST    | `/api/conversations/:id/messages`  | Envoyer un message                       | `{ text }`                     |
| PUT     | `/api/conversations/:id/read`      | Marquer conversation comme lue           | -                              |
| POST    | `/api/conversations`               | Créer nouvelle conversation              | `{ ownerId, propertyId, initialMessage }` |
| GET     | `/api/conversations/stats`         | Récupérer statistiques de messagerie     | -                              |

## ⭐ Avis et Évaluations

| Méthode | URL                                | Description                              | Payload                        |
|---------|------------------------------------|-----------------------------------------|--------------------------------|
| GET     | `/api/properties/:id/reviews`      | Récupérer avis sur une propriété         | -                              |
| GET     | `/api/reviews/:id`                 | Récupérer un avis par ID                 | -                              |
| POST    | `/api/properties/:id/reviews`      | Ajouter un avis sur une propriété        | `{ rating, comment, authorId, stayDuration? }` |
| PUT     | `/api/reviews/:id`                 | Modifier un avis                         | `{ rating?, comment? }`         |
| DELETE  | `/api/reviews/:id`                 | Supprimer un avis                        | -                              |
| POST    | `/api/reviews/:id/reply`           | Répondre à un avis (propriétaire)        | `{ text }`                     |
| GET     | `/api/users/me/reviews`            | Récupérer avis laissés par l'utilisateur | -                              |
| GET     | `/api/users/me/properties/reviews` | Récupérer avis sur propriétés utilisateur| -                              |

## 📅 Disponibilité et Réservations

| Méthode | URL                                 | Description                              | Payload                        |
|---------|-------------------------------------|-----------------------------------------|--------------------------------|
| GET     | `/api/properties/:id/availability`  | Récupérer calendrier disponibilité       | Query: `{ startDate, endDate }` |
| POST    | `/api/properties/:id/availability`  | Définir disponibilité (dates)           | `{ dates: [], available: boolean }` |
| GET     | `/api/bookings`                     | Récupérer toutes les réservations        | Query: `{ status?, propertyId? }` |
| GET     | `/api/bookings/:id`                 | Récupérer détails d'une réservation      | -                              |
| POST    | `/api/bookings`                     | Créer une demande de réservation         | `{ propertyId, startDate, endDate, guestCount, message? }` |
| PUT     | `/api/bookings/:id/status`          | Modifier statut réservation              | `{ status: 'approved'|'rejected'|'cancelled' }` |
| GET     | `/api/bookings/stats`               | Statistiques réservations (propriétaire) | -                              |

## 📍 Localisation et Géographie

| Méthode | URL                                 | Description                              | Payload                        |
|---------|-------------------------------------|-----------------------------------------|--------------------------------|
| GET     | `/api/locations/districts`          | Récupérer liste des quartiers disponibles| -                              |
| GET     | `/api/locations/cities`             | Récupérer liste des villes disponibles   | -                              |
| GET     | `/api/locations/search`             | Recherche géographique par texte         | Query: `{ query }`            |
| GET     | `/api/properties/nearby`            | Propriétés à proximité                   | Query: `{ lat, lng, radius }`  |

## 📝 Guides Locaux

| Méthode | URL                                 | Description                              | Payload                        |
|---------|-------------------------------------|-----------------------------------------|--------------------------------|
| GET     | `/api/guides/categories`            | Récupérer catégories de guides           | -                              |
| GET     | `/api/guides`                       | Récupérer tous les guides               | Query: `{ categoryId? }`       |
| GET     | `/api/guides/:id`                   | Récupérer détails d'un guide            | -                              |
| GET     | `/api/guides/new`                   | Récupérer guides récents                | -                              |

## 🔔 Alertes et Notifications

| Méthode | URL                                 | Description                              | Payload                        |
|---------|-------------------------------------|-----------------------------------------|--------------------------------|
| GET     | `/api/alerts`                       | Récupérer alertes utilisateur            | -                              |
| POST    | `/api/alerts`                       | Créer alerte (ex: nouvelle propriété)    | `{ filters, frequency, name }` |
| PUT     | `/api/alerts/:id`                   | Modifier une alerte                      | `{ filters?, frequency?, name? }` |
| DELETE  | `/api/alerts/:id`                   | Supprimer une alerte                     | -                              |
| GET     | `/api/notifications`                | Récupérer notifications utilisateur      | Query: `{ read? }`             |
| PUT     | `/api/notifications/:id/read`       | Marquer notification comme lue           | -                              |

## 📊 Statistiques Propriétaire

| Méthode | URL                                 | Description                              | Payload                        |
|---------|-------------------------------------|-----------------------------------------|--------------------------------|
| GET     | `/api/host/stats/overview`          | Récupérer statistiques globales hôte     | -                              |
| GET     | `/api/host/stats/properties/:id`    | Statistiques par propriété               | Query: `{ period? }`           |
| GET     | `/api/host/stats/revenue`           | Statistiques revenus                     | Query: `{ startDate, endDate }` |
| GET     | `/api/host/stats/occupancy`         | Taux d'occupation                        | Query: `{ startDate, endDate }` |

## 🛠️ Utilitaires et Configuration

| Méthode | URL                                 | Description                              | Payload                        |
|---------|-------------------------------------|-----------------------------------------|--------------------------------|
| GET     | `/api/config/amenities`             | Liste des équipements disponibles        | -                              |
| GET     | `/api/config/currencies`            | Liste des devises supportées             | -                              |
| GET     | `/api/config/languages`             | Liste des langues supportées             | -                              |
| GET     | `/api/config/property-types`        | Types de propriétés disponibles          | -                              |
| POST    | `/api/upload/images`                | Upload d'images (propriétés)             | `FormData` avec images         |

## 💳 Paiements (si applicable)

| Méthode | URL                                 | Description                              | Payload                        |
|---------|-------------------------------------|-----------------------------------------|--------------------------------|
| GET     | `/api/payments/methods`             | Récupérer méthodes de paiement           | -                              |
| POST    | `/api/payments/methods`             | Ajouter méthode de paiement              | `{ type, details }`            |
| DELETE  | `/api/payments/methods/:id`         | Supprimer méthode de paiement            | -                              |
| GET     | `/api/payments/transactions`        | Historique des transactions              | Query: `{ status?, type? }`    |
| POST    | `/api/payments/pay`                 | Effectuer un paiement                    | `{ bookingId, methodId }`      | 