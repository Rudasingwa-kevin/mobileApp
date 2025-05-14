import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Text, Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import TextInputField from '../components/TextInputField';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ResetPassword'>;

const ResetPasswordScreen = () => {
  const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
  
  // State
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [touched, setTouched] = useState(false);

  // Validation
  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email requis');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Format d\'email invalide');
      return false;
    }
    
    setError('');
    return true;
  };

  // Handle reset
  const handleResetPassword = () => {
    if (!validateEmail()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
      setSnackbarVisible(true);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        
        <Animated.View 
          style={styles.headerContainer}
          entering={FadeInDown.duration(800)}
        >
          <Image
            source={require('../assets/images/forgot-password.svg')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Mot de passe oublié ?</Text>
          <Text style={styles.subtitle}>
            Saisissez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe
          </Text>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(800).delay(200)}>
          {!emailSent ? (
            <>
              <TextInputField
                label="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setTouched(true);
                }}
                error={error}
                touched={touched}
                icon="email-outline"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="done"
                placeholder="votre@email.com"
              />
              
              <Button
                mode="contained"
                onPress={handleResetPassword}
                style={styles.submitButton}
                contentStyle={styles.buttonContent}
                loading={loading}
                disabled={loading}
              >
                Envoyer un lien de réinitialisation
              </Button>
            </>
          ) : (
            <View style={styles.successContainer}>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={60}
                color="#006064"
                style={styles.successIcon}
              />
              <Text style={styles.successTitle}>Email envoyé !</Text>
              <Text style={styles.successText}>
                Si un compte existe avec cette adresse e-mail, vous recevrez un lien de réinitialisation du mot de passe.
              </Text>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('Login')}
                style={[styles.submitButton, styles.backToLoginButton]}
                contentStyle={styles.buttonContent}
              >
                Retour à la connexion
              </Button>
            </View>
          )}
        </Animated.View>
      </ScrollView>
      
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        Lien de réinitialisation envoyé (simulation)
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  image: {
    width: 200,
    height: 160,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 16,
  },
  submitButton: {
    borderRadius: 8,
    marginTop: 24,
    backgroundColor: '#006064',
  },
  buttonContent: {
    height: 52,
  },
  snackbar: {
    backgroundColor: '#323232',
  },
  successContainer: {
    alignItems: 'center',
    padding: 16,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 32,
  },
  backToLoginButton: {
    width: '100%',
  },
});

export default ResetPasswordScreen; 