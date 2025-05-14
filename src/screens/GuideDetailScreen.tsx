import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Share, 
  Platform, 
  StatusBar, 
  SafeAreaView,
  Dimensions
} from 'react-native';
import { Text, Button, ActivityIndicator, Divider } from 'react-native-paper';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { localGuides } from '../data/localGuides';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';

// Type des props pour la route
type GuideDetailRouteProp = RouteProp<RootStackParamList, 'GuideDetail'>;
type GuideDetailNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Fonction utilitaire pour analyser le contenu et le diviser en sections
const parseContentSections = (content: string) => {
  const lines = content.split('\n');
  const sections = [];
  let currentSection = { type: '', content: '' };
  
  for (const line of lines) {
    // Titres
    if (line.startsWith('# ')) {
      if (currentSection.content) sections.push({ ...currentSection });
      currentSection = { type: 'h1', content: line.replace('# ', '') };
      sections.push({ ...currentSection });
      currentSection = { type: '', content: '' };
    } 
    else if (line.startsWith('## ')) {
      if (currentSection.content) sections.push({ ...currentSection });
      currentSection = { type: 'h2', content: line.replace('## ', '') };
      sections.push({ ...currentSection });
      currentSection = { type: '', content: '' };
    } 
    else if (line.startsWith('### ')) {
      if (currentSection.content) sections.push({ ...currentSection });
      currentSection = { type: 'h3', content: line.replace('### ', '') };
      sections.push({ ...currentSection });
      currentSection = { type: '', content: '' };
    }
    // Listes
    else if (line.startsWith('- ')) {
      if (currentSection.type !== 'list') {
        if (currentSection.content) sections.push({ ...currentSection });
        currentSection = { type: 'list', content: line.replace('- ', '• ') + '\n' };
      } else {
        currentSection.content += line.replace('- ', '• ') + '\n';
      }
    }
    // Paragraphes
    else if (line.trim() !== '') {
      if (currentSection.type !== 'paragraph') {
        if (currentSection.content) sections.push({ ...currentSection });
        currentSection = { type: 'paragraph', content: line + '\n' };
      } else {
        currentSection.content += line + '\n';
      }
    }
    // Lignes vides - fin de section
    else if (line.trim() === '' && currentSection.content) {
      sections.push({ ...currentSection });
      currentSection = { type: '', content: '' };
    }
  }
  
  // Ajouter la dernière section si nécessaire
  if (currentSection.content) {
    sections.push({ ...currentSection });
  }
  
  return sections;
};

const GuideDetailScreen = () => {
  const navigation = useNavigation<GuideDetailNavigationProp>();
  const route = useRoute<GuideDetailRouteProp>();
  const { guideId } = route.params;
  
  // États
  const [isLoading, setIsLoading] = useState(true);
  
  // Rechercher le guide dans les données
  const guide = localGuides.find(g => g.id === guideId);
  
  // Simuler un chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Gérer le partage du guide
  const handleShare = async () => {
    if (!guide) return;
    
    try {
      await Share.share({
        title: `Guide LocaMap: ${guide.title}`,
        message: `${guide.title} - ${guide.summary} | Découvert sur LocaMap, l'application pour trouver un logement à Gisenyi.`,
      });
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  };
  
  // Navigation retour
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  // Afficher un indicateur de chargement
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Chargement du guide...</Text>
      </View>
    );
  }
  
  // Si le guide n'existe pas
  if (!guide) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.gray[400]} />
        <Text style={styles.errorText}>
          Guide introuvable
        </Text>
        <Button 
          mode="contained" 
          onPress={handleGoBack}
          style={styles.backToGuidesButton}
        >
          Retour aux guides
        </Button>
      </View>
    );
  }
  
  // Parsons le contenu en sections
  const contentSections = parseContentSections(guide.content);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Image de couverture */}
      <View style={styles.coverImageContainer}>
        <Image 
          source={{ uri: guide.image }} 
          style={styles.coverImage}
          resizeMode="cover"
        />
        
        {/* Dégradé sur l'image */}
        <View style={styles.gradient} />
        
        {/* Boutons sur l'image */}
        <View style={styles.imageButtonsContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleGoBack}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={22} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        {/* Titre sur l'image */}
        <View style={styles.titleContainer}>
          <Animated.Text 
            entering={FadeIn.duration(400)}
            style={styles.title}
          >
            {guide.title}
          </Animated.Text>
        </View>
      </View>
      
      {/* Contenu du guide */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Résumé */}
        <Animated.View 
          entering={FadeIn.duration(400)}
          style={styles.summaryContainer}
        >
          <Text style={styles.summary}>{guide.summary}</Text>
        </Animated.View>
        
        <Divider style={styles.divider} />
        
        {/* Contenu principal */}
        <Animated.View 
          entering={SlideInRight.duration(400).delay(200)}
          style={styles.contentContainer}
        >
          {contentSections.map((section, index) => {
            switch(section.type) {
              case 'h1':
                return (
                  <Text key={index} style={styles.heading1}>
                    {section.content}
                  </Text>
                );
              case 'h2':
                return (
                  <Text key={index} style={styles.heading2}>
                    {section.content}
                  </Text>
                );
              case 'h3':
                return (
                  <Text key={index} style={styles.heading3}>
                    {section.content}
                  </Text>
                );
              case 'list':
                return (
                  <Text key={index} style={styles.list}>
                    {section.content}
                  </Text>
                );
              case 'paragraph':
              default:
                return (
                  <Text key={index} style={styles.paragraph}>
                    {section.content}
                  </Text>
                );
            }
          })}
        </Animated.View>
        
        {/* Pied de page */}
        <View style={styles.footer}>
          <Text style={styles.dateText}>
            Dernière mise à jour: {new Date(guide.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.copyrightText}>
            © LocaMap - Guides Gisenyi
          </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loadingText: {
    marginTop: spacing[3],
    fontSize: typography.fontSize.base,
    color: colors.gray[600],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing[4],
  },
  errorText: {
    fontSize: typography.fontSize.lg,
    color: colors.gray[700],
    marginTop: spacing[3],
    marginBottom: spacing[4],
  },
  backToGuidesButton: {
    marginTop: spacing[2],
  },
  coverImageContainer: {
    height: 280,
    width: '100%',
    position: 'relative',
  },
  coverImage: {
    height: '100%',
    width: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  imageButtonsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing[4],
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + spacing[2] : spacing[2],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    bottom: spacing[4],
    left: spacing[4],
    right: spacing[4],
  },
  title: {
    fontSize: typography.fontSize.xl * 1.2,
    fontWeight: 'bold',
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
  },
  summaryContainer: {
    marginBottom: spacing[4],
  },
  summary: {
    fontSize: typography.fontSize.lg,
    lineHeight: 26,
    color: colors.gray[700],
    fontStyle: 'italic',
  },
  divider: {
    marginBottom: spacing[4],
  },
  contentContainer: {
    marginBottom: spacing[6],
  },
  // Styles pour le texte formaté
  heading1: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: spacing[3],
    marginTop: spacing[3],
  },
  heading2: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginTop: spacing[4],
    marginBottom: spacing[2],
  },
  heading3: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.gray[700],
    marginTop: spacing[3],
    marginBottom: spacing[2],
  },
  paragraph: {
    marginBottom: spacing[3],
    fontSize: typography.fontSize.base,
    lineHeight: 24,
    color: colors.gray[800],
  },
  list: {
    marginBottom: spacing[3],
    fontSize: typography.fontSize.base,
    lineHeight: 24,
    color: colors.gray[800],
    paddingLeft: spacing[2],
  },
  footer: {
    marginTop: spacing[6],
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  dateText: {
    fontSize: typography.fontSize.xs,
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: spacing[1],
  },
  copyrightText: {
    fontSize: typography.fontSize.xs,
    color: colors.gray[500],
    textAlign: 'center',
  },
});

export default GuideDetailScreen; 