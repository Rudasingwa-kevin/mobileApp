import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useAppStore } from '../store/useAppStore';
import { Title, Text, Card, Button, Chip, IconButton, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

type PropertyDetailsRouteProp = RouteProp<RootStackParamList, 'PropertyDetails'>;

const PropertyDetailsScreen = () => {
  const route = useRoute<PropertyDetailsRouteProp>();
  const { propertyId } = route.params;
  const { properties, selectedProperty, selectProperty, user, addToFavorites, removeFromFavorites } = useAppStore();

  useEffect(() => {
    selectProperty(propertyId);
  }, [propertyId, selectProperty]);

  if (!selectedProperty) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006064" />
        <Text style={styles.loadingText}>Chargement des détails...</Text>
      </View>
    );
  }

  const isFavorite = user?.favorites.includes(propertyId);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(propertyId);
    } else {
      addToFavorites(propertyId);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover 
          source={{ uri: selectedProperty.images[0] || 'https://via.placeholder.com/400x300' }} 
          style={styles.cardImage}
        />
        
        <View style={styles.favoriteButton}>
          <IconButton
            icon={isFavorite ? 'heart' : 'heart-outline'}
            iconColor={isFavorite ? '#e91e63' : '#000'}
            size={24}
            onPress={handleToggleFavorite}
          />
        </View>
        
        <Card.Content>
          <Title style={styles.title}>{selectedProperty.title}</Title>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {selectedProperty.price} {selectedProperty.currency}/mois
            </Text>
          </View>
          
          <View style={styles.locationContainer}>
            <MaterialIcons name="place" size={18} color="#666" />
            <Text style={styles.location}>
              {selectedProperty.location.address}, {selectedProperty.location.city}
            </Text>
          </View>
          
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <MaterialIcons name="hotel" size={22} color="#006064" />
              <Text style={styles.featureText}>{selectedProperty.bedrooms} chambres</Text>
            </View>
            
            <View style={styles.feature}>
              <MaterialIcons name="bathtub" size={22} color="#006064" />
              <Text style={styles.featureText}>{selectedProperty.bathrooms} salles de bain</Text>
            </View>
            
            <View style={styles.feature}>
              <MaterialIcons name="straighten" size={22} color="#006064" />
              <Text style={styles.featureText}>{selectedProperty.size} m²</Text>
            </View>
          </View>
          
          <Divider style={styles.divider} />
          
          <Title style={styles.sectionTitle}>Description</Title>
          <Text style={styles.description}>{selectedProperty.description}</Text>
          
          <Divider style={styles.divider} />
          
          <Title style={styles.sectionTitle}>Equipements</Title>
          <View style={styles.amenitiesContainer}>
            {selectedProperty.amenities.map((amenity, index) => (
              <Chip key={index} style={styles.amenityChip} textStyle={styles.amenityText}>
                {amenity}
              </Chip>
            ))}
          </View>
          
          <Divider style={styles.divider} />
          
          <Title style={styles.sectionTitle}>Contact</Title>
          <View style={styles.contactContainer}>
            <View style={styles.contactItem}>
              <MaterialIcons name="person" size={18} color="#006064" />
              <Text style={styles.contactText}>{selectedProperty.contactInfo.name}</Text>
            </View>
            
            <View style={styles.contactItem}>
              <MaterialIcons name="phone" size={18} color="#006064" />
              <Text style={styles.contactText}>{selectedProperty.contactInfo.phone}</Text>
            </View>
            
            <View style={styles.contactItem}>
              <MaterialIcons name="email" size={18} color="#006064" />
              <Text style={styles.contactText}>{selectedProperty.contactInfo.email}</Text>
            </View>
          </View>
          
          <Button 
            mode="contained" 
            style={styles.contactButton}
            icon="phone"
            onPress={() => {/* Implémenter un appel téléphonique */}}
          >
            Contacter le propriétaire
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  cardImage: {
    height: 250,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  priceContainer: {
    marginVertical: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006064',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  amenityChip: {
    backgroundColor: '#e0f2f1',
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    color: '#006064',
  },
  contactContainer: {
    marginTop: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  contactButton: {
    marginTop: 16,
    backgroundColor: '#006064',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
});

export default PropertyDetailsScreen; 