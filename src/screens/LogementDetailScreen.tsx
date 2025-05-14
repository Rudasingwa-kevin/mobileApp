import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Linking, Share, Platform, StatusBar, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Text, Button, Chip, ActivityIndicator, IconButton, Divider, Surface, useTheme, SegmentedButtons } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, SlideInUp } from 'react-native-reanimated';
import MapView, { Marker } from 'react-native-maps';

// Hooks et composants personnalisés
import useListingById from '../hooks/useListingById';
import { usePreferences } from '../store/preferences';
import ImageCarousel from '../components/ImageCarousel';
import AmenityTag from '../components/AmenityTag';
import SectionTitle from '../components/SectionTitle';
import FavoriteButton from '../components/FavoriteButton';
import { useFavoritesStore } from '../store/favorites';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import useReviewsStore from '../store/reviews';
import ReviewCard from '../components/ReviewCard';
import RatingStars from '../components/RatingStars';

// Images mockées pour le carousel
const mockImages = [
  'https://images.unsplash.com/photo-1574362848149-11496d93a7c7',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
];

type LogementDetailRouteProp = RouteProp<RootStackParamList, 'PropertyDetails'>;
type LogementDetailNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LogementDetailScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<LogementDetailNavigationProp>();
  const route = useRoute<LogementDetailRouteProp>();
  const { propertyId } = route.params;
  const { currency } = usePreferences();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { getAverageRating, getReviewsForProperty, getSortedReviews } = useReviewsStore();
  
  // États locaux
  const [priceMode, setPriceMode] = useState('monthly'); // 'nightly' ou 'monthly'
  
  // États pour les avis
  const [reviewSortOrder, setReviewSortOrder] = useState<'recent' | 'highest' | 'lowest'>('recent');
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  // Récupération des données du logement
  const { listing, isLoading, error } = useListingById(propertyId);
  
  // Gestion des favoris
  const handleFavoriteToggle = () => {
    if (!listing) return;
    
    if (isFavorite(propertyId)) {
      removeFavorite(propertyId);
    } else {
      addFavorite(listing);
    }
  };

  // Formatage du prix avec la devise choisie
  const formatPrice = (price: number, originalCurrency: string) => {
    let convertedPrice = price;
    let symbol = '';
    
    // Simuler la conversion de devise
    if (originalCurrency !== currency) {
      // Taux de conversion simulés
      const rates = {
        RWF: { USD: 0.00085, EUR: 0.00079 },
        USD: { RWF: 1176.47, EUR: 0.93 },
        EUR: { RWF: 1265.82, USD: 1.07 }
      };
      
      // Convertir depuis la devise originale vers la devise choisie
      if (originalCurrency in rates && currency in rates[originalCurrency as keyof typeof rates]) {
        const rate = rates[originalCurrency as keyof typeof rates][currency as keyof typeof rates[typeof originalCurrency]];
        convertedPrice = Math.round(price * rate);
      }
    }
    
    // Symbole de la devise
    switch (currency) {
      case 'RWF':
        symbol = 'FRw';
        break;
      case 'USD':
        symbol = '$';
        break;
      case 'EUR':
        symbol = '€';
        break;
    }
    
    // Format du prix selon la devise
    return currency === 'RWF' 
      ? `${convertedPrice.toLocaleString()} ${symbol}`
      : `${symbol}${convertedPrice.toLocaleString()}`;
  };

  // Calcul du prix mensuel (pour l'exemple - dans un cas réel, cela viendrait de l'API)
  const calculateMonthlyPrice = (nightlyPrice: number) => {
    return Math.round(nightlyPrice * 25); // Approximation
  };

  // Partager l'annonce
  const handleShare = async () => {
    if (!listing) return;
    
    try {
      await Share.share({
        title: listing.title,
        message: `Découvrez ce logement à ${listing.location.city}: ${listing.title} - ${formatPrice(listing.price, listing.currency)}/${priceMode === 'monthly' ? 'mois' : 'nuit'} - LocaMap`,
      });
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  };

  // Contacter le propriétaire
  const handleContact = () => {
    if (!listing?.owner) return;
    
    // Navigate to the NewMessage screen to contact the owner
    navigation.navigate('NewMessage', {
      propertyId: listing.id,
      propertyTitle: listing.title,
      ownerId: listing.owner.id,
      ownerName: listing.owner.name,
      ownerAvatar: listing.owner.avatar || 'https://a0.muscache.com/defaults/user_pic-50x50.png?v=3'
    });
  };

  // Ouvrir la position sur la carte
  const handleViewOnMap = () => {
    // Navigation vers MapScreen
    navigation.navigate('MapScreen');
  };

  // Récupérer les avis pour ce logement
  const propertyReviews = getSortedReviews(propertyId, reviewSortOrder);
  const averageRating = getAverageRating(propertyId);
  
  // Fonction pour aller à l'écran de publication d'avis
  const handleLeaveReview = () => {
    if (!listing) return;
    
    navigation.navigate('LeaveReview', {
      propertyId: listing.id,
      propertyTitle: listing.title,
      ownerId: listing.owner?.id || 'unknown',
      ownerName: listing.owner?.name || 'Propriétaire',
    });
  };
  
  // Filtrer les avis à afficher (limité ou tous)
  const displayedReviews = showAllReviews 
    ? propertyReviews 
    : propertyReviews.slice(0, 3);

  // Indicateur de chargement
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Chargement des détails...</Text>
      </View>
    );
  }

  // Gestion des erreurs
  if (error || !listing) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={64} color="#e57373" />
        <Text style={styles.errorText}>{error || 'Erreur inconnue'}</Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.goBack()}
          style={{ marginTop: 20 }}
        >
          Retour
        </Button>
      </View>
    );
  }

  // Déterminer si le logement est adapté pour certains types de locataires
  const isSuitableForStudents = listing.amenities.some(a => 
    a.toLowerCase().includes('bureau') || 
    a.toLowerCase().includes('wifi') || 
    a.toLowerCase().includes('étude')
  );
  
  const isLongTermFriendly = listing.size >= 40 && listing.bedrooms >= 1;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header avec bouton retour */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.gray[800]} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerActionButton}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={22} color={colors.gray[800]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerActionButton}>
            <FavoriteButton
              propertyId={propertyId}
              onPress={handleFavoriteToggle}
              size={22}
              showBackground={false}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Carousel d'images */}
        <View style={styles.carouselContainer}>
          <ImageCarousel 
            images={listing.images.length > 0 ? mockImages : []} 
            height={280}
          />
          
          {/* Badge disponibilité */}
          <Animated.View 
            entering={SlideInUp.duration(400).delay(200)}
            style={styles.availabilityBadgeContainer}
          >
            <Surface style={[
              styles.availabilityBadge, 
              { 
                backgroundColor: listing.available 
                  ? '#e6f7ed' 
                  : '#ffeded',
                borderColor: listing.available 
                  ? '#4acf8c' 
                  : '#f27272' 
              }
            ]}>
              <MaterialIcons 
                name={listing.available ? "check-circle" : "cancel"} 
                size={18} 
                color={listing.available ? '#4acf8c' : '#f27272'} 
              />
              <Text style={[
                styles.availabilityText,
                { color: listing.available ? '#1f9d58' : '#d42e2e' }
              ]}>
                {listing.available ? 'Disponible' : 'Indisponible'}
              </Text>
            </Surface>
          </Animated.View>
        </View>

        {/* Informations principales */}
        <Animated.View 
          entering={FadeInUp.duration(400)}
          style={styles.mainInfoContainer}
        >
          <Text style={styles.title}>{listing.title}</Text>
          
          <View style={styles.locationRow}>
            <MaterialIcons name="place" size={20} color={colors.gray[600]} />
            <Text style={styles.location}>
              {listing.location.district ? `${listing.location.district}, ` : ''}
              {listing.location.city}
            </Text>
          </View>
          
          {/* Type de logement et contrat */}
          <View style={styles.contractTypeContainer}>
            <Chip 
              style={styles.typeChip} 
              textStyle={styles.typeChipText}
            >
              {listing.type || 'Logement'}
            </Chip>
            
            <Chip 
              style={[styles.typeChip, styles.contractChip]} 
              textStyle={styles.typeChipText}
              icon="calendar-range"
            >
              Court et long terme
            </Chip>
          </View>
          
          {/* Options de prix (nuit/mois) */}
          <View style={styles.priceOptionsContainer}>
            <SegmentedButtons
              value={priceMode}
              onValueChange={setPriceMode}
              buttons={[
                { value: 'nightly', label: 'Par nuit' },
                { value: 'monthly', label: 'Par mois' }
              ]}
              style={styles.segmentedButtons}
            />
          </View>
          
          {/* Affichage du prix */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {priceMode === 'nightly' 
                ? formatPrice(listing.price, listing.currency)
                : formatPrice(calculateMonthlyPrice(listing.price), listing.currency)}
              <Text style={styles.priceUnit}>
                {priceMode === 'nightly' ? '/nuit' : '/mois'}
              </Text>
            </Text>
          </View>
          
          {/* Badges pour les types de séjour adaptés */}
          <View style={styles.suitableForContainer}>
            {isLongTermFriendly && (
              <View style={styles.suitableBadge}>
                <MaterialIcons name="home" size={16} color={colors.primary} />
                <Text style={styles.suitableText}>Idéal pour long séjour</Text>
              </View>
            )}
            
            {isSuitableForStudents && (
              <View style={styles.suitableBadge}>
                <MaterialIcons name="school" size={16} color={colors.primary} />
                <Text style={styles.suitableText}>Adapté aux étudiants</Text>
              </View>
            )}
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MaterialIcons name="king-bed" size={22} color={colors.primary} />
              <Text style={styles.infoText}>
                {listing.bedrooms} {listing.bedrooms > 1 ? 'chambres' : 'chambre'}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialIcons name="bathtub" size={22} color={colors.primary} />
              <Text style={styles.infoText}>
                {listing.bathrooms} {listing.bathrooms > 1 ? 'salles de bain' : 'salle de bain'}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialIcons name="straighten" size={22} color={colors.primary} />
              <Text style={styles.infoText}>{listing.size} m²</Text>
            </View>
          </View>
        </Animated.View>

        <Divider style={styles.divider} />

        {/* Description */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(100)}
          style={styles.section}
        >
          <SectionTitle 
            title="À propos" 
            icon="info-outline"
          />
          
          <Text style={styles.description}>{listing.description}</Text>
        </Animated.View>

        <Divider style={styles.divider} />

        {/* Conditions de location */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(150)}
          style={styles.section}
        >
          <SectionTitle 
            title="Conditions de location" 
            icon="description"
          />
          
          <View style={styles.contractDetailsContainer}>
            <View style={styles.contractDetailItem}>
              <MaterialIcons name="timer" size={20} color={colors.primary} />
              <View>
                <Text style={styles.contractDetailTitle}>Durée minimum</Text>
                <Text style={styles.contractDetailText}>1 mois recommandé</Text>
              </View>
            </View>
            
            <View style={styles.contractDetailItem}>
              <MaterialIcons name="account-balance-wallet" size={20} color={colors.primary} />
              <View>
                <Text style={styles.contractDetailTitle}>Caution</Text>
                <Text style={styles.contractDetailText}>{formatPrice(listing.price * 2, listing.currency)}</Text>
              </View>
            </View>
            
            <View style={styles.contractDetailItem}>
              <MaterialIcons name="event-available" size={20} color={colors.primary} />
              <View>
                <Text style={styles.contractDetailTitle}>Préavis</Text>
                <Text style={styles.contractDetailText}>15 jours (court terme), 1 mois (long terme)</Text>
              </View>
            </View>
            
            <View style={styles.contractDetailItem}>
              <MaterialIcons name="attach-money" size={20} color={colors.primary} />
              <View>
                <Text style={styles.contractDetailTitle}>Charges incluses</Text>
                <Text style={styles.contractDetailText}>Eau, électricité (jusqu'à 100 kWh/mois)</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Divider style={styles.divider} />

        {/* Commodités */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(200)}
          style={styles.section}
        >
          <SectionTitle 
            title="Commodités" 
            icon="hotel-class"
          />
          
          <View style={styles.amenitiesContainer}>
            {listing.amenities.map((amenity, index) => (
              <AmenityTag key={index} label={amenity} />
            ))}
          </View>
        </Animated.View>

        <Divider style={styles.divider} />

        {/* Localisation sur la carte */}
        {listing.location.coordinates && (
          <Animated.View 
            entering={FadeInUp.duration(400).delay(300)}
            style={styles.section}
          >
            <SectionTitle 
              title="Localisation" 
              icon="place"
            />
            
            <View style={styles.mapContainer}>
              <View style={styles.mapWrapper}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: listing.location.coordinates.latitude,
                    longitude: listing.location.coordinates.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  zoomEnabled={false}
                  rotateEnabled={false}
                  scrollEnabled={false}
                >
                  <Marker
                    coordinate={{
                      latitude: listing.location.coordinates.latitude,
                      longitude: listing.location.coordinates.longitude,
                    }}
                    title={listing.title}
                    description={listing.location.address}
                  />
                </MapView>
              </View>
              
              <TouchableOpacity 
                style={styles.viewOnMapButton}
                onPress={handleViewOnMap}
              >
                <Text style={styles.viewOnMapText}>Afficher sur la carte</Text>
                <MaterialIcons name="arrow-forward" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        <Divider style={styles.divider} />

        {/* Services à proximité */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(350)}
          style={styles.section}
        >
          <SectionTitle 
            title="Services à proximité" 
            icon="location-city"
          />
          
          <View style={styles.nearbyServicesContainer}>
            <View style={styles.nearbyService}>
              <MaterialIcons name="school" size={18} color={colors.gray[700]} />
              <Text style={styles.nearbyServiceText}>Université (500m)</Text>
            </View>
            
            <View style={styles.nearbyService}>
              <MaterialIcons name="shopping-cart" size={18} color={colors.gray[700]} />
              <Text style={styles.nearbyServiceText}>Marché (800m)</Text>
            </View>
            
            <View style={styles.nearbyService}>
              <MaterialIcons name="local-hospital" size={18} color={colors.gray[700]} />
              <Text style={styles.nearbyServiceText}>Hôpital (1.2km)</Text>
            </View>
            
            <View style={styles.nearbyService}>
              <MaterialIcons name="restaurant" size={18} color={colors.gray[700]} />
              <Text style={styles.nearbyServiceText}>Restaurants (300m)</Text>
            </View>
          </View>
        </Animated.View>

        <Divider style={styles.divider} />

        {/* Informations pratiques */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(400)}
          style={styles.section}
        >
          <SectionTitle 
            title="Informations pratiques" 
            icon="info"
          />
          
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <MaterialIcons name="calendar-today" size={20} color={colors.primary} />
              <Text style={styles.infoText}>Disponible depuis le {new Date(listing.createdAt).toLocaleDateString()}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialIcons name="access-time" size={20} color={colors.primary} />
              <Text style={styles.infoText}>Type de bail: flexible</Text>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialIcons name="people" size={20} color={colors.primary} />
              <Text style={styles.infoText}>Occupation max: {listing.bedrooms * 2} personnes</Text>
            </View>
          </View>
        </Animated.View>

        <Divider style={styles.divider} />

        {/* Coordonnées du propriétaire */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(500)}
          style={styles.section}
        >
          <SectionTitle 
            title="Propriétaire" 
            icon="person"
          />
          
          <View style={styles.ownerCard}>
            <View style={styles.ownerInfo}>
              <View style={styles.ownerIconContainer}>
                <MaterialIcons name="person" size={24} color={colors.white} />
              </View>
              <View>
                <Text style={styles.ownerName}>{listing.owner?.name}</Text>
                <Text style={styles.ownerContact}>
                  {listing.owner?.phone}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Divider style={styles.divider} />

        {/* Section des avis */}
        <Animated.View 
          entering={FadeInUp.duration(400).delay(450)}
          style={styles.section}
        >
          <SectionTitle 
            title="Avis des voyageurs" 
            icon="star"
          />
          
          {propertyReviews.length > 0 ? (
            <View style={styles.reviewsContainer}>
              {/* En-tête avec note moyenne et filtres */}
              <View style={styles.reviewsHeader}>
                <View style={styles.ratingOverview}>
                  <Text style={styles.averageRating}>{averageRating.toFixed(1)}</Text>
                  <RatingStars 
                    rating={averageRating} 
                    size={18} 
                    disabled={true}
                    color="#FFB100"
                  />
                  <Text style={styles.reviewCount}>
                    ({propertyReviews.length} avis)
                  </Text>
                </View>
                
                {/* Sélecteur de tri */}
                {propertyReviews.length > 1 && (
                  <View style={styles.sortContainer}>
                    <Text style={styles.sortLabel}>Trier par: </Text>
                    <TouchableOpacity
                      style={styles.sortButton}
                      onPress={() => {
                        // Cycle entre les options de tri
                        const orders: ('recent' | 'highest' | 'lowest')[] = ['recent', 'highest', 'lowest'];
                        const currentIndex = orders.indexOf(reviewSortOrder);
                        const nextIndex = (currentIndex + 1) % orders.length;
                        setReviewSortOrder(orders[nextIndex]);
                      }}
                    >
                      <Text style={styles.sortButtonText}>
                        {reviewSortOrder === 'recent' ? 'Plus récents' : 
                         reviewSortOrder === 'highest' ? 'Mieux notés' : 
                         'Moins bien notés'}
                      </Text>
                      <Ionicons name="chevron-down" size={14} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              
              {/* Liste des avis */}
              <View style={styles.reviewsList}>
                {displayedReviews.map((review, index) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    style={{ marginBottom: spacing[3] }}
                  />
                ))}
                
                {/* Bouton pour voir plus d'avis */}
                {propertyReviews.length > 3 && !showAllReviews && (
                  <TouchableOpacity
                    style={styles.showMoreButton}
                    onPress={() => setShowAllReviews(true)}
                  >
                    <Text style={styles.showMoreText}>
                      Voir tous les {propertyReviews.length} avis
                    </Text>
                    <Ionicons name="chevron-down" size={16} color={colors.primary} />
                  </TouchableOpacity>
                )}
              </View>
              
              {/* Bouton pour ajouter un avis */}
              <Button
                mode="outlined"
                icon="star-outline"
                onPress={handleLeaveReview}
                style={styles.leaveReviewButton}
                textColor={colors.primary}
              >
                Laisser un avis
              </Button>
            </View>
          ) : (
            <View style={styles.noReviewsContainer}>
              <Text style={styles.noReviewsText}>
                Aucun avis pour le moment. Soyez le premier à partager votre expérience !
              </Text>
              <Button
                mode="contained"
                icon="star-outline"
                onPress={handleLeaveReview}
                style={styles.firstReviewButton}
                buttonColor={colors.primary}
              >
                Laisser un avis
              </Button>
            </View>
          )}
        </Animated.View>
        
        {/* Espace pour le bouton fixed en bas */}
        <View style={{ height: 80 }} />
      </ScrollView>
      
      {/* Boutons de contact */}
      <Animated.View 
        entering={FadeInUp.duration(400).delay(300)}
        style={styles.footerContainer}
      >
        <View style={styles.contactContainer}>
          <Button 
            mode="contained" 
            icon="message-text-outline"
            style={styles.contactButton}
            contentStyle={styles.contactButtonContent}
            buttonColor={colors.primary}
            onPress={handleContact}
          >
            Contacter le propriétaire
          </Button>
          
          {listing.owner?.phone && (
            <Button 
              mode="outlined" 
              icon="phone"
              style={[styles.contactButton, styles.callButton]}
              contentStyle={styles.contactButtonContent}
              textColor={colors.primary}
              onPress={() => Linking.openURL(`tel:${listing.owner?.phone}`)}
            >
              Appeler
            </Button>
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 + spacing[2] : spacing[2],
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing[2],
    ...shadows.sm,
  },
  carouselContainer: {
    position: 'relative',
  },
  scrollContent: {
    paddingBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.gray[600],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.white,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
  },
  availabilityBadgeContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    zIndex: 10,
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  availabilityText: {
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 14,
  },
  mainInfoContainer: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: spacing[2],
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  location: {
    fontSize: typography.fontSize.base,
    color: colors.gray[600],
    marginLeft: 4,
  },
  contractTypeContainer: {
    flexDirection: 'row',
    marginBottom: spacing[3],
    flexWrap: 'wrap',
  },
  typeChip: {
    backgroundColor: colors.primary + '20',
    marginRight: spacing[2],
    marginBottom: spacing[2],
  },
  contractChip: {
    backgroundColor: colors.gray[200],
  },
  typeChipText: { 
    color: colors.primary,
    fontWeight: '600',
  },
  priceOptionsContainer: {
    marginBottom: spacing[3],
  },
  segmentedButtons: {
    backgroundColor: colors.white,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  price: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.primary,
  },
  priceUnit: {
    fontSize: typography.fontSize.base,
    fontWeight: 'normal',
    color: colors.gray[600],
  },
  suitableForContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing[3],
  },
  suitableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[2],
    borderRadius: borderRadius.full,
    marginRight: spacing[2],
    marginBottom: spacing[2],
  },
  suitableText: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[800],
    marginLeft: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  infoText: {
    marginLeft: 8,
    fontSize: typography.fontSize.sm,
    color: colors.gray[700],
  },
  divider: {
    marginVertical: spacing[4],
  },
  section: {
    paddingHorizontal: spacing[4],
  },
  description: {
    fontSize: typography.fontSize.base,
    lineHeight: 24,
    color: colors.gray[700],
  },
  contractDetailsContainer: {
    marginTop: spacing[2],
  },
  contractDetailItem: {
    flexDirection: 'row',
    marginBottom: spacing[3],
  },
  contractDetailTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    color: colors.gray[800],
    marginLeft: spacing[2],
  },
  contractDetailText: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
    marginLeft: spacing[2],
    marginTop: 2,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  nearbyServicesContainer: {
    marginTop: spacing[2],
  },
  nearbyService: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  nearbyServiceText: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[700],
    marginLeft: spacing[2],
  },
  mapContainer: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  mapWrapper: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  map: {
    height: 180,
    borderRadius: borderRadius.lg,
  },
  viewOnMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[3],
    backgroundColor: colors.gray[100],
  },
  viewOnMapText: {
    marginRight: 8,
    fontWeight: '500',
    color: colors.primary,
  },
  infoSection: {
    gap: spacing[3],
  },
  ownerCard: {
    padding: spacing[4],
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.lg,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  ownerName: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 4,
  },
  ownerContact: {
    fontSize: typography.fontSize.base,
    color: colors.gray[600],
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  contactContainer: {
    flexDirection: 'row',
  },
  contactButton: {
    flex: 1,
    borderRadius: borderRadius.full,
  },
  contactButtonContent: {
    paddingVertical: spacing[1],
  },
  callButton: {
    marginLeft: 12,
    borderColor: colors.primary,
  },
  reviewsContainer: {
    marginTop: spacing[2],
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing[4],
  },
  ratingOverview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  averageRating: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginRight: spacing[2],
  },
  reviewCount: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
    marginLeft: spacing[2],
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.gray[600],
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing[1],
  },
  sortButtonText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontWeight: '500',
    marginRight: 2,
  },
  reviewsList: {
    marginBottom: spacing[4],
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[2],
  },
  showMoreText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
    marginRight: spacing[1],
  },
  leaveReviewButton: {
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    marginVertical: spacing[2],
  },
  noReviewsContainer: {
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.md,
    padding: spacing[4],
    alignItems: 'center',
  },
  noReviewsText: {
    fontSize: typography.fontSize.base,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  firstReviewButton: {
    borderRadius: borderRadius.md,
  },
});

export default LogementDetailScreen; 