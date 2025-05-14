import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { useMessagesStore } from '../store/messages';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

type NewMessageScreenRouteProp = RouteProp<RootStackParamList, 'NewMessage'>;
type NewMessageScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewMessage'>;

const NewMessageScreen = () => {
  const route = useRoute<NewMessageScreenRouteProp>();
  const navigation = useNavigation<NewMessageScreenNavigationProp>();
  const { propertyId, propertyTitle, ownerId, ownerName, ownerAvatar } = route.params;
  
  const [message, setMessage] = useState('');
  const { startNewConversation, sendMessage } = useMessagesStore();
  
  const handleSend = async () => {
    if (message.trim().length === 0) return;
    
    // Start a new conversation or get existing one
    const conversationId = startNewConversation(
      propertyId,
      propertyTitle,
      ownerId,
      ownerName,
      ownerAvatar
    );
    
    // Send the message
    await sendMessage(conversationId, message.trim());
    
    // Navigate to the conversation
    navigation.replace('Conversation', { conversationId });
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color={colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.title}>Nouveau message</Text>
        <View style={styles.placeholder} />
      </View>
      
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView style={styles.scrollView}>
          <Animated.View 
            entering={FadeIn.duration(300)}
            style={styles.propertyContainer}
          >
            <Text style={styles.sectionTitle}>Bien concerné</Text>
            
            <View style={styles.propertyCard}>
              {ownerAvatar && (
                <Image 
                  source={{ uri: ownerAvatar }}
                  style={styles.propertyImage}
                  resizeMode="cover"
                />
              )}
              
              <View style={styles.propertyInfo}>
                <Text style={styles.ownerName}>
                  {ownerName}
                </Text>
                <Text style={styles.propertyTitle} numberOfLines={2}>
                  {propertyTitle}
                </Text>
              </View>
            </View>
          </Animated.View>
          
          <Animated.View 
            entering={FadeInDown.delay(100).duration(300)}
            style={styles.messageContainer}
          >
            <Text style={styles.sectionTitle}>Votre message</Text>
            
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Rédigez votre message pour le propriétaire..."
                placeholderTextColor={colors.gray[500]}
                multiline
                textAlignVertical="top"
                value={message}
                onChangeText={setMessage}
              />
            </View>
            
            <View style={styles.tipContainer}>
              <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
              <Text style={styles.tipText}>
                Conseil : présentez-vous et expliquez votre intérêt pour le bien.
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
        
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.sendButton,
              message.trim().length === 0 && styles.sendButtonDisabled
            ]}
            onPress={handleSend}
            disabled={message.trim().length === 0}
          >
            <Text style={[
              styles.sendButtonText,
              message.trim().length === 0 && styles.sendButtonTextDisabled
            ]}>
              Envoyer
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  backButton: {
    padding: spacing[1],
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.gray[800],
  },
  placeholder: {
    width: 40,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  propertyContainer: {
    padding: spacing[4],
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.gray[800],
    marginBottom: spacing[3],
  },
  propertyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[3],
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  propertyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing[3],
  },
  propertyInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.gray[800],
    marginBottom: spacing[1],
  },
  propertyTitle: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[700],
  },
  messageContainer: {
    padding: spacing[4],
    paddingTop: 0,
  },
  textInputContainer: {
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray[200],
    minHeight: 150,
    padding: spacing[3],
  },
  textInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.gray[800],
    minHeight: 140,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing[3],
    padding: spacing[3],
    backgroundColor: 'rgba(255, 90, 95, 0.05)',
    borderRadius: borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  tipText: {
    flex: 1,
    marginLeft: spacing[2],
    fontSize: typography.fontSize.sm,
    color: colors.gray[700],
    lineHeight: typography.lineHeight.md,
  },
  footer: {
    padding: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    backgroundColor: colors.white,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingVertical: spacing[3],
    alignItems: 'center',
    ...shadows.sm,
  },
  sendButtonDisabled: {
    backgroundColor: colors.gray[200],
  },
  sendButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.white,
  },
  sendButtonTextDisabled: {
    color: colors.gray[500],
  },
});

export default NewMessageScreen; 