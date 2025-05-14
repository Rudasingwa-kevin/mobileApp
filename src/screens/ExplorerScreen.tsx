import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  StatusBar,
  ImageBackground,
  Animated as RNAnimated,
  SafeAreaView,
  Platform,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { SegmentedButtons } from 'react-native-paper';

// Components
import SearchBar from '../components/SearchBar';
import CategoryButton from '../components/CategoryButton';
import SectionTitle from '../components/SectionTitle';
import GridListingCard from '../components/GridListingCard';
import EditorialCard from '../components/EditorialCard';

// Types
import { RootStackParamList } from '../types';

// Data & State
import { exploreCategories, exploreListings, editorialSections } from '../data/exploreListings';
import { useExploreFilters } from '../store/exploreFilters';

type ExplorerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HEADER_MAX_HEIGHT = 350;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ExplorerScreen = () => {
  const navigation = useNavigation<ExplorerScreenNavigationProp>();
  const scrollY = useRef(new RNAnimated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [priceDisplayMode, setPriceDisplayMode] = useState<'nightly' | 'monthly'>('monthly');
  
  // Filters state
  const { filters, setSelectedCategory } = useExploreFilters();
  
  // Header animations
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });
  
  const searchBarOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });
  
  // Handle category selection
  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(filters.selectedCategory === categoryId ? null : categoryId);
  };

  // Handle property card press
  const handlePropertyPress = (propertyId: string) => {
    navigation.navigate('PropertyDetails', { propertyId });
  };
  
  // Handle search bar press
  const handleSearchPress = () => {
    navigation.navigate('Search');
  };
  
  // Handle editorial card press
  const handleEditorialPress = (type: string) => {
    // TODO: Navigate to appropriate screen based on type
    console.log(`Navigate to ${type} screen`);
  };
  
  // Scroll to top handler
  const handleScrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };
  
  // Filter listings based on selected category
  const filteredListings = filters.selectedCategory
    ? exploreListings.filter(listing => {
        switch (filters.selectedCategory) {
          case 'lake':
            return listing.nearLake;
          case 'furnished':
            return listing.furnished;
          case 'affordable':
            return listing.affordable;
          case 'longTerm':
            return listing.longTerm;
          case 'students':
            return listing.forStudents;
          case 'new':
            return true; // Assume all listings in our mock data are "new"
          default:
            return true;
        }
      })
    : exploreListings;
  
  // Featured listings
  const featuredListings = exploreListings.filter(listing => listing.featured);
  
  // Logements longue durée
  const longTermListings = exploreListings.filter(listing => listing.longTerm);
  
  // Logements pour étudiants
  const studentListings = exploreListings.filter(listing => listing.forStudents);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent 
      />
      
      {/* Fixed search bar that shows on scroll */}
      <RNAnimated.View 
        style={[
          styles.fixedSearchContainer, 
          { opacity: searchBarOpacity }
        ]}
      >
        <SearchBar onPress={handleSearchPress} />
      </RNAnimated.View>
      
      {/* Header with background image */}
      <RNAnimated.View style={[styles.header, { height: headerHeight }]}>
        <ImageBackground
          source={{ uri: 'https://a0.muscache.com/im/pictures/e25a9b25-fa98-4160-bfd1-039287bf38b6.jpg' }}
          style={styles.headerImage}
        >
          <RNAnimated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
            <Text style={styles.headerTitle}>Trouvez votre logement à Gisenyi</Text>
            <Text style={styles.headerSubtitle}>Court séjour ou résidence longue durée</Text>
            <TouchableOpacity style={styles.headerButton}>
              <Text style={styles.headerButtonText}>Explorer</Text>
            </TouchableOpacity>
          </RNAnimated.View>
        </ImageBackground>
      </RNAnimated.View>
      
      {/* Main content */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={RNAnimated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { 
            useNativeDriver: false,
            listener: (event) => {
              const offsetY = event.nativeEvent.contentOffset.y;
              setShowScrollTop(offsetY > HEADER_SCROLL_DISTANCE * 2);
            }
          }
        )}
      >
        {/* Search bar (visible at top of content) */}
        <View style={styles.searchContainer}>
          <SearchBar onPress={handleSearchPress} />
        </View>
        
        {/* Prix par nuit ou par mois */}
        <Animated.View 
          entering={FadeIn.duration(400)}
          style={styles.priceToggleContainer}
        >
          <Text style={styles.priceToggleLabel}>Affichage des prix :</Text>
          <SegmentedButtons
            value={priceDisplayMode}
            onValueChange={(value) => setPriceDisplayMode(value as 'nightly' | 'monthly')}
            buttons={[
              { value: 'nightly', label: 'Par nuit', key: 'nightly' },
              { value: 'monthly', label: 'Par mois', key: 'monthly' }
            ]}
            style={styles.segmentedButtons}
          />
        </Animated.View>
        
        {/* Categories section */}
        <Animated.View 
          entering={FadeIn.duration(400)}
          style={styles.categoriesContainer}
        >
          <FlatList
            data={exploreCategories}
            renderItem={({ item, index }) => (
              <CategoryButton
                category={item}
                isSelected={filters.selectedCategory === item.id}
                onPress={handleCategoryPress}
                index={index}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </Animated.View>
        
        {/* Featured properties section */}
        <Animated.View 
          entering={FadeInUp.delay(200).duration(400)}
          style={styles.section}
        >
          <SectionTitle 
            title="À découvrir à Gisenyi" 
            subtitle={priceDisplayMode === 'monthly' 
              ? "Logements de qualité à prix mensuel" 
              : "Découvrez les meilleurs logements disponibles"}
            actionText="Voir tout"
            onActionPress={() => navigation.navigate('Search')}
          />
          
          {filteredListings.length > 0 ? (
            <View style={styles.gridContainer}>
              {filteredListings.map((listing, index) => (
                <GridListingCard
                  key={listing.id}
                  listing={listing}
                  onPress={handlePropertyPress}
                  index={index}
                  displayMode={priceDisplayMode}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="alert-circle-outline" size={48} color={colors.gray[400]} />
              <Text style={styles.emptyText}>
                Aucun logement ne correspond à cette catégorie
              </Text>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={() => setSelectedCategory(null)}
              >
                <Text style={styles.resetButtonText}>Réinitialiser les filtres</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
        
        {/* Longue durée section */}
        {!filters.selectedCategory && longTermListings.length > 0 && (
          <Animated.View 
            entering={FadeInUp.delay(250).duration(400)}
            style={styles.section}
          >
            <SectionTitle 
              title="Locations longue durée" 
              subtitle="Parfait pour les expatriés et résidents"
              actionText="Voir tout"
              onActionPress={() => setSelectedCategory('longTerm')}
            />
            
            <View style={styles.gridContainer}>
              {longTermListings.slice(0, 4).map((listing, index) => (
                <GridListingCard
                  key={listing.id}
                  listing={listing}
                  onPress={handlePropertyPress}
                  index={index}
                  displayMode="monthly"
                />
              ))}
            </View>
            
            {longTermListings.length > 4 && (
              <TouchableOpacity 
                style={styles.viewMoreButton}
                onPress={() => setSelectedCategory('longTerm')}
              >
                <Text style={styles.viewMoreText}>Voir plus de logements longue durée</Text>
                <Ionicons name="chevron-forward" size={14} color={colors.primary} />
              </TouchableOpacity>
            )}
          </Animated.View>
        )}
        
        {/* Étudiants section */}
        {!filters.selectedCategory && studentListings.length > 0 && (
          <Animated.View 
            entering={FadeInUp.delay(300).duration(400)}
            style={styles.section}
          >
            <SectionTitle 
              title="Logements pour étudiants" 
              subtitle="Options économiques près du campus"
              actionText="Voir tout"
              onActionPress={() => setSelectedCategory('students')}
            />
            
            <View style={styles.gridContainer}>
              {studentListings.slice(0, 4).map((listing, index) => (
                <GridListingCard
                  key={listing.id}
                  listing={listing}
                  onPress={handlePropertyPress}
                  index={index}
                  displayMode="monthly"
                />
              ))}
            </View>
          </Animated.View>
        )}
        
        {/* Map preview section */}
        <Animated.View
          entering={FadeInUp.delay(350).duration(400)}
          style={styles.section}
        >
          <SectionTitle 
            title="Explorer sur la carte" 
            subtitle="Découvrez les logements par quartier"
          />
          
          <TouchableOpacity 
            style={styles.mapPreviewContainer}
            onPress={() => navigation.navigate('MapScreen')}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: 'https://a0.muscache.com/im/pictures/f0862a09-cb75-4e9d-9aed-58ae728b2f74.jpg' }}
              style={styles.mapPreview}
              resizeMode="cover"
            />
            <View style={styles.mapButtonContainer}>
              <TouchableOpacity style={styles.mapButton}>
                <Ionicons name="map-outline" size={20} color={colors.gray[800]} />
                <Text style={styles.mapButtonText}>Afficher sur la carte</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
        
        {/* Editorial section */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(400)}
          style={styles.section}
        >
          <SectionTitle 
            title="Guides et informations pratiques"
            subtitle="Conseils pour bien vivre et s'installer à Gisenyi"
          />
          
          {editorialSections.map((section, index) => (
            <EditorialCard
              key={section.id}
              title={section.title}
              description={section.description}
              image={section.image}
              onPress={() => handleEditorialPress(section.type)}
              index={index}
            />
          ))}
        </Animated.View>
      </ScrollView>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <TouchableOpacity 
          style={styles.scrollTopButton}
          onPress={handleScrollToTop}
        >
          <Ionicons name="chevron-up" size={24} color={colors.gray[800]} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 1,
  },
  headerImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[4],
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: typography.fontSize.xl2,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  headerSubtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  headerButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.full,
  },
  headerButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.base,
    fontWeight: '600',
  },
  fixedSearchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === 'ios' ? 45 : 30,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingTop: HEADER_MAX_HEIGHT,
    paddingBottom: spacing[6],
  },
  searchContainer: {
    marginTop: -spacing[8],
    marginBottom: spacing[2],
  },
  priceToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing[4],
    marginBottom: spacing[2],
  },
  priceToggleLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[700],
    marginRight: spacing[2],
  },
  segmentedButtons: {
    maxWidth: 220,
    backgroundColor: colors.white,
  },
  categoriesContainer: {
    marginVertical: spacing[2],
  },
  categoriesList: {
    paddingHorizontal: spacing[4],
  },
  section: {
    marginTop: spacing[6],
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
  },
  emptyContainer: {
    alignItems: 'center',
    padding: spacing[6],
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.gray[600],
    textAlign: 'center',
    marginTop: spacing[2],
    marginBottom: spacing[4],
  },
  resetButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.full,
  },
  resetButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[3],
    marginTop: spacing[2],
  },
  viewMoreText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
    marginRight: spacing[1],
  },
  mapPreviewContainer: {
    marginHorizontal: spacing[4],
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    height: 200,
    ...shadows.md,
  },
  mapPreview: {
    width: '100%',
    height: '100%',
  },
  mapButtonContainer: {
    position: 'absolute',
    bottom: spacing[4],
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.full,
    ...shadows.md,
  },
  mapButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.gray[800],
    marginLeft: spacing[1],
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: spacing[6],
    right: spacing[4],
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
});

export default ExplorerScreen; 