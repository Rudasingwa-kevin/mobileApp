import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StatusBar,
  SafeAreaView,
  TextInput,
  ScrollView
} from 'react-native';
import { Text, Button, useTheme, Searchbar, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import PropertyCard from '../components/PropertyCard';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useSearchStore } from '../store/search';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Catégories d'exploration
const exploreCategories = [
  { id: 'apartments', name: 'Appartements', icon: 'apartment' },
  { id: 'houses', name: 'Maisons', icon: 'home' },
  { id: 'affordable', name: 'Économiques', icon: 'cash-outline' },
  { id: 'luxury', name: 'Luxe', icon: 'diamond-outline' },
  { id: 'lakeside', name: 'Bord du lac', icon: 'water-outline' },
  { id: 'new', name: 'Nouveautés', icon: 'star-outline' },
];

// Catégories style voyage (ajoutées depuis SearchScreen)
const travelCategories = [
  { id: 'vue', name: 'Avec vue', icon: 'image-outline' },
  { id: 'design', name: 'Design', icon: 'home' },
  { id: 'chambres', name: 'Chambres', icon: 'bed-outline' },
  { id: 'lac', name: 'Bord de lac', icon: 'water-outline' },
  { id: 'iles', name: 'Îles', icon: 'map-outline' },
];

// Données simulées
const mockListings = [
  {
    id: '1',
    title: 'Studio moderne au bord du lac Kivu',
    price: 45000,
    currency: 'RWF',
    images: ['https://a0.muscache.com/im/pictures/miso/Hosting-47971380/original/a924a493-6c82-468d-8df7-3b0ca17d89d3.jpeg'],
    location: { city: 'Gisenyi', district: 'Rubavu' },
    rating: 4.8,
    reviews: 24,
  },
  {
    id: '2',
    title: 'Appartement familial avec vue panoramique',
    price: 65000,
    currency: 'RWF',
    images: ['https://a0.muscache.com/im/pictures/miso/Hosting-826494959841460145/original/d0e6368d-bab0-4394-9947-a5662e6fcd81.jpeg'],
    location: { city: 'Gisenyi', district: 'Centre-ville' },
    rating: 4.9,
    reviews: 36,
  },
  {
    id: '3',
    title: 'Maison charmante près de la plage',
    price: 78000,
    currency: 'RWF',
    images: ['https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/0da70267-d9da-4efb-9123-2714b651c9fd.jpeg'],
    location: { city: 'Gisenyi', district: 'Rubavu' },
    rating: 4.7,
    reviews: 19,
  },
  {
    id: '4',
    title: 'Logement économique pour étudiants',
    price: 32000,
    currency: 'RWF',
    images: ['https://a0.muscache.com/im/pictures/7db51ae5-3848-4c1a-a9e0-6ee11902cbeb.jpg'],
    location: { city: 'Gisenyi', district: 'Université' },
    rating: 4.5,
    reviews: 42,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const theme = useTheme();
  const { listings, fetchListings } = useSearchStore();
  
  const [selectedCategory, setSelectedCategory] = useState('apartments');
  const [selectedTravelCategory, setSelectedTravelCategory] = useState('vue');
  
  useEffect(() => {
    fetchListings();
  }, []);
  
  const handleViewProperty = (propertyId: string) => {
    navigation.navigate('PropertyDetails', { propertyId });
  };

  const handleOpenMap = () => {
    navigation.navigate('MapScreen');
  };

  const renderCategoryItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View 
      entering={FadeIn.delay(index * 50).duration(300)} 
      style={styles.categoryItemContainer}
    >
      <TouchableOpacity
        style={[
          styles.categoryItem,
          selectedCategory === item.id && styles.selectedCategoryItem
        ]}
        onPress={() => setSelectedCategory(item.id)}
      >
        <Ionicons
          name={item.icon}
          size={22}
          color={selectedCategory === item.id ? colors.primary : colors.gray[600]}
        />
        <Text
          style={[
            styles.categoryLabel,
            selectedCategory === item.id && styles.selectedCategoryLabel
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
  
  const renderTravelCategoryItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View 
      entering={FadeIn.delay(index * 100)} 
      style={styles.travelCategoryItemContainer}
    >
      <TouchableOpacity
        style={[
          styles.travelCategoryItem,
          selectedTravelCategory === item.id && styles.selectedTravelCategoryItem
        ]}
        onPress={() => setSelectedTravelCategory(item.id)}
      >
        <Ionicons
          name={item.icon}
          size={24}
          color={selectedTravelCategory === item.id ? colors.black : colors.gray[600]}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.travelCategoryLabel,
          selectedTravelCategory === item.id && styles.selectedTravelCategoryLabel
        ]}
      >
        {item.name}
      </Text>
    </Animated.View>
  );

  const renderPropertyItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View 
      entering={FadeInDown.delay(100 + index * 100).duration(400)}
      style={styles.propertyCardContainer}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleViewProperty(item.id)}
      >
        <Image 
          source={{ uri: item.images[0] }} 
          style={styles.propertyImage}
          resizeMode="cover"
        />
        
        <TouchableOpacity style={styles.heartButton}>
          <Ionicons name="heart-outline" size={22} color={colors.white} />
        </TouchableOpacity>

        <View style={styles.propertyDetails}>
          <View style={styles.locationRatingRow}>
            <Text style={styles.locationText}>{item.location.district}, {item.location.city}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color={colors.black} />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
          
          <Text style={styles.propertyTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.distanceText}>À 5 kilomètres du centre</Text>
          <Text style={styles.dateText}>Disponible dès maintenant</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              <Text style={styles.priceBold}>{item.price} {item.currency}</Text>
              <Text style={styles.priceUnit}> par nuit</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      <View style={styles.header}>
        {/* Barre de recherche */}
        <Animated.View 
          entering={FadeIn.duration(300)}
          style={styles.searchContainer}
        >
          <TouchableOpacity style={styles.searchBar}>
            <Ionicons name="search" size={20} color={colors.gray[700]} style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>Où cherchez-vous à Gisenyi?</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Bouton de la carte */}
        <TouchableOpacity 
          style={styles.mapButton}
          onPress={handleOpenMap}
        >
          <Ionicons name="map-outline" size={22} color={colors.gray[800]} />
        </TouchableOpacity>
        
        {/* Bouton des guides locaux */}
        <TouchableOpacity 
          style={styles.guideButton}
          onPress={() => navigation.navigate('LocalGuide')}
        >
          <Ionicons name="book-outline" size={22} color={colors.gray[800]} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Catégories */}
        <Animated.View entering={FadeIn.duration(300).delay(100)}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {exploreCategories.map((item, index) => renderCategoryItem({ item, index }))}
          </ScrollView>
        </Animated.View>

        {/* Bannière promotionnelle */}
        <Animated.View 
          entering={FadeIn.duration(400).delay(200)} 
          style={styles.promoContainer}
        >
          <Image 
            source={{ uri: 'https://a0.muscache.com/im/pictures/a27abca7-d2c8-4787-b487-4df663a4ec30.jpg' }} 
            style={styles.promoBanner}
            resizeMode="cover"
          />
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Découvrez Gisenyi</Text>
            <Text style={styles.promoText}>Trouvez les meilleurs logements au bord du lac Kivu</Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Explorer</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        {/* Catégories de voyage (ajoutées depuis SearchScreen) */}
        <Animated.View entering={FadeIn.duration(300).delay(300)}>
          <Text style={styles.sectionTitle}>Voyages</Text>
          <FlatList
            data={travelCategories}
            renderItem={renderTravelCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.travelCategoriesContainer}
          />
        </Animated.View>
        
        {/* Tag "tous les frais compris" */}
        <Animated.View 
          entering={FadeIn.duration(300).delay(350)}
          style={styles.tagContainer}
        >
          <View style={styles.pricingTag}>
            <Ionicons name="pricetag" size={14} color={colors.primary} />
            <Text style={styles.pricingTagText}>Les prix comprennent tous les frais</Text>
          </View>
        </Animated.View>

        {/* Section des logements */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Logements recommandés</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {/* Liste des propriétés */}
        <View style={styles.propertiesContainer}>
          {mockListings.map((item, index) => renderPropertyItem({ item, index }))}
        </View>
        
        {/* Propriétés de recherche (ajoutées depuis SearchScreen) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pour vos voyages</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.propertiesContainer}>
          {listings.length > 0 && listings.slice(0, 2).map((property, index) => (
            <Animated.View 
              key={property.id}
              entering={FadeInDown.delay(300 + index * 100)}
              style={styles.propertyCardContainer}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handleViewProperty(property.id)}
              >
                <View style={styles.featuredBadge}>
                  <Ionicons name="trophy" size={15} color={colors.white} />
                  <Text style={styles.featuredBadgeText}>Coup de cœur voyageurs</Text>
                </View>
                
                <Image 
                  source={{ uri: property.images[0] }} 
                  style={styles.propertyImage}
                  resizeMode="cover"
                />
                
                <View style={styles.heartButton}>
                  <Ionicons name="heart-outline" size={22} color={colors.white} />
                </View>

                <View style={styles.propertyDetails}>
                  <View style={styles.locationRatingRow}>
                    <Text style={styles.locationText}>{property.location.city}, Rwanda</Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={14} color={colors.black} />
                      <Text style={styles.ratingText}>4,92</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.distanceText}>À 5 kilomètres</Text>
                  <Text style={styles.dateText}>11-16 juin</Text>
                  
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>
                      <Text style={styles.priceBold}>{property.price} {property.currency}</Text>
                      <Text style={styles.priceUnit}> par nuit</Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
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
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  searchContainer: {
    flex: 1,
    marginRight: spacing[2],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 24,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    ...shadows.sm,
  },
  searchIcon: {
    marginRight: spacing[2],
  },
  searchPlaceholder: {
    fontSize: typography.fontSize.base,
    color: colors.gray[600],
    fontWeight: '400',
  },
  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  guideButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[200],
    marginLeft: spacing[2],
  },
  scrollContent: {
    paddingBottom: spacing[16],
  },
  categoriesContainer: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  categoryItemContainer: {
    marginRight: spacing[5],
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  selectedCategoryItem: {
    backgroundColor: colors.gray[50],
    borderColor: colors.primary,
  },
  categoryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
    marginLeft: spacing[1],
  },
  selectedCategoryLabel: {
    color: colors.primary,
    fontWeight: '500',
  },
  // Styles pour les catégories de voyage (ajoutés depuis SearchScreen)
  travelCategoriesContainer: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  travelCategoryItemContainer: {
    alignItems: 'center',
    marginRight: spacing[6],
  },
  travelCategoryItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginBottom: spacing[2],
    ...shadows.xs,
  },
  selectedTravelCategoryItem: {
    backgroundColor: colors.gray[50],
  },
  travelCategoryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
    textAlign: 'center',
  },
  selectedTravelCategoryLabel: {
    color: colors.black,
    fontWeight: '500',
  },
  tagContainer: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
  },
  pricingTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.tag,
    alignSelf: 'flex-start',
  },
  pricingTagText: {
    fontSize: typography.fontSize.sm,
    color: colors.black,
    marginLeft: spacing[1],
  },
  promoContainer: {
    margin: spacing[4],
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  promoBanner: {
    width: '100%',
    height: 180,
  },
  promoContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing[4],
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  promoTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing[1],
  },
  promoText: {
    fontSize: typography.fontSize.base,
    fontWeight: '400',
    color: colors.white,
    marginBottom: spacing[3],
  },
  promoButton: {
    backgroundColor: colors.white,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    color: colors.black,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    marginVertical: spacing[4],
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.gray[800],
  },
  seeAllText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.primary,
  },
  propertiesContainer: {
    paddingHorizontal: spacing[4],
  },
  propertyCardContainer: {
    marginBottom: spacing[6],
  },
  propertyImage: {
    width: '100%',
    height: 250,
    borderRadius: borderRadius.lg,
  },
  heartButton: {
    position: 'absolute',
    top: spacing[3],
    right: spacing[3],
    zIndex: 10,
  },
  featuredBadge: {
    position: 'absolute',
    top: spacing[3],
    left: spacing[3],
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  featuredBadgeText: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    marginLeft: spacing[1],
  },
  propertyDetails: {
    paddingTop: spacing[2],
  },
  locationRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.black,
  },
  propertyTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '400',
    color: colors.gray[700],
    marginTop: spacing[1],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: typography.fontSize.sm,
    color: colors.black,
    marginLeft: 2,
  },
  distanceText: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
    marginTop: spacing[1],
  },
  dateText: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
    marginTop: spacing[1],
  },
  priceContainer: {
    marginTop: spacing[2],
  },
  priceText: {
    fontSize: typography.fontSize.base,
    color: colors.black,
  },
  priceBold: {
    fontWeight: '600',
  },
  priceUnit: {
    fontWeight: 'normal',
  },
});

export default HomeScreen; 