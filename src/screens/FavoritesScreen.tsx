import React from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors, spacing, typography, borderRadius } from '../theme';

// Components
import FavoriteCard from '../components/FavoriteCard';

// Types
import { RootStackParamList } from '../types';

// State
import { useFavoritesStore } from '../store/favorites';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const { favorites } = useFavoritesStore();
  
  const handlePropertyPress = (propertyId: string) => {
    navigation.navigate('PropertyDetails', { propertyId });
  };
  
  const renderEmptyState = () => (
    <Animated.View 
      entering={FadeIn.duration(400)}
      style={styles.emptyContainer}
    >
      <Ionicons name="heart" size={64} color={colors.gray[300]} />
      <Text style={styles.emptyTitle}>
        Aucun favori
      </Text>
      <Text style={styles.emptyText}>
        Vous n'avez pas encore ajouté de logements à vos favoris.
      </Text>
      <TouchableOpacity 
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.exploreButtonText}>
          Explorer les logements
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
  
  const renderListHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        Mes favoris
      </Text>
      <Text style={styles.headerSubtitle}>
        {favorites.length} logement{favorites.length !== 1 ? 's' : ''} sauvegardé{favorites.length !== 1 ? 's' : ''}
      </Text>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <FavoriteCard
              property={item}
              onPress={handlePropertyPress}
              index={index}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderListHeader}
        />
      ) : (
        renderEmptyState()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[4],
  },
  header: {
    marginTop: spacing[4],
    marginBottom: spacing[3],
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.gray[900],
    marginBottom: spacing[1],
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.gray[600],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[6],
  },
  emptyTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.gray[800],
    marginTop: spacing[4],
    marginBottom: spacing[2],
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing[6],
  },
  exploreButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    borderRadius: borderRadius.full,
  },
  exploreButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.base,
    fontWeight: '600',
  },
});

export default FavoritesScreen; 