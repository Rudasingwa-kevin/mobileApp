import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, TextInput, Divider, Chip, HelperText, Snackbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { RootStackParamList } from '../types';
import RatingStars from '../components/RatingStars';
import useReviewsStore from '../store/reviews';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';

// Types des props
type LeaveReviewScreenRouteProp = RouteProp<RootStackParamList, 'LeaveReview'>;
type LeaveReviewNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LeaveReviewScreen = () => {
  const navigation = useNavigation<LeaveReviewNavigationProp>();
  const route = useRoute<LeaveReviewScreenRouteProp>();
  const { propertyId, propertyTitle, ownerId, ownerName } = route.params;
  
  const { addReview } = useReviewsStore();
  
  // États locaux
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [ownerRating, setOwnerRating] = useState(0);
  const [ownerFeedback, setOwnerFeedback] = useState('');
  const [includeOwnerReview, setIncludeOwnerReview] = useState(false);
  const [stayDuration, setStayDuration] = useState<'court terme' | 'long terme'>('court terme');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    rating?: string;
    comment?: string;
    ownerRating?: string;
  }>({});
  
  // Valider le formulaire avant soumission
  const validateForm = () => {
    const errors: {
      rating?: string;
      comment?: string;
      ownerRating?: string;
    } = {};
    
    if (rating === 0) {
      errors.rating = 'Veuillez attribuer une note au logement';
    }
    
    if (!comment.trim()) {
      errors.comment = 'Veuillez partager votre expérience dans un commentaire';
    } else if (comment.length < 10) {
      errors.comment = 'Votre commentaire doit contenir au moins 10 caractères';
    }
    
    if (includeOwnerReview && ownerRating === 0) {
      errors.ownerRating = 'Veuillez attribuer une note au propriétaire';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Gérer la soumission de l'avis
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simuler un délai API
    setTimeout(() => {
      // Ajouter l'avis via le store
      addReview({
        propertyId,
        authorId: 'current_user', // Dans une vraie app, on récupérerait l'ID de l'utilisateur connecté
        authorName: 'Vous', // Idem pour le nom
        rating,
        comment,
        stayDuration,
        isVerified: true,
      });
      
      // Si l'avis sur le propriétaire est inclus, on pourrait l'ajouter dans un autre store
      if (includeOwnerReview && ownerRating > 0) {
        // Dans une vraie application, on ajouterait cet avis dans un store dédié aux propriétaires
        console.log('Avis sur le propriétaire:', {
          ownerId,
          rating: ownerRating,
          comment: ownerFeedback,
        });
      }
      
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Rediriger vers la page de détail après un délai
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Laisser un avis</Text>
        <View style={styles.headerRight} />
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Informations sur le logement */}
          <Animated.View entering={FadeIn.duration(300)} style={styles.propertyInfoContainer}>
            <Text style={styles.propertyTitle}>{propertyTitle}</Text>
          </Animated.View>
          
          <Divider style={styles.divider} />
          
          {/* Section de notation */}
          <Animated.View entering={FadeInUp.delay(100).duration(400)} style={styles.section}>
            <Text style={styles.sectionTitle}>Comment notez-vous ce logement ?</Text>
            <View style={styles.ratingContainer}>
              <RatingStars
                rating={rating}
                size={32}
                onRatingChange={setRating}
                color="#FFB100"
              />
              {rating > 0 && (
                <Text style={styles.ratingText}>
                  {rating === 5 ? 'Excellent !' : 
                   rating >= 4 ? 'Très bien !' : 
                   rating >= 3 ? 'Bien' : 
                   rating >= 2 ? 'Moyen' : 'Décevant'}
                </Text>
              )}
            </View>
            {validationErrors.rating && (
              <HelperText type="error" visible={!!validationErrors.rating}>
                {validationErrors.rating}
              </HelperText>
            )}
          </Animated.View>
          
          {/* Section de commentaire */}
          <Animated.View entering={FadeInUp.delay(200).duration(400)} style={styles.section}>
            <Text style={styles.sectionTitle}>Partagez votre expérience</Text>
            <TextInput
              multiline
              numberOfLines={6}
              value={comment}
              onChangeText={setComment}
              placeholder="Qu'avez-vous apprécié ? Qu'est-ce qui pourrait être amélioré ?"
              style={styles.commentInput}
              mode="outlined"
              outlineColor={colors.gray[300]}
              activeOutlineColor={colors.primary}
              error={!!validationErrors.comment}
            />
            {validationErrors.comment && (
              <HelperText type="error" visible={!!validationErrors.comment}>
                {validationErrors.comment}
              </HelperText>
            )}
          </Animated.View>
          
          {/* Type de séjour */}
          <Animated.View entering={FadeInUp.delay(300).duration(400)} style={styles.section}>
            <Text style={styles.sectionTitle}>Type de séjour</Text>
            <View style={styles.stayTypeContainer}>
              <Chip
                selected={stayDuration === 'court terme'}
                onPress={() => setStayDuration('court terme')}
                style={[styles.stayTypeChip, stayDuration === 'court terme' && styles.selectedChip]}
                icon={() => <Ionicons name="bed" size={18} color={stayDuration === 'court terme' ? colors.primary : colors.gray[500]} />}
              >
                Court terme
              </Chip>
              <Chip
                selected={stayDuration === 'long terme'}
                onPress={() => setStayDuration('long terme')}
                style={[styles.stayTypeChip, stayDuration === 'long terme' && styles.selectedChip]}
                icon={() => <Ionicons name="home" size={18} color={stayDuration === 'long terme' ? colors.primary : colors.gray[500]} />}
              >
                Long terme (1+ mois)
              </Chip>
            </View>
          </Animated.View>
          
          {/* Option d'évaluation du propriétaire */}
          <Animated.View entering={FadeInUp.delay(400).duration(400)} style={styles.section}>
            <View style={styles.ownerReviewHeader}>
              <Text style={styles.sectionTitle}>Évaluer également le propriétaire ?</Text>
              <Chip
                selected={includeOwnerReview}
                onPress={() => setIncludeOwnerReview(!includeOwnerReview)}
                style={[styles.toggleChip, includeOwnerReview && styles.selectedChip]}
              >
                {includeOwnerReview ? 'Oui' : 'Non'}
              </Chip>
            </View>
            
            {includeOwnerReview && (
              <Animated.View entering={FadeInUp.duration(300)} style={styles.ownerReviewContainer}>
                <Text style={styles.ownerName}>Propriétaire: {ownerName}</Text>
                
                <View style={styles.ratingContainer}>
                  <RatingStars
                    rating={ownerRating}
                    size={28}
                    onRatingChange={setOwnerRating}
                    color="#FFB100"
                  />
                </View>
                
                {validationErrors.ownerRating && (
                  <HelperText type="error" visible={!!validationErrors.ownerRating}>
                    {validationErrors.ownerRating}
                  </HelperText>
                )}
                
                <TextInput
                  multiline
                  numberOfLines={3}
                  value={ownerFeedback}
                  onChangeText={setOwnerFeedback}
                  placeholder="Un commentaire sur le propriétaire ? (optionnel)"
                  style={styles.ownerInput}
                  mode="outlined"
                  outlineColor={colors.gray[300]}
                  activeOutlineColor={colors.primary}
                />
              </Animated.View>
            )}
          </Animated.View>
          
          {/* Espacement pour le bouton fixed */}
          <View style={{ height: 80 }} />
        </ScrollView>
      </KeyboardAvoidingView>
      
      {/* Bouton de soumission */}
      <View style={styles.submitButtonContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          buttonColor={colors.primary}
          style={styles.submitButton}
          contentStyle={styles.submitButtonContent}
        >
          Publier mon avis
        </Button>
      </View>
      
      {/* Message de succès */}
      <Snackbar
        visible={showSuccess}
        onDismiss={() => setShowSuccess(false)}
        duration={2000}
      >
        Merci pour votre avis ! Il a été publié avec succès.
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
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
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.gray[800],
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    paddingBottom: spacing[6],
  },
  propertyInfoContainer: {
    marginBottom: spacing[3],
  },
  propertyTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.gray[800],
  },
  divider: {
    marginVertical: spacing[3],
  },
  section: {
    marginBottom: spacing[4],
  },
  sectionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.gray[800],
    marginBottom: spacing[2],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing[2],
  },
  ratingText: {
    marginLeft: spacing[2],
    fontSize: typography.fontSize.base,
    color: colors.gray[700],
  },
  commentInput: {
    backgroundColor: colors.white,
    fontSize: typography.fontSize.base,
  },
  stayTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  stayTypeChip: {
    backgroundColor: colors.gray[100],
  },
  selectedChip: {
    backgroundColor: `${colors.primary}20`,
  },
  toggleChip: {
    backgroundColor: colors.gray[100],
  },
  ownerReviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  ownerReviewContainer: {
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.md,
    padding: spacing[3],
    marginTop: spacing[2],
  },
  ownerName: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.gray[700],
    marginBottom: spacing[2],
  },
  ownerInput: {
    backgroundColor: colors.white,
    fontSize: typography.fontSize.base,
    marginTop: spacing[2],
  },
  submitButtonContainer: {
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
  submitButton: {
    borderRadius: borderRadius.full,
  },
  submitButtonContent: {
    paddingVertical: spacing[1.5],
  },
});

export default LeaveReviewScreen; 