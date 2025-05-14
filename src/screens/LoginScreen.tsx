import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Text, Button, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { Ionicons } from '@expo/vector-icons';
import { useUserActions } from '../store/user';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors, spacing, typography, shadows, borderRadius } from '../theme';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useUserActions();
  
  // État local pour les erreurs
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fonction de connexion simulée
  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Simuler un délai de connexion
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Connecter l'utilisateur avec des données factices
      await login({
        fullName: 'Utilisateur Test',
        email: 'user@example.com',
        authProvider: 'manual'
      });
    } catch (err) {
      setError('Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={24} color={colors.gray[800]} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Connexion ou inscription</Text>
        </View>
        
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            {/* Sélecteur de pays/région */}
            <Animated.View 
              entering={FadeIn.duration(300)} 
              style={styles.countrySelector}
            >
              <View>
                <Text style={styles.inputLabel}>Pays/Région</Text>
                <Text style={styles.countryValue}>Rwanda (+250)</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color={colors.gray[700]} />
            </Animated.View>
            
            {/* Champ téléphone */}
            <Animated.View 
              entering={FadeIn.duration(300).delay(100)} 
              style={styles.phoneInputContainer}
            >
              <Text style={styles.inputLabel}>Numéro de téléphone</Text>
              <TouchableRipple
                style={styles.phoneInput}
                onPress={() => {}}
                rippleColor="rgba(0, 0, 0, 0.04)"
              >
                <View style={styles.phoneInputInner}>
                  <Text style={styles.phoneInputText}>Entrez votre numéro</Text>
                </View>
              </TouchableRipple>
            </Animated.View>
            
            <Animated.View 
              entering={FadeIn.duration(300).delay(200)} 
              style={styles.disclaimer}
            >
              <Text style={styles.disclaimerText}>
                Nous vous appellerons ou vous enverrons un SMS pour confirmer votre numéro. 
                Des frais standards d'envoi de messages et d'échange de données s'appliquent.
              </Text>
            </Animated.View>
            
            {/* Bouton de connexion */}
            <Animated.View 
              entering={FadeIn.duration(300).delay(300)}
              style={styles.buttonContainer}
            >
              <Button
                mode="contained"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                style={styles.continueButton}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
              >
                Continuer
              </Button>
            </Animated.View>
            
            {/* Séparateur OU */}
            <Animated.View 
              entering={FadeIn.duration(300).delay(400)}
              style={styles.dividerContainer}
            >
              <View style={styles.divider} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.divider} />
            </Animated.View>
            
            {/* Options alternatives de connexion */}
            <Animated.View entering={FadeIn.duration(300).delay(500)}>
              <TouchableRipple
                style={styles.socialButton}
                onPress={() => {}}
                rippleColor="rgba(0, 0, 0, 0.04)"
              >
                <View style={styles.socialButtonContent}>
                  <Ionicons name="mail-outline" size={20} color={colors.gray[800]} />
                  <Text style={styles.socialButtonText}>Continuer avec une adresse e-mail</Text>
                </View>
              </TouchableRipple>
              
              <TouchableRipple
                style={styles.socialButton}
                onPress={() => {}}
                rippleColor="rgba(0, 0, 0, 0.04)"
              >
                <View style={styles.socialButtonContent}>
                  <Ionicons name="logo-apple" size={20} color={colors.gray[800]} />
                  <Text style={styles.socialButtonText}>Continuer avec Apple</Text>
                </View>
              </TouchableRipple>
              
              <TouchableRipple
                style={styles.socialButton}
                onPress={() => {}}
                rippleColor="rgba(0, 0, 0, 0.04)"
              >
                <View style={styles.socialButtonContent}>
                  <Ionicons name="logo-google" size={20} color={colors.gray[800]} />
                  <Text style={styles.socialButtonText}>Continuer avec Google</Text>
                </View>
              </TouchableRipple>
              
              <TouchableRipple
                style={styles.socialButton}
                onPress={() => {}}
                rippleColor="rgba(0, 0, 0, 0.04)"
              >
                <View style={styles.socialButtonContent}>
                  <Ionicons name="logo-facebook" size={20} color={colors.gray[800]} />
                  <Text style={styles.socialButtonText}>Continuer avec Facebook</Text>
                </View>
              </TouchableRipple>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    paddingHorizontal: spacing[4],
  },
  closeButton: {
    position: 'absolute',
    left: spacing[4],
    padding: spacing[2],
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.gray[800],
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[6],
    paddingBottom: spacing[12],
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    marginBottom: spacing[4],
  },
  countryValue: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.gray[800],
    marginTop: spacing[1],
  },
  phoneInputContainer: {
    marginBottom: spacing[4],
  },
  inputLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
    marginBottom: spacing[1],
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.lg,
    height: 56,
    justifyContent: 'center',
  },
  phoneInputInner: {
    paddingHorizontal: spacing[4],
  },
  phoneInputText: {
    fontSize: typography.fontSize.base,
    color: colors.gray[400],
  },
  disclaimer: {
    marginBottom: spacing[6],
  },
  disclaimerText: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.sm,
  },
  buttonContainer: {
    marginBottom: spacing[6],
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray[200],
  },
  dividerText: {
    paddingHorizontal: spacing[4],
    fontSize: typography.fontSize.sm,
    color: colors.gray[500],
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.lg,
    marginBottom: spacing[4],
    height: 48,
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.gray[800],
    marginLeft: spacing[3],
  },
});

export default LoginScreen; 