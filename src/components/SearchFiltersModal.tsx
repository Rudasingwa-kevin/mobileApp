import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, Checkbox, Chip, RadioButton, useTheme, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useSearchStore, SearchFilters } from '../store/search';
import { propertyTypes, amenities, pointsOfInterest } from '../data/mockListings';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import Slider from '@react-native-community/slider';

interface SearchFiltersModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const SearchFiltersModal = ({ visible, onDismiss }: SearchFiltersModalProps) => {
  const theme = useTheme();
  const { filters, setFilters, resetFilters, applyFilters } = useSearchStore();
  
  // État local pour les filtres (pour ne pas les appliquer en temps réel)
  const [localFilters, setLocalFilters] = useState<SearchFilters>({ ...filters });
  
  // Réinitialiser les filtres locaux quand le modal s'ouvre
  useEffect(() => {
    if (visible) {
      setLocalFilters({ ...filters });
    }
  }, [visible, filters]);
  
  // Mise à jour d'un filtre
  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };
  
  // Ajouter/supprimer une valeur dans un tableau de filtres
  const toggleArrayFilter = <K extends keyof SearchFilters>(
    key: K, 
    value: string, 
    currentValues: string[] = []
  ) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    updateFilter(key, newValues as SearchFilters[K]);
  };
  
  // Appliquer les filtres
  const handleApply = () => {
    setFilters(localFilters);
    applyFilters();
    onDismiss();
  };
  
  // Réinitialiser les filtres
  const handleReset = () => {
    resetFilters();
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <Animated.View 
          entering={FadeInUp.duration(300)}
          exiting={FadeOutDown.duration(300)}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Filtres</Text>
            <Button onPress={onDismiss} mode="text" style={styles.closeButton}>
              <MaterialIcons name="close" size={20} color={theme.colors.onSurface} />
            </Button>
          </View>
          
          <ScrollView style={styles.content}>
            {/* Prix */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Prix</Text>
              
              <View style={styles.sliderContainer}>
                <Text style={styles.sliderValue}>
                  {localFilters.minPrice || 0} - {localFilters.maxPrice || 1500} USD/mois
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1500}
                  step={50}
                  value={localFilters.minPrice || 0}
                  onValueChange={(value) => updateFilter('minPrice', value)}
                  minimumTrackTintColor={theme.colors.primary}
                  maximumTrackTintColor="#E0E0E0"
                  thumbTintColor={theme.colors.primary}
                />
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1500}
                  step={50}
                  value={localFilters.maxPrice || 1500}
                  onValueChange={(value) => updateFilter('maxPrice', value)}
                  minimumTrackTintColor={theme.colors.primary}
                  maximumTrackTintColor="#E0E0E0"
                  thumbTintColor={theme.colors.primary}
                />
                <View style={styles.sliderLabels}>
                  <Text>0</Text>
                  <Text>500</Text>
                  <Text>1000</Text>
                  <Text>1500+</Text>
                </View>
              </View>
            </View>
            
            <Divider style={styles.divider} />
            
            {/* Type de logement */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Type de logement</Text>
              
              <View style={styles.chipsContainer}>
                {propertyTypes.map((type) => (
                  <Chip
                    key={type.id}
                    selected={localFilters.propertyType?.includes(type.id)}
                    onPress={() => toggleArrayFilter(
                      'propertyType',
                      type.id,
                      localFilters.propertyType
                    )}
                    style={styles.chip}
                    showSelectedOverlay
                  >
                    {type.name}
                  </Chip>
                ))}
              </View>
            </View>
            
            <Divider style={styles.divider} />
            
            {/* Chambres */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Chambres</Text>
              
              <View style={styles.chipsContainer}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <Chip
                    key={num}
                    selected={localFilters.bedrooms === num}
                    onPress={() => updateFilter('bedrooms', localFilters.bedrooms === num ? undefined : num)}
                    style={styles.chip}
                    showSelectedOverlay
                  >
                    {num}+
                  </Chip>
                ))}
              </View>
            </View>
            
            <Divider style={styles.divider} />
            
            {/* Commodités */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Commodités</Text>
              
              {amenities.map((amenity) => (
                <Checkbox.Item
                  key={amenity.id}
                  label={amenity.name}
                  status={localFilters.amenities?.includes(amenity.id) ? 'checked' : 'unchecked'}
                  onPress={() => toggleArrayFilter(
                    'amenities',
                    amenity.id,
                    localFilters.amenities
                  )}
                  style={styles.checkboxItem}
                  labelStyle={styles.checkboxLabel}
                  color={theme.colors.primary}
                />
              ))}
            </View>
            
            <Divider style={styles.divider} />
            
            {/* Proximité */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>À proximité de</Text>
              
              <RadioButton.Group
                onValueChange={(value) => 
                  updateFilter('nearbyPointOfInterest', value || undefined)
                }
                value={localFilters.nearbyPointOfInterest || ''}
              >
                {pointsOfInterest.map((poi) => (
                  <RadioButton.Item
                    key={poi.id}
                    label={poi.name}
                    value={poi.id}
                    labelStyle={styles.radioLabel}
                    style={styles.radioItem}
                    color={theme.colors.primary}
                  />
                ))}
              </RadioButton.Group>
            </View>
            
            <Divider style={styles.divider} />
            
            {/* Tri */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trier par</Text>
              
              <RadioButton.Group
                onValueChange={(value) => 
                  updateFilter('sortBy', value as SearchFilters['sortBy'])
                }
                value={localFilters.sortBy || 'price_asc'}
              >
                <RadioButton.Item
                  label="Prix (croissant)"
                  value="price_asc"
                  labelStyle={styles.radioLabel}
                  style={styles.radioItem}
                  color={theme.colors.primary}
                />
                <RadioButton.Item
                  label="Prix (décroissant)"
                  value="price_desc"
                  labelStyle={styles.radioLabel}
                  style={styles.radioItem}
                  color={theme.colors.primary}
                />
                <RadioButton.Item
                  label="Plus récent"
                  value="date_newest"
                  labelStyle={styles.radioLabel}
                  style={styles.radioItem}
                  color={theme.colors.primary}
                />
                <RadioButton.Item
                  label="Plus ancien"
                  value="date_oldest"
                  labelStyle={styles.radioLabel}
                  style={styles.radioItem}
                  color={theme.colors.primary}
                />
              </RadioButton.Group>
            </View>
          </ScrollView>
          
          <View style={styles.footer}>
            <Button
              mode="outlined"
              onPress={handleReset}
              style={styles.resetButton}
            >
              Réinitialiser
            </Button>
            
            <Button
              mode="contained"
              onPress={handleApply}
              style={styles.applyButton}
              buttonColor={theme.colors.primary}
            >
              Appliquer
            </Button>
          </View>
        </Animated.View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    margin: 0,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  checkboxItem: {
    paddingVertical: 4,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  radioItem: {
    paddingVertical: 2,
  },
  radioLabel: {
    fontSize: 14,
  },
  sliderContainer: {
    marginTop: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: -10,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  resetButton: {
    flex: 1,
    marginRight: 8,
  },
  applyButton: {
    flex: 1,
    marginLeft: 8,
  },
});

export default SearchFiltersModal; 