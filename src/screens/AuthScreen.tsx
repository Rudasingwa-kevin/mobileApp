import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Title, Text, Button, Divider, Snackbar, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import SocialLoginButton from '../components/SocialLoginButton';
import FormField from '../components/FormField';
import SimpleAnimatedView from '../components/SimpleAnimatedView';
import { useUserPreferences, Language, Currency } from '../store/userPreferences';

type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

const AuthScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { preferences, setUserPreferences } = useUserPreferences();

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    language: 'fr' as Language,
    currency: 'USD' as Currency,
  });
  
  // Validation errors
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
  });
  
  // UI state
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = {
      fullName: '',
      email: '',
    };

    // Validate name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nom complet requis';
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    // Simulate social login by pre-filling form with mock data
    const mockData = {
      google: {
        fullName: 'User Google',
        email: 'user.google@gmail.com',
      },
      facebook: {
        fullName: 'User Facebook',
        email: 'user.facebook@facebook.com',
      },
    };

    setFormData({
      ...formData,
      fullName: mockData[provider].fullName,
      email: mockData[provider].email,
    });

    // Show success snackbar
    setSnackbarMessage(`Connexion ${provider} simulée. Vous pouvez modifier vos informations.`);
    setSnackbarVisible(true);
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Save to store
      setUserPreferences({
        fullName: formData.fullName,
        email: formData.email,
        language: formData.language,
        currency: formData.currency,
        isLoggedIn: true,
        authProvider: 'manual',
      });

      // Show success message
      setSnackbarMessage('Profil enregistré avec succès!');
      setSnackbarVisible(true);

      // Navigate to home screen after a short delay
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <SimpleAnimatedView animation="fadeIn" duration={800}>
          <Title style={styles.title}>Créer votre profil</Title>
          <Text style={styles.subtitle}>
            Configurez vos préférences pour une meilleure expérience
          </Text>
        </SimpleAnimatedView>

        {/* Social login buttons */}
        <SimpleAnimatedView animation="slideInLeft" delay={200} style={styles.socialButtons}>
          <SocialLoginButton
            provider="google"
            onPress={() => handleSocialLogin('google')}
          />
          <SocialLoginButton
            provider="facebook"
            onPress={() => handleSocialLogin('facebook')}
          />
        </SimpleAnimatedView>

        <SimpleAnimatedView animation="fadeIn" delay={400}>
          <View style={styles.dividerContainer}>
            <Divider style={styles.divider} />
            <Text style={styles.dividerText}>ou</Text>
            <Divider style={styles.divider} />
          </View>
        </SimpleAnimatedView>

        {/* Manual registration form */}
        <SimpleAnimatedView animation="slideInRight" delay={600} style={styles.form}>
          <FormField
            label="Nom complet"
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            error={errors.fullName}
            autoCapitalize="words"
          />

          <FormField
            label="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            error={errors.email}
            keyboardType="email-address"
          />

          {/* Language selection */}
          <Text style={styles.sectionTitle}>Langue préférée</Text>
          <View style={styles.radioGroup}>
            {[
              { value: 'fr', label: 'Français' },
              { value: 'en', label: 'English' },
              { value: 'rw', label: 'Kinyarwanda' },
              { value: 'sw', label: 'Swahili' }
            ].map((item) => (
              <TouchableOpacity 
                key={item.value}
                style={styles.radioItemTouchable}
                onPress={() => setFormData({ ...formData, language: item.value as Language })}
              >
                <View style={styles.radioItemContent}>
                  <RadioButton.Android
                    value={item.value}
                    status={formData.language === item.value ? 'checked' : 'unchecked'}
                    onPress={() => setFormData({ ...formData, language: item.value as Language })}
                    color="#006064"
                  />
                  <Text style={styles.radioLabel}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Currency selection */}
          <Text style={styles.sectionTitle}>Devise préférée</Text>
          <View style={styles.radioGroup}>
            {[
              { value: 'RWF', label: 'RWF' },
              { value: 'USD', label: 'USD' },
              { value: 'EUR', label: 'EUR' }
            ].map((item) => (
              <TouchableOpacity 
                key={item.value}
                style={styles.radioItemTouchable}
                onPress={() => setFormData({ ...formData, currency: item.value as Currency })}
              >
                <View style={styles.radioItemContent}>
                  <RadioButton.Android
                    value={item.value}
                    status={formData.currency === item.value ? 'checked' : 'unchecked'}
                    onPress={() => setFormData({ ...formData, currency: item.value as Currency })}
                    color="#006064"
                  />
                  <Text style={styles.radioLabel}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <SimpleAnimatedView animation="slideInUp" delay={800}>
            <Button
              mode="contained"
              onPress={handleContinue}
              style={styles.continueButton}
              labelStyle={styles.buttonLabel}
            >
              Continuer
            </Button>
          </SimpleAnimatedView>
        </SimpleAnimatedView>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006064',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  socialButtons: {
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 8,
    color: '#666',
  },
  form: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    color: '#333',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  radioItemTouchable: {
    width: '50%',
    marginVertical: 6,
  },
  radioItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 4,
  },
  continueButton: {
    marginTop: 24,
    backgroundColor: '#006064',
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  snackbar: {
    backgroundColor: '#323232',
  },
});

export default AuthScreen; 