import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadows } from '../theme';

interface ChatHeaderProps {
  userName: string;
  userAvatar: string;
  propertyTitle: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ userName, userAvatar, propertyTitle }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.gray[800]} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.centerSection} activeOpacity={0.8}>
        <Image 
          source={{ uri: userAvatar }} 
          style={styles.avatar} 
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName} numberOfLines={1}>
            {userName}
          </Text>
          <Text style={styles.propertyTitle} numberOfLines={1}>
            {propertyTitle}
          </Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="ellipsis-vertical" size={20} color={colors.gray[800]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[2],
    height: Platform.OS === 'ios' ? 88 : 56, // Extra height for iOS status bar
    paddingTop: Platform.OS === 'ios' ? 32 : 0, // Padding for iOS status bar
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    ...shadows.sm,
  },
  leftSection: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    padding: spacing[1],
  },
  centerSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: spacing[2],
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.gray[800],
  },
  propertyTitle: {
    fontSize: typography.fontSize.xs,
    color: colors.gray[600],
  },
  rightSection: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButton: {
    padding: spacing[1],
  },
});

export default ChatHeader; 