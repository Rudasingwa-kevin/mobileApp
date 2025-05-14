import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Avatar, Text, Button, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useUser, useUserActions } from '../store/user';
import { colors, spacing, typography, borderRadius } from '../theme';
import { useTranslation } from 'react-i18next';
import { useSyncLanguage } from '../utils/i18n';
import LanguageCurrencySelector from '../components/LanguageCurrencySelector';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

interface ProfileActionItemProps {
  title: string;
  icon: string;
  onPress: () => void;
  showArrow?: boolean;
}

// Composant pour un élément d'action du profil
const ProfileActionItem: React.FC<ProfileActionItemProps> = ({
  title,
  icon,
  onPress,
  showArrow = true,
}) => {
  return (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
      <View style={styles.actionIcon}>
        <Ionicons name={icon} size={22} color={colors.gray[600]} />
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
      {showArrow && (
        <Ionicons name="chevron-forward" size={18} color={colors.gray[400]} />
      )}
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const user = useUser();
  const { logout } = useUserActions();
  const { t } = useTranslation();
  
  // Synchroniser la langue
  useSyncLanguage();

  // Naviguer vers l'écran d'édition du profil
  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  // Gérer la déconnexion
  const handleLogout = async () => {
    await logout();
    // La navigation sera gérée automatiquement par le changement d'état de connexion
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('profile.myProfile')}</Text>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête du profil */}
        <View style={styles.profileHeader}>
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
          <Text style={styles.userName}>{user.fullName || t('common.welcome')}</Text>
          <Text style={styles.userEmail}>{user.email || ''}</Text>
          
          <Button
            mode="outlined"
            onPress={navigateToEditProfile}
            style={styles.editButton}
            labelStyle={styles.editButtonLabel}
          >
            {t('profile.editProfile')}
          </Button>
        </View>
        
        <Divider style={styles.divider} />
        
        {/* Préférences */}
        <Text style={styles.sectionTitle}>{t('preferences.title')}</Text>
        
        <View style={styles.preferencesContainer}>
          <LanguageCurrencySelector />
        </View>
        
        <Divider style={styles.divider} />
        
        {/* Autres actions */}
        <Text style={styles.sectionTitle}>{t('profile.settings')}</Text>
        
        <View style={styles.actionsContainer}>
          <ProfileActionItem
            icon="notifications-outline"
            title={t('preferences.notifications')}
            onPress={() => navigation.navigate('AlertPreferences')}
          />
          <ProfileActionItem
            icon="help-circle-outline"
            title={t('profile.help')}
            onPress={() => navigation.navigate('LocalGuide')}
          />
          <ProfileActionItem
            icon="information-circle-outline"
            title={t('profile.about')}
            onPress={() => navigation.navigate('GuideDetail', { guideId: 1 })}
          />
          <ProfileActionItem
            icon="log-out-outline"
            title={t('profile.logout')}
            onPress={handleLogout}
            showArrow={false}
          />
        </View>
      </ScrollView>
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
    justifyContent: 'center',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    paddingHorizontal: spacing[4],
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.gray[800],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[12],
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing[6],
  },
  avatar: {
    backgroundColor: colors.gray[300],
    marginBottom: spacing[3],
  },
  defaultAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  userName: {
    fontSize: typography.fontSize.xl,
    fontWeight: '600',
    color: colors.gray[800],
    marginBottom: spacing[1],
  },
  userEmail: {
    fontSize: typography.fontSize.base,
    color: colors.gray[600],
    marginBottom: spacing[4],
  },
  editButton: {
    borderColor: colors.primary,
    borderRadius: borderRadius.lg,
  },
  editButtonLabel: {
    color: colors.primary,
  },
  divider: {
    marginHorizontal: spacing[4],
    marginVertical: spacing[2],
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.gray[800],
    marginTop: spacing[4],
    marginBottom: spacing[2],
    paddingHorizontal: spacing[4],
  },
  preferencesContainer: {
    paddingHorizontal: spacing[4],
  },
  actionsContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing[4],
    ...Platform.select({
      ios: {
        shadowColor: colors.gray[300],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  actionIcon: {
    width: 24,
    alignItems: 'center',
    marginRight: spacing[3],
  },
  actionTitle: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.gray[800],
  },
});

export default ProfileScreen; 