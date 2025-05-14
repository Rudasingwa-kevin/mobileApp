import React from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  StatusBar
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const SavedScreen = () => {
  // Mock data for saved collections
  const collections = [
    { id: '1', title: 'Favoris', count: 5, image: 'https://a0.muscache.com/im/pictures/e25a9b25-fa98-4160-bfd1-039287bf38b6.jpg' },
    { id: '2', title: 'Gisenyi', count: 3, image: 'https://a0.muscache.com/im/pictures/miso/Hosting-47971380/original/a924a493-6c82-468d-8df7-3b0ca17d89d3.jpeg' },
    { id: '3', title: 'Week-end', count: 2, image: 'https://a0.muscache.com/im/pictures/miso/Hosting-826494959841460145/original/d0e6368d-bab0-4394-9947-a5662e6fcd81.jpeg' }
  ];

  // Empty state rendering
  const renderEmptyState = () => (
    <Animated.View 
      entering={FadeIn.duration(400)}
      style={styles.emptyStateContainer}
    >
      <Image 
        source={{ uri: 'https://a0.muscache.com/im/pictures/d727f355-3f10-44b5-9750-d1efca2438fc.jpg' }} 
        style={styles.emptyStateImage}
        resizeMode="cover"
      />
      <Text style={styles.emptyStateTitle}>Enregistrez vos logements préférés</Text>
      <Text style={styles.emptyStateSubtitle}>
        Cliquez sur l'icône en forme de cœur sur n'importe quel logement qui vous plaît et 
        nous l'ajouterons ici pour que vous puissiez facilement le retrouver.
      </Text>
    </Animated.View>
  );

  // Collection item rendering
  const renderCollectionItem = ({ item, index }) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(400)}
      style={styles.collectionItem}
    >
      <TouchableOpacity 
        activeOpacity={0.8}
        style={styles.collectionCard}
      >
        <Image 
          source={{ uri: item.image }}
          style={styles.collectionImage}
          resizeMode="cover"
        />
        <View style={styles.collectionInfo}>
          <Text style={styles.collectionTitle}>{item.title}</Text>
          <Text style={styles.collectionCount}>{item.count} enregistrements</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  // Show collections instead of the empty state for demonstration
  const showCollections = true;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoris</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {showCollections ? (
          <>
            <Text style={styles.sectionTitle}>Collections</Text>
            <View style={styles.collectionsContainer}>
              {collections.map((item, index) => renderCollectionItem({ item, index }))}
            </View>
            
            <Animated.View 
              entering={FadeIn.delay(400)}
              style={styles.createCollectionContainer}
            >
              <TouchableOpacity style={styles.createCollectionButton}>
                <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
                <Text style={styles.createCollectionText}>Créer une collection</Text>
              </TouchableOpacity>
            </Animated.View>
            
            <View style={styles.separator} />
            
            <Text style={styles.sectionTitle}>Tous les logements</Text>
            <Text style={styles.noSavedText}>
              Vous n'avez pas encore enregistré de logements. 
              Pour commencer, parcourez la page d'accueil et enregistrez les logements qui vous plaisent.
            </Text>
            
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explorer LocaMap</Text>
            </TouchableOpacity>
          </>
        ) : (
          renderEmptyState()
        )}
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
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: '700',
    color: colors.gray[800],
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[10],
  },
  emptyStateContainer: {
    alignItems: 'center',
    paddingTop: spacing[8],
    paddingHorizontal: spacing[4],
  },
  emptyStateImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: spacing[6],
  },
  emptyStateTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '600',
    color: colors.gray[800],
    marginBottom: spacing[4],
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '600',
    color: colors.gray[800],
    marginTop: spacing[6],
    marginBottom: spacing[4],
  },
  collectionsContainer: {
    marginBottom: spacing[4],
  },
  collectionItem: {
    marginBottom: spacing[4],
  },
  collectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  collectionImage: {
    width: 80,
    height: 80,
  },
  collectionInfo: {
    flex: 1,
    padding: spacing[4],
  },
  collectionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.gray[800],
    marginBottom: spacing[1],
  },
  collectionCount: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
  },
  createCollectionContainer: {
    marginBottom: spacing[6],
  },
  createCollectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  createCollectionText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.primary,
    marginLeft: spacing[2],
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginVertical: spacing[4],
  },
  noSavedText: {
    fontSize: typography.fontSize.base,
    color: colors.gray[600],
    marginBottom: spacing[6],
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  exploreButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing[4],
    alignItems: 'center',
    marginTop: spacing[2],
  },
  exploreButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.white,
    fontWeight: '600',
  },
});

export default SavedScreen; 