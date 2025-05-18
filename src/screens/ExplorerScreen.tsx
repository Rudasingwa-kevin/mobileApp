import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  TouchableOpacity, 
  StatusBar,
  SafeAreaView,
  Dimensions,
  Platform,
  RefreshControl,
  ScrollView,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import {
  Text,
  useTheme,
  ActivityIndicator,
  Button,
  Card,
  Avatar,
  Divider,
  IconButton,
} from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../types';
import { Property } from '../types/index';
import SearchFiltersModal from '../components/SearchFiltersModal';
import { useSearchStore, SearchFilters } from '../store/search';
import { useUserStore } from '../store/user';
import { usePreferences } from '../store/preferences';
import { useTranslation } from 'react-i18next';
import { useFavoritesStore } from '../store/favorites';
import Animated, {
  FadeInUp,
  FadeIn,
  FadeInRight,
  SlideInUp,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const NUM_COLUMNS_THRESHOLD = 700;
const SEARCH_BAR_HEIGHT = 60;

// Définition des catégories personnalisées
const CUSTOM_CATEGORIES = [
  {
    id: 'all',
    labelKey: 'explore.categories.all',
    icon: 'explore',
    color: '#FF5A5F',
  },
  {
    id: 'lake_view',
    labelKey: 'explore.categories.lake',
    icon: 'water',
    color: '#FF5A5F',
    amenityFilter: ['Vue sur le lac', 'Lakefront']
  },
  {
    id: 'student',
    labelKey: 'explore.categories.student',
    icon: 'school',
    color: '#FF5A5F',
    amenityFilter: ['Pour étudiants', 'Student housing']
  },
  {
    id: 'furnished',
    labelKey: 'explore.categories.furnished',
    icon: 'chair',
    color: '#FF5A5F',
    amenityFilter: ['Meublé', 'Furnished']
  },
  {
    id: 'longTerm',
    labelKey: 'explore.categories.longTerm',
    icon: 'event-available',
    color: '#FF5A5F',
    amenityFilter: ['Long séjour', 'Long term']
  },
  {
    id: 'villa',
    labelKey: 'explore.categories.villas',
    icon: 'villa',
    color: '#FF5A5F',
    propertyType: 'villa'
  },
  {
    id: 'appartement',
    labelKey: 'explore.categories.apartments',
    icon: 'apartment',
    color: '#FF5A5F',
    propertyType: 'appartement'
  },
  {
    id: 'new',
    labelKey: 'explore.categories.new',
    icon: 'fiber-new',
    color: '#FF5A5F',
    isNew: true
  }
];

// Guides locaux mockés
const LOCAL_GUIDES = [
  {
    id: '1',
    title: 'Transport à Gisenyi',
    description: 'Comment se déplacer facilement dans la ville',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    icon: 'directions-bus'
  },
  {
    id: '2',
    title: 'Les quartiers de Gisenyi',
    description: 'Guide des différents quartiers et leurs caractéristiques',
    image: 'https://images.unsplash.com/photo-1580223530509-849e0b42a99a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    icon: 'place'
  },
  {
    id: '3',
    title: 'Activités au bord du lac',
    description: 'Découvrez toutes les activités autour du lac Kivu',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    icon: 'beach-access'
  }
];

const ExplorerScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { currency } = usePreferences();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  
  const {
    listings,
    filteredListings,
    isLoading,
    filters,
    showFiltersModal,
    fetchListings,
    setQuery,
    setFilters,
    applyFilters,
    resetFilters,
    toggleFiltersModal,
  } = useSearchStore();

  const [numColumns, setNumColumns] = useState(width > NUM_COLUMNS_THRESHOLD ? 2 : 1);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  
  // Animation values for scroll-based effects
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Animated style for the sticky search header
  const searchBarAnimatedStyle = useAnimatedStyle(() => {
    const elevation = interpolate(
      scrollY.value,
      [0, 10],
      [0, 4],
      Extrapolate.CLAMP
    );

    return {
      zIndex: 1000,
      elevation: elevation,
      shadowOpacity: elevation * 0.1,
      shadowOffset: { width: 0, height: elevation * 0.5 },
    };
  });
  
  const handleFetchListings = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    await fetchListings();
    if (isRefresh) setRefreshing(false);
  }, [fetchListings]);

  useFocusEffect(
    useCallback(() => {
      if (listings.length === 0) {
        handleFetchListings();
      }
      setNumColumns(Dimensions.get('window').width > NUM_COLUMNS_THRESHOLD ? 2 : 1);
    }, [listings.length, handleFetchListings])
  );

  // Update numColumns on dimension change
  useEffect(() => {
    const updateLayout = () => {
      setNumColumns(Dimensions.get('window').width > NUM_COLUMNS_THRESHOLD ? 2 : 1);
    };
    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription?.remove();
  }, []);

  const handleSearch = () => {
    setQuery(searchText);
    setActiveCategory('all');
  };

  const handleCategoryPress = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    const category = CUSTOM_CATEGORIES.find(cat => cat.id === categoryId);
    
    if (categoryId === 'all') {
      // Reset filters but keep the search query if any
      const newFilters: Partial<SearchFilters> = { 
        ...filters, 
        propertyType: undefined,
        amenities: undefined
      };
      setFilters(newFilters);
    } else if (category?.amenityFilter) {
      // Filter by amenities
      setFilters({ 
        ...filters, 
        amenities: category.amenityFilter
      });
    } else if (category?.propertyType) {
      // Filter by property type
      setFilters({
        ...filters,
        propertyType: [category.propertyType]
      });
    } else if (category?.isNew) {
      // Filter for 'new' properties (added in the last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      // Apply a custom filter for new properties
      // Since our SearchFilters doesn't have dateAddedAfter directly, 
      // we'll filter the listings after applying other filters
      setFilters({
        ...filters,
        // We'll handle the date filter in the rendering
      });
    }
    
    applyFilters();
  };
  
  const onResetFilters = () => {
    resetFilters();
    setActiveCategory('all');
    setSearchText('');
  };

  // Currency formatter
  const formatCurrency = (price: number, currency: string) => {
    switch (currency) {
      case 'USD':
        return `$${price}`;
      case 'EUR':
        return `€${price}`;
      default:
        return `${price.toLocaleString()} RWF`;
    }
  };
  
  // Render functions
  const renderGuideCard = ({ item, index }: { item: typeof LOCAL_GUIDES[0]; index: number }) => (
    <Animated.View
      entering={FadeInUp.delay(200 + index * 100).duration(400)}
      style={styles.guideCardContainer}
    >
      <TouchableOpacity
        style={styles.guideCard}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('LocalGuide')}
      >
        <Image source={{ uri: item.image }} style={styles.guideImage} />
        <View style={styles.guideContentOverlay}>
          <View style={styles.guideIconContainer}>
            <MaterialIcons name={item.icon as any} size={24} color="#FFFFFF" />
          </View>
          <View style={styles.guideContent}>
            <Text style={styles.guideTitle}>{item.title}</Text>
            <Text style={styles.guideDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderCategoryItem = ({ item, index }: { item: typeof CUSTOM_CATEGORIES[0]; index: number }) => (
    <Animated.View 
      entering={FadeInRight.delay(index * 30).duration(300)}
      style={styles.categoryItem}
    >
      <TouchableOpacity
        onPress={() => handleCategoryPress(item.id)}
        style={[
          styles.categoryButton,
          activeCategory === item.id && styles.activeCategoryButton,
        ]}
      >
        <MaterialIcons 
          name={item.icon as any} 
          size={20} 
          color={activeCategory === item.id ? "#FFFFFF" : "#222222"} 
        />
      </TouchableOpacity>
      <Text 
        style={[
          styles.categoryLabel,
          activeCategory === item.id && styles.activeCategoryLabel
        ]}
        numberOfLines={1}
      >
        {t(item.labelKey)}
      </Text>
    </Animated.View>
  );

  const renderPropertyCard = ({ item, index }: { item: Property; index: number }) => {
    const currentlyFavorite = isFavorite(item.id);
    const isNew = new Date(item.createdAt).getTime() > Date.now() - (30 * 24 * 60 * 60 * 1000);
    
    const handleToggleFavorite = () => {
      if (currentlyFavorite) {
        removeFavorite(item.id);
      } else {
        addFavorite(item);
      }
    };

    return (
      <Animated.View 
        entering={FadeInUp.delay(index * 50).duration(300)}
        style={[
          styles.cardWrapper, 
          { width: numColumns === 1 ? '100%' : '50%' }
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.id })}
          style={styles.propertyCard}
        >
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: Array.isArray(item.images) && item.images.length > 0 ? 
                item.images[0] : 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' 
              }} 
              style={styles.propertyImage} 
              resizeMode="cover" 
            />
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={handleToggleFavorite}
            >
              <MaterialIcons 
                name={currentlyFavorite ? "favorite" : "favorite-border"}
                size={22} 
                color={currentlyFavorite ? "#FF5A5F" : "white"}
              />
            </TouchableOpacity>
            {isNew && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{t('common.new')}</Text>
              </View>
            )}
          </View>

          <View style={styles.propertyInfo}>
            <View style={styles.ratingRow}>
              <Text style={styles.locationText}>
                {item.location.district || item.location.city}
              </Text>
              {item.rating && (
                <View style={styles.ratingContainer}>
                  <MaterialIcons name="star" size={16} color="#222222" />
                  <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
            
            <Text style={styles.detailsText}>
              {item.bedrooms} {t('property.bedrooms')} · {item.bathrooms} {t('property.bathrooms')}
              {item.size ? ` · ${item.size}m²` : ''}
            </Text>
            
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>
                <Text style={styles.priceBold}>
                  {formatCurrency(item.price, item.currency)}
                </Text>
                <Text style={styles.priceUnit}> / {t('property.perMonth')}</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Animated.View entering={FadeIn.duration(400)} style={styles.emptyContent}>
        <MaterialIcons name="search-off" size={56} color="#666666" />
        <Text style={styles.emptyTitle}>{t('explore.noResults')}</Text>
        <Text style={styles.emptySubtitle}>{t('explore.tryDifferent')}</Text>
        <Button 
          mode="contained" 
          onPress={onResetFilters} 
          style={styles.resetButton}
          buttonColor="#FF5A5F"
        >
          {t('explore.resetFilters')}
        </Button>
      </Animated.View>
    </View>
  );

  // Filter new items if the "new" category is selected
  const displayedListings = activeCategory === 'new' 
    ? filteredListings.filter(
        item => new Date(item.createdAt).getTime() > Date.now() - (30 * 24 * 60 * 60 * 1000)
      )
    : filteredListings;
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Sticky Search Bar */}
      <Animated.View style={[styles.searchBarContainer, searchBarAnimatedStyle]}>
        <TouchableOpacity 
          style={styles.searchBar}
          activeOpacity={0.9}
          onPress={() => toggleFiltersModal()}
        >
          <MaterialIcons name="search" size={24} color="#222222" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>{t('explore.searchPlaceholder')}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={toggleFiltersModal}
        >
          <MaterialIcons name="tune" size={24} color="#222222" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => navigation.navigate('MapScreen')}
        >
          <MaterialIcons name="map" size={24} color="#222222" />
            </TouchableOpacity>
      </Animated.View>
      
      {/* Main Content */}
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => handleFetchListings(true)}
            colors={["#FF5A5F"]}
            tintColor={"#FF5A5F"}
          />
        }
      >
        {/* Categories section */}
        <View style={styles.categoriesSection}>
          <FlatList
            data={CUSTOM_CATEGORIES}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
        
        {/* Results Count */}
        <View style={styles.resultsCountContainer}>
          <Text style={styles.resultsCount}>
            {displayedListings.length} {t('explore.results')}
          </Text>
        </View>
        
        {/* Properties section */}
        <View style={styles.propertiesSection}>
          {isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#FF5A5F" />
            </View>
          ) : displayedListings.length === 0 ? (
            renderEmptyState()
          ) : (
            <View style={styles.propertiesGrid}>
              {displayedListings.map((item, index) => (
                React.cloneElement(renderPropertyCard({ item, index }), { key: item.id || index })
              ))}
            </View>
          )}
        </View>
        
        {/* Local Guides Section */}
        <View style={styles.guidesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('explore.localGuidesTitle')}</Text>
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('LocalGuide')}
            >
              <Text style={styles.viewAllText}>{t('explore.viewAll')}</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#FF5A5F" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.sectionSubtitle}>{t('explore.localGuidesSubtitle')}</Text>
          
          <View style={styles.guidesList}>
            {LOCAL_GUIDES.map((guide, index) => React.cloneElement(renderGuideCard({ item: guide, index }), { key: guide.id || index }))}
          </View>
        </View>
      </Animated.ScrollView>
      
      {/* Map Floating Button */}
      <TouchableOpacity
        style={styles.mapButton}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('MapScreen')}
      >
        <View style={styles.mapButtonInner}>
          <MaterialIcons name="map" size={20} color="#FFFFFF" />
          <Text style={styles.mapButtonText}>{t('map.title')}</Text>
        </View>
      </TouchableOpacity>
      
      {/* Filters Modal */}
      <SearchFiltersModal
        visible={showFiltersModal}
        onDismiss={toggleFiltersModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: SEARCH_BAR_HEIGHT - 16,
    backgroundColor: '#F7F7F7',
    borderRadius: 30,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    color: '#717171',
    fontSize: 15,
  },
  filterButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  categoriesSection: {
    marginVertical: 8,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    alignItems: 'center',
    width: 70,
    marginRight: 16,
  },
  categoryButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  activeCategoryButton: {
    backgroundColor: '#FF5A5F',
    borderColor: '#FF5A5F',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#717171',
    textAlign: 'center',
  },
  activeCategoryLabel: {
    color: '#FF5A5F',
    fontWeight: 'bold',
  },
  resultsCountContainer: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  resultsCount: {
    fontSize: 14,
    color: '#717171',
  },
  propertiesSection: {
    paddingHorizontal: 20,
  },
  propertiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  cardWrapper: {
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  propertyCard: {
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF5A5F',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  propertyInfo: {
    padding: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222222',
    marginLeft: 4,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222222',
    marginBottom: 4,
  },
  detailsText: {
    fontSize: 14,
    color: '#717171',
  },
  priceContainer: {
    marginTop: 8,
  },
  priceText: {
    fontSize: 15,
  },
  priceBold: {
    fontWeight: 'bold',
    color: '#222222',
  },
  priceUnit: {
    fontWeight: 'normal',
    color: '#717171',
  },
  guidesSection: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#F8F8F8',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222222',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#717171',
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF5A5F',
    marginRight: 4,
  },
  guidesList: {
    marginTop: 16,
  },
  guideCardContainer: {
    marginBottom: 16,
  },
  guideCard: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 180,
  },
  guideImage: {
    width: '100%',
    height: '100%',
  },
  guideContentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  guideIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF5A5F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  guideContent: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  guideDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#717171',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  resetButton: {
    borderRadius: 8,
  },
  loaderContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  mapButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: '#222222',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  }
});

export default ExplorerScreen; 