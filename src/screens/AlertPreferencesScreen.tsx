import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Switch,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { useTranslation } from 'react-i18next';

// Types
import { RootStackParamList } from '../types';
import { PropertyType, Amenity } from '../types/index';

// State
import { useAlertsStore, Alert } from '../store/alerts';

type AlertPreferencesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AlertPreferencesScreen: React.FC = () => {
  const navigation = useNavigation<AlertPreferencesScreenNavigationProp>();
  const { createAlert, notificationsEnabled, toggleNotifications } = useAlertsStore();
  const { t } = useTranslation();
  
  // États pour les critères
  const [alertName, setAlertName] = useState(t('alerts.alertNamePlaceholder'));
  const [selectedTypes, setSelectedTypes] = useState<PropertyType[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 600]);
  const [bedroomsRange, setBedroomsRange] = useState<[number, number]>([1, 3]);
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  
  // Préparer les données localisées
  const propertyTypes = [
    { id: PropertyType.APARTMENT, label: t('property.types.apartment') },
    { id: PropertyType.HOUSE, label: t('property.types.house') },
    { id: PropertyType.VILLA, label: t('property.types.villa') },
    { id: PropertyType.STUDIO, label: t('property.types.studio') },
    { id: PropertyType.ROOM, label: t('property.types.room') },
  ];
  
  const amenities = [
    { id: Amenity.WIFI, label: 'WiFi' },
    { id: Amenity.AC, label: t('property.amenities') + ': ' + 'AC' },
    { id: Amenity.KITCHEN, label: t('property.amenities') + ': ' + 'Kitchen' },
    { id: Amenity.WASHING_MACHINE, label: t('property.amenities') + ': ' + 'Washing Machine' },
    { id: Amenity.TV, label: 'TV' },
    { id: Amenity.PARKING, label: 'Parking' },
    { id: Amenity.POOL, label: t('property.amenities') + ': ' + 'Pool' },
    { id: Amenity.LAKE_VIEW, label: t('property.amenities') + ': ' + 'Lake View' },
  ];
  
  const districts = [
    t('alerts.districtNames.lakeSide'),
    t('alerts.districtNames.downtown'),
    t('alerts.districtNames.rubavu'),
    t('alerts.districtNames.campus'),
    t('alerts.districtNames.gisenyiRural'),
    t('alerts.districtNames.northBeach'),
    t('alerts.districtNames.mbugangari')
  ];
  
  // Toggle property type
  const togglePropertyType = (type: PropertyType) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  // Toggle amenity
  const toggleAmenity = (amenity: Amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };
  
  // Toggle district
  const toggleDistrict = (district: string) => {
    setSelectedDistricts(prev => 
      prev.includes(district)
        ? prev.filter(d => d !== district)
        : [...prev, district]
    );
  };
  
  // Create alert
  const handleCreateAlert = () => {
    const newAlert: Omit<Alert, 'id'> = {
      name: alertName,
      enabled: true,
      criteria: {
        propertyTypes: selectedTypes.length > 0 ? selectedTypes : undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        minBedrooms: bedroomsRange[0],
        maxBedrooms: bedroomsRange[1],
        amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
        districts: selectedDistricts.length > 0 ? selectedDistricts : undefined,
      }
    };
    
    createAlert(newAlert);
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('alerts.title')}</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Nom de l'alerte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('alerts.alertName')}</Text>
          <TextInput
            style={styles.input}
            value={alertName}
            onChangeText={setAlertName}
            placeholder={t('alerts.alertNamePlaceholder')}
          />
        </View>
        
        {/* Toggle notifications */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>{t('preferences.receiveNotifications')}</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: colors.gray[300], true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>
        
        {/* Type de logement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('property.type')}</Text>
          <View style={styles.optionsContainer}>
            {propertyTypes.map(type => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.optionButton,
                  selectedTypes.includes(type.id) && styles.optionSelected
                ]}
                onPress={() => togglePropertyType(type.id)}
              >
                <Text style={[
                  styles.optionText,
                  selectedTypes.includes(type.id) && styles.optionTextSelected
                ]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Plage de prix */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('alerts.budget')}</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>{priceRange[0]} USD - {priceRange[1]} USD</Text>
            <Slider
              style={styles.slider}
              minimumValue={100}
              maximumValue={1000}
              step={50}
              value={priceRange[1]}
              onValueChange={(value) => setPriceRange([priceRange[0], value])}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.gray[300]}
              thumbTintColor={colors.primary}
            />
          </View>
        </View>
        
        {/* Chambres */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('property.bedrooms')}</Text>
          <View style={styles.bedroomsContainer}>
            {[1, 2, 3, 4, '5+'].map((num, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.bedroomButton,
                  (typeof num === 'number' && 
                    num >= bedroomsRange[0] && 
                    num <= bedroomsRange[1]) && 
                    styles.optionSelected
                ]}
                onPress={() => {
                  if (typeof num === 'number') {
                    setBedroomsRange([num, num]);
                  } else {
                    setBedroomsRange([5, 10]);
                  }
                }}
              >
                <Text style={[
                  styles.bedroomText,
                  (typeof num === 'number' && 
                    num >= bedroomsRange[0] && 
                    num <= bedroomsRange[1]) && 
                    styles.optionTextSelected
                ]}>
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Commodités */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('property.amenities')}</Text>
          <View style={styles.optionsContainer}>
            {amenities.map(amenity => (
              <TouchableOpacity
                key={amenity.id}
                style={[
                  styles.optionButton,
                  selectedAmenities.includes(amenity.id) && styles.optionSelected
                ]}
                onPress={() => toggleAmenity(amenity.id)}
              >
                <Text style={[
                  styles.optionText,
                  selectedAmenities.includes(amenity.id) && styles.optionTextSelected
                ]}>
                  {amenity.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Quartiers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('alerts.districts')}</Text>
          <View style={styles.optionsContainer}>
            {districts.map((district, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedDistricts.includes(district) && styles.optionSelected
                ]}
                onPress={() => toggleDistrict(district)}
              >
                <Text style={[
                  styles.optionText,
                  selectedDistricts.includes(district) && styles.optionTextSelected
                ]}>
                  {district}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateAlert}
        >
          <Text style={styles.createButtonText}>
            {t('alerts.createAlert')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.gray[900],
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[6],
  },
  section: {
    marginTop: spacing[4],
    paddingHorizontal: spacing[4],
  },
  sectionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing[2],
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    fontSize: typography.fontSize.base,
    color: colors.gray[800],
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing[4],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  toggleText: {
    fontSize: typography.fontSize.base,
    color: colors.gray[800],
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.full,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    marginRight: spacing[2],
    marginBottom: spacing[2],
  },
  optionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[700],
  },
  optionTextSelected: {
    color: colors.white,
    fontWeight: '500',
  },
  sliderContainer: {
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.gray[800],
    marginBottom: spacing[1],
  },
  bedroomsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bedroomButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  bedroomText: {
    fontSize: typography.fontSize.base,
    color: colors.gray[700],
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  createButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing[3],
    borderRadius: borderRadius.full,
    alignItems: 'center',
  },
  createButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.base,
    fontWeight: '600',
  },
});

export default AlertPreferencesScreen; 