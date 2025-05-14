import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import PriceDisplay from './PriceDisplay';

interface Property {
  id: string;
  title: string;
  location: string;
  priceInRwf: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  isPerNight?: boolean;
  isFavorite?: boolean;
}

interface PropertyCardProps {
  property: Property;
  index: number;
  onPress: () => void;
  onFavoritePress?: () => void;
}

const PropertyCard = ({ property, index, onPress, onFavoritePress }: PropertyCardProps) => {
  const { width } = Dimensions.get('window');
  const imageWidth = width - (spacing[4] * 2);
  const { t } = useTranslation();

  return (
    <Animated.View
      entering={FadeIn.delay(index * 100).duration(400)}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.9}
      >
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: property.image }} 
            style={[styles.image, { width: imageWidth }]} 
            resizeMode="cover" 
          />
          
          {/* Badge "Nouveau" */}
          {property.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>Nouveau</Text>
            </View>
          )}
          
          {/* Bouton favoris */}
          {onFavoritePress && (
            <TouchableOpacity
              style={styles.heartButton}
              onPress={(e) => {
                e.stopPropagation();
                onFavoritePress();
              }}
            >
              <Ionicons 
                name={property.isFavorite ? "heart" : "heart-outline"} 
                size={20} 
                color={property.isFavorite ? colors.error : colors.white} 
              />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Contenu */}
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title} numberOfLines={1}>
              {property.title}
            </Text>
          </View>
          
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={colors.gray[500]} />
            <Text style={styles.location} numberOfLines={1}>
              {property.location}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.info}>
              <Ionicons name="bed-outline" size={16} color={colors.gray[600]} />
              <Text style={styles.infoText}>{property.bedrooms}</Text>
            </View>
            <View style={styles.info}>
              <Ionicons name="water-outline" size={16} color={colors.gray[600]} />
              <Text style={styles.infoText}>{property.bathrooms}</Text>
            </View>
            <View style={styles.info}>
              <Ionicons name="resize-outline" size={16} color={colors.gray[600]} />
              <Text style={styles.infoText}>{property.area} m²</Text>
            </View>
          </View>
          
          <View style={styles.priceContainer}>
            <PriceDisplay 
              priceInRwf={property.priceInRwf}
              size="medium"
              showOriginal={true}
              isPerMonth={!property.isPerNight}
              isPerNight={property.isPerNight}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.gray[400],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    height: 200,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
  },
  newBadge: {
    position: 'absolute',
    top: spacing[3],
    left: spacing[3],
    backgroundColor: colors.primary,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
  },
  newBadgeText: {
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontWeight: '500',
  },
  heartButton: {
    position: 'absolute',
    top: spacing[3],
    right: spacing[3],
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing[4],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  title: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.gray[800],
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.gray[700],
    marginLeft: spacing[1],
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  location: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.gray[500],
    marginLeft: spacing[1],
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: spacing[3],
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
    marginLeft: spacing[1],
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default PropertyCard; 