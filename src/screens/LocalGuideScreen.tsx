import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TextInput as RNTextInput, 
  TouchableOpacity, 
  StatusBar, 
  SafeAreaView,
  RefreshControl,
  Platform 
} from 'react-native';
import { Text, Searchbar, Divider, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import GuideSection from '../components/GuideSection';
import { guideCategories, localGuides } from '../data/localGuides';
import Animated, { FadeIn } from 'react-native-reanimated';

const LocalGuideScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  // États
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [searchResults, setSearchResults] = useState(localGuides);
  
  // Gérer la recherche
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults(localGuides);
      return;
    }
    
    // Filtrer les guides selon le terme de recherche
    const filteredGuides = localGuides.filter(guide => 
      guide.title.toLowerCase().includes(query.toLowerCase()) ||
      guide.summary.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filteredGuides);
  };
  
  // Rafraîchir les données (simulation)
  const onRefresh = () => {
    setRefreshing(true);
    
    // Simuler un délai de chargement
    setTimeout(() => {
      setSearchResults(localGuides);
      setRefreshing(false);
    }, 1000);
  };
  
  // Regrouper les guides par catégorie
  const getGuidesByCategory = (categoryId: string) => {
    return searchResults.filter(guide => guide.categoryId === categoryId);
  };
  
  // Naviguer vers tous les guides d'une catégorie (à implémenter si besoin)
  const handleSeeAllCategory = (categoryId: string) => {
    // Navigation vers une page dédiée à la catégorie
    // À implémenter si nécessaire
    console.log('Voir tous les guides de la catégorie:', categoryId);
  };
  
  // Naviguer vers l'écran d'accueil
  const navigateBack = () => {
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      {/* En-tête */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={navigateBack}
        >
          <Ionicons name="arrow-back" size={24} color={colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Découvrir Gisenyi</Text>
        <View style={styles.headerRight} />
      </View>
      
      {/* Contenu principal */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      >
        {/* Introduction */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>
            Bienvenue à Gisenyi
          </Text>
          <Text style={styles.introText}>
            Découvrez tout ce que vous devez savoir pour profiter pleinement de votre séjour dans cette magnifique ville au bord du lac Kivu.
          </Text>
        </View>
        
        {/* Barre de recherche */}
        <Animated.View 
          entering={FadeIn.duration(300)}
          style={styles.searchContainer}
        >
          <Searchbar
            placeholder="Rechercher un guide..."
            onChangeText={handleSearch}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            iconColor={colors.gray[500]}
          />
        </Animated.View>
        
        <Divider style={styles.divider} />
        
        {/* Message si aucun résultat */}
        {searchResults.length === 0 && (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search-outline" size={48} color={colors.gray[400]} />
            <Text style={styles.noResultsText}>
              Aucun guide ne correspond à votre recherche "{searchQuery}"
            </Text>
          </View>
        )}
        
        {/* Sections de guides par catégorie */}
        {guideCategories.map(category => {
          const categoryGuides = getGuidesByCategory(category.id);
          
          // Ne pas afficher les catégories vides
          if (categoryGuides.length === 0) {
            return null;
          }
          
          return (
            <GuideSection
              key={category.id}
              category={category}
              guides={categoryGuides}
              onSeeAllPress={() => handleSeeAllCategory(category.id)}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.gray[800],
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
  },
  introSection: {
    marginBottom: spacing[4],
  },
  introTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: spacing[2],
  },
  introText: {
    fontSize: typography.fontSize.base,
    color: colors.gray[600],
    lineHeight: 22,
  },
  searchContainer: {
    marginBottom: spacing[4],
  },
  searchBar: {
    elevation: 0,
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.full,
  },
  searchInput: {
    fontSize: typography.fontSize.sm,
  },
  divider: {
    marginBottom: spacing[4],
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[8],
  },
  noResultsText: {
    marginTop: spacing[4],
    fontSize: typography.fontSize.base,
    color: colors.gray[500],
    textAlign: 'center',
  },
});

export default LocalGuideScreen; 