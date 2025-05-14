import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, TextInput, Avatar, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useUser, useUserActions } from '../store/user';
import { colors, spacing, typography, borderRadius } from '../theme';
import { useTranslation } from 'react-i18next';
import LanguageCurrencySelector from '../components/LanguageCurrencySelector';
import { useSyncLanguage } from '../utils/i18n';

type EditProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;

const EditProfileScreen = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const theme = useTheme();
  const { t } = useTranslation();
  
  // Synchroniser la langue
  useSyncLanguage();
  
  // Récupérer les données de l'utilisateur
  const user = useUser();
  const { updateUserData } = useUserActions();
  
  // État local pour les champs du formulaire
  const [fullName, setFullName] = useState(user.fullName || '');
  const [email, setEmail] = useState(user.email || '');
  const [loading, setLoading] = useState(false);
  
  // Sauvegarder les modifications
  const handleSave = async () => {
    setLoading(true);
    
    try {
      await updateUserData({
        fullName,
        email,
      });
      
      // Revenir à l'écran précédent
      navigation.goBack();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('profile.editProfile')}</Text>
        <View style={styles.backButton} />
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
          {/* Photo de profil */}
          <View style={styles.avatarContainer}>
            {user.photoURL ? (
              <Avatar.Image
                size={100}
                source={{ uri: user.photoURL }}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatar, styles.defaultAvatar]}>
                <Ionicons name="person" size={60} color={colors.gray[400]} />
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
          
          {/* Formulaire de profil */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>{t('profile.myProfile')}</Text>
            
            <TextInput
              label={t('auth.fullName')}
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
              mode="outlined"
              outlineColor={colors.gray[300]}
              activeOutlineColor={theme.colors.primary}
            />
            
            <TextInput
              label={t('auth.email')}
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              mode="outlined"
              outlineColor={colors.gray[300]}
              activeOutlineColor={theme.colors.primary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          {/* Préférences de langue et devise */}
          <View style={styles.preferencesContainer}>
            <Text style={styles.sectionTitle}>{t('preferences.title')}</Text>
            <LanguageCurrencySelector />
          </View>
          
          {/* Bouton de sauvegarde */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSave}
              loading={loading}
              disabled={loading}
              style={styles.saveButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              {t('common.save')}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
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
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    paddingHorizontal: spacing[4],
  },
  backButton: {
    padding: spacing[2],
    width: 40,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.gray[800],
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[12],
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: spacing[6],
    marginBottom: spacing[4],
    position: 'relative',
  },
  avatar: {
    backgroundColor: colors.gray[300],
  },
  defaultAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  formContainer: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[6],
  },
  preferencesContainer: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[6],
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.gray[800],
    marginBottom: spacing[4],
  },
  input: {
    marginBottom: spacing[3],
    backgroundColor: colors.white,
  },
  buttonContainer: {
    paddingHorizontal: spacing[4],
    marginTop: spacing[4],
  },
  saveButton: {
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
});

export default EditProfileScreen; 