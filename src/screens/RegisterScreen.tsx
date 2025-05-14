import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Text, Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import TextInputField from '../components/TextInputField';
import { useUserActions } from '../store/user';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { login } = useUserActions();

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // UI state
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Validation
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    
    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nom complet requis';
      isValid = false;
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Format d\'email invalide';
        isValid = false;
      }
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
      isValid = false;
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmation requise';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Form submission
  const handleRegister = () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login({
        fullName: formData.fullName,
        email: formData.email,
        authProvider: 'manual',
      });
      
      setLoading(false);
      setSnackbarMessage('Compte créé avec succès!');
      setSnackbarVisible(true);
      
      // Redirect to preferences after registration
      setTimeout(() => {
        navigation.navigate('PreferenceCarousel');
      }, 1000);
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
        
        <Animated.View entering={FadeInDown.duration(800)}>
          <Text style={styles.title}>Créer votre compte</Text>
          <Text style={styles.subtitle}>
            Rejoignez-nous pour trouver votre prochain logement à Gisenyi
          </Text>
          <Image 
            source={require('../assets/images/registration-image.svg')} 
            style={styles.registrationImage}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View 
          style={styles.formContainer}
          entering={FadeInDown.duration(800).delay(200)}
        >
          <TextInputField
            label="Nom complet"
            value={formData.fullName}
            onChangeText={(text) => handleInputChange('fullName', text)}
            error={errors.fullName}
            touched={touched.fullName}
            icon="account-outline"
            autoCapitalize="words"
            returnKeyType="next"
            placeholder="Votre nom complet"
          />
          
          <TextInputField
            label="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            error={errors.email}
            touched={touched.email}
            icon="email-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            placeholder="votre@email.com"
          />
          
          <TextInputField
            label="Mot de passe"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            error={errors.password}
            touched={touched.password}
            icon="lock-outline"
            secureTextEntry
            returnKeyType="next"
            placeholder="Minimum 6 caractères"
          />
          
          <TextInputField
            label="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            icon="lock-check-outline"
            secureTextEntry
            returnKeyType="done"
            placeholder="Retapez votre mot de passe"
          />
          
          <Animated.View entering={FadeInDown.duration(800).delay(400)}>
            <Button
              mode="contained"
              onPress={handleRegister}
              style={styles.registerButton}
              contentStyle={styles.buttonContent}
              loading={loading}
              disabled={loading}
            >
              Créer un compte
            </Button>
          </Animated.View>
          
          <Animated.View 
            style={styles.loginContainer}
            entering={FadeInDown.duration(800).delay(500)}
          >
            <Text style={styles.loginText}>Déjà un compte ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Se connecter</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 32,
  },
  formContainer: {
    marginBottom: 24,
  },
  registerButton: {
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: '#006064',
  },
  buttonContent: {
    height: 52,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#757575',
    marginRight: 4,
  },
  loginLink: {
    color: '#006064',
    fontWeight: 'bold',
  },
  snackbar: {
    backgroundColor: '#323232',
  },
  registrationImage: {
    width: '100%',
    height: 120,
    alignSelf: 'center',
    marginVertical: 16,
  },
});

export default RegisterScreen; 