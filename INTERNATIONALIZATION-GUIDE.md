# Guide d'internationalisation complète pour LocaMap

Ce guide explique comment internationaliser l'ensemble de l'application LocaMap pour prendre en charge les quatre langues suivantes :
- Français (fr)
- Anglais (en)
- Kinyarwanda (rw)
- Swahili (sw)

## Structure mise en place

1. **Fichiers de traduction**
   - Les fichiers de traduction sont dans `/src/locales/`
   - Format : fichiers JSON par langue (`fr.json`, `en.json`, `rw.json`, `sw.json`)
   - Structure hiérarchique par namespaces (common, auth, preferences, etc.)

2. **Utilitaire i18n**
   - Configuration centralisée dans `/src/utils/i18n.ts`
   - Fonctions utilitaires : `useSyncLanguage()`, `changeLanguage()`, `translate()`
   - Détection de la langue du système avec `expo-localization`

3. **Store des préférences**
   - Stockage persistant de la langue dans `/src/store/preferences.ts`
   - Fonction d'initialisation `initializeLanguageFromSystem()`
   - Synchronisation automatique avec i18next

## Utilisation dans les composants

Pour internationliser un composant ou un écran, suivez ces étapes :

1. **Importer le hook useTranslation**
   ```jsx
   import { useTranslation } from 'react-i18next';
   ```

2. **Initialiser le hook dans le composant**
   ```jsx
   const { t } = useTranslation();
   ```

3. **Remplacer tous les textes en dur par des appels à t()**
   ```jsx
   // Avant
   <Text>Bienvenue</Text>
   
   // Après
   <Text>{t('common.welcome')}</Text>
   ```

4. **Pour les textes avec variables**
   ```jsx
   <Text>{t('home.welcome', { name: user.name })}</Text>
   ```

## Checklist des composants à internationaliser

### Écrans principaux
- [ ] HomeScreen
- [ ] SearchScreen
- [ ] LoginScreen
- [ ] RegisterScreen
- [ ] ForgotPasswordScreen
- [ ] ProfileScreen
- [x] EditProfileScreen (déjà fait)
- [x] PreferenceCarouselScreen (déjà fait)
- [x] AlertPreferencesScreen (nouvellement fait)
- [ ] LogementDetailScreen
- [ ] FavoritesScreen
- [ ] LocalGuideScreen
- [ ] MapScreen
- [ ] MessageListScreen
- [ ] ConversationScreen
- [ ] LeaveReviewScreen

### Composants réutilisables
- [x] LanguageCurrencySelector (déjà fait)
- [x] PriceDisplay (déjà fait)
- [ ] PropertyCard
- [ ] TopNavBar
- [ ] BottomNavBar
- [ ] FilterModal
- [ ] ReviewItem
- [ ] MessageInput
- [ ] SearchBox
- [ ] LoadingIndicator
- [ ] ErrorMessage

## Directives importantes

1. **Aucun texte en dur**
   - Aucune chaîne de texte visible ne doit être codée en dur
   - Tout doit passer par `t('key')`

2. **Clés de traduction**
   - Utiliser une structure hiérarchique (`section.subsection.key`)
   - Maintenir la cohérence entre les fichiers de traduction
   - Garder les clés descriptives et organisées

3. **Pluralisation et formatage**
   - Pour les pluriels, utiliser i18next :
     ```jsx
     t('property.count', { count: properties.length })
     ```
   - Format de nombre et de date : utiliser les fonctions de formatage localisées

4. **Débogage**
   - Pour vérifier les clés manquantes : i18next inclut des avertissements dans la console

## Procédure pour internationaliser un nouvel écran

1. Identifiez tous les textes visibles
2. Créez des clés appropriées dans les fichiers de traduction pour chaque langue
3. Remplacez les textes en dur par des appels à `t('key')`
4. Testez l'écran dans les quatre langues pour vérifier que tout s'affiche correctement

## Meilleures pratiques

1. **Structure évolutive**
   - Gardez les namespaces organisés pour faciliter l'ajout futur de langues
   - Evitez les traductions répétitives, utilisez des clés communes

2. **Expérience utilisateur**
   - Assurez-vous que l'interface s'adapte aux différentes longueurs de texte
   - Testez les langues ayant des mots plus longs (le français) et plus courts (l'anglais)

3. **Performance**
   - Évitez d'appeler `t()` à l'intérieur de boucles ou de fonctions de rendu intensives
   - Utilisez la mémoisation quand c'est pertinent

4. **Textes dynamiques**
   - Pour les contenus dynamiques ou les données du backend, utilisez des clés de traduction pour les libellés et les en-têtes uniquement

## Exemple concret

Voici un exemple d'internationalisation d'un composant simple :

```jsx
// Avant
const WelcomeMessage = ({ username }) => (
  <View>
    <Text style={styles.title}>Bienvenue sur LocaMap</Text>
    <Text style={styles.subtitle}>Bonjour {username}, découvrez les meilleurs logements de Gisenyi.</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Commencer</Text>
    </TouchableOpacity>
  </View>
);

// Après
import { useTranslation } from 'react-i18next';

const WelcomeMessage = ({ username }) => {
  const { t } = useTranslation();
  
  return (
    <View>
      <Text style={styles.title}>{t('welcome.title')}</Text>
      <Text style={styles.subtitle}>
        {t('welcome.greeting', { username })}
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{t('common.start')}</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## Support pour les nouvelles langues

Pour ajouter une nouvelle langue :

1. Créez un nouveau fichier JSON dans `/src/locales/` (e.g., `es.json` pour l'espagnol)
2. Copiez la structure d'un fichier existant et traduisez toutes les valeurs
3. Ajoutez la langue à `SUPPORTED_LANGUAGES` dans `i18n.ts`
4. Ajoutez la langue au composant de sélection `LanguageCurrencySelector`

## Résolution des problèmes courants

1. **Texte non traduit**
   - Vérifiez que la clé existe dans tous les fichiers de traduction
   - Vérifiez que `useTranslation()` est correctement initialisé

2. **Problèmes de synchronisation avec le store**
   - Assurez-vous que `useSyncLanguage()` est bien appelé dans les composants parents
   - Vérifiez que les modifications de langue persistent correctement

3. **Textes tronqués**
   - Utilisez des styles flexibles qui s'adaptent à différentes longueurs de texte
   - Testez avec toutes les langues pour vous assurer que l'interface reste cohérente

---

Cette approche d'internationalisation garantit une expérience utilisateur cohérente et adaptée à la diversité linguistique de la région de Gisenyi, tout en simplifiant la maintenance et l'évolution future de l'application. 