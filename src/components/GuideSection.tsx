import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';
import { Guide, GuideCategory } from '../types';
import GuideCard from './GuideCard';
import { useTranslation } from 'react-i18next';

interface GuideSectionProps {
  category: GuideCategory;
  guides: Guide[];
  style?: object;
  onSeeAllPress?: () => void;
  categoryTitle?: string;
  seeAllText?: string;
}

const GuideSection: React.FC<GuideSectionProps> = ({
  category,
  guides,
  style,
  onSeeAllPress,
  categoryTitle,
  seeAllText,
}) => {
  const { t } = useTranslation();
  
  if (!guides || guides.length === 0) {
    return null;
  }
  
  return (
    <View style={[styles.container, style]}>
      {/* En-tête de la section */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name={category.icon as any} size={22} color={colors.primary} />
          <Text style={styles.title}>{categoryTitle || category.title}</Text>
        </View>
        
        {/* Bouton "Voir tout" si plus de 3 guides dans la catégorie */}
        {guides.length > 3 && onSeeAllPress && (
          <TouchableOpacity 
            onPress={onSeeAllPress}
            style={styles.seeAllButton}
          >
            <Text style={styles.seeAllText}>{seeAllText || t('common.seeAll')}</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Description de la catégorie */}
      <Text style={styles.description}>{category.description}</Text>
      
      {/* Liste horizontale de guides */}
      <FlatList
        data={guides.slice(0, 5)} // Limiter à 5 guides maximum par section
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <GuideCard
            guide={item}
            size="medium"
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[6],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginLeft: spacing[2],
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
    marginBottom: spacing[3],
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
    marginRight: 2,
  },
  listContent: {
    paddingLeft: spacing[1],
    paddingRight: spacing[1],
  },
});

export default GuideSection; 