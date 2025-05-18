import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Text,
  useTheme,
  Card,
  Avatar,
  Button,
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';

type HostScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Données simulées pour les annonces
const mockListings = [
  {
    id: '1',
    title: 'Appartement moderne au centre-ville',
    location: 'Centre-ville, Gisenyi',
    price: 75000,
    currency: 'RWF',
    rating: 4.8,
    reviews: 12,
    image: 'https://via.placeholder.com/300x200',
    status: 'active',
  },
  {
    id: '2',
    title: 'Studio avec vue sur le lac',
    location: 'Bord du lac, Gisenyi',
    price: 50000,
    currency: 'RWF',
    rating: 4.6,
    reviews: 8,
    image: 'https://via.placeholder.com/300x200',
    status: 'inactive',
  },
  {
    id: '3',
    title: 'Villa de luxe près de la plage',
    location: 'Rubavu, Gisenyi',
    price: 150000,
    currency: 'RWF',
    rating: 4.9,
    reviews: 24,
    image: 'https://via.placeholder.com/300x200',
    status: 'active',
  },
];

const ListingCard = ({ item }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  
  return (
    <Card style={styles.card} mode="outlined">
      <View style={styles.cardStatusRow}>
        <View style={[
          styles.statusIndicator, 
          { backgroundColor: item.status === 'active' ? '#4CAF50' : '#9E9E9E' }
        ]} />
        <Text style={styles.statusText}>
          {item.status === 'active' ? 'Actif' : 'Inactif'}
        </Text>
      </View>
      
      <Card.Title
        title={item.title}
        subtitle={item.location}
        left={(props) => <Avatar.Icon {...props} icon="home" color="#FFFFFF" style={{ backgroundColor: theme.colors.primary }} />}
      />
      
      <Card.Content>
        <View style={styles.cardDetails}>
          <View style={styles.detailRow}>
            <MaterialIcons name="attach-money" size={20} color="#717171" />
            <Text style={styles.detailText}>{item.price} {item.currency} / mois</Text>
          </View>
          
          <View style={styles.detailRow}>
            <MaterialIcons name="star" size={20} color="#FF5A5F" />
            <Text style={styles.detailText}>{item.rating} ({item.reviews} avis)</Text>
          </View>
        </View>
      </Card.Content>
      
      <Card.Actions style={styles.cardActions}>
        <Button mode="outlined" compact>Modifier</Button>
        <Button mode="contained" compact style={{ backgroundColor: theme.colors.primary }}>
          Gérer
        </Button>
      </Card.Actions>
    </Card>
  );
};

const HostListingsScreen = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<HostScreenNavigationProp>();
  
  // Fonction de navigation vers l'écran de création d'annonce
  const handleCreateListing = () => {
    navigation.navigate('CreateListing');
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes annonces</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleCreateListing}
        >
          <MaterialIcons name="add" size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Nouvelle annonce</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={mockListings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListingCard item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5A5F',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F5F5F5',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#717171',
  },
  cardDetails: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#717171',
  },
  cardActions: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default HostListingsScreen; 