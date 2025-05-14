import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  SafeAreaView
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { colors } from '../theme';
import { useMessagesStore } from '../store/messages';
import ChatHeader from '../components/ChatHeader';
import ChatBubble from '../components/ChatBubble';
import MessageInputBar from '../components/MessageInputBar';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';

type ConversationScreenRouteProp = RouteProp<RootStackParamList, 'Conversation'>;

const ConversationScreen = () => {
  const route = useRoute<ConversationScreenRouteProp>();
  const { conversationId } = route.params;
  const flatListRef = useRef<FlatList>(null);
  
  const { getConversation, sendMessage, markConversationAsRead } = useMessagesStore();
  const conversation = getConversation(conversationId);
  
  useEffect(() => {
    // Mark conversation as read when opened
    if (conversation && conversation.unreadCount > 0) {
      markConversationAsRead(conversationId);
    }
  }, [conversationId]);
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (conversation?.messages.length && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }
  }, [conversation?.messages.length]);
  
  const handleSendMessage = async (text: string) => {
    await sendMessage(conversationId, text);
  };
  
  if (!conversation) {
    return null; // Loading state or redirect
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ChatHeader 
          userName={conversation.otherUser.name}
          userAvatar={conversation.otherUser.avatar}
          propertyTitle={conversation.propertyTitle}
        />
        
        <Animated.View 
          entering={FadeIn.duration(300)}
          style={styles.chatContainer}
        >
          <FlatList
            ref={flatListRef}
            data={conversation.messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Animated.View entering={SlideInRight.delay(index * 50).duration(300)}>
                <ChatBubble message={item} />
              </Animated.View>
            )}
            contentContainerStyle={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
            inverted={false}
          />
        </Animated.View>
        
        <MessageInputBar onSend={handleSendMessage} />
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
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
});

export default ConversationScreen; 