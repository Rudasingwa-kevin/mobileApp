import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Message } from '../data/mockMessages';
import { colors, spacing, typography, borderRadius } from '../theme';
import { currentUser } from '../data/mockMessages';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isCurrentUser = message.user.id === currentUser.id;
  
  // Format time (HH:MM)
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <View style={[
      styles.container,
      isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer
    ]}>
      <View style={[
        styles.bubble,
        isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
      ]}>
        <Text style={[
          styles.messageText,
          isCurrentUser ? styles.currentUserText : styles.otherUserText
        ]}>
          {message.text}
        </Text>
      </View>
      
      <View style={[
        styles.messageInfo,
        isCurrentUser ? styles.messageInfoRight : styles.messageInfoLeft
      ]}>
        <Text style={styles.timeText}>{formatTime(message.createdAt)}</Text>
        
        {isCurrentUser && (
          <View style={styles.statusContainer}>
            {message.read ? (
              <Ionicons name="checkmark-done" size={14} color={colors.primary} style={styles.statusIcon} />
            ) : message.received ? (
              <Ionicons name="checkmark-done" size={14} color={colors.gray[500]} style={styles.statusIcon} />
            ) : message.sent ? (
              <Ionicons name="checkmark" size={14} color={colors.gray[500]} style={styles.statusIcon} />
            ) : null}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing[2],
    maxWidth: '80%',
  },
  currentUserContainer: {
    alignSelf: 'flex-end',
    marginRight: spacing[3],
  },
  otherUserContainer: {
    alignSelf: 'flex-start',
    marginLeft: spacing[3],
  },
  bubble: {
    borderRadius: borderRadius.message,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  currentUserBubble: {
    backgroundColor: 'rgba(255, 90, 95, 0.12)',
    borderTopRightRadius: borderRadius.xs,
  },
  otherUserBubble: {
    backgroundColor: colors.gray[100],
    borderTopLeftRadius: borderRadius.xs,
  },
  messageText: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.md,
  },
  currentUserText: {
    color: colors.gray[800],
  },
  otherUserText: {
    color: colors.gray[800],
  },
  messageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing[1],
  },
  messageInfoRight: {
    justifyContent: 'flex-end',
    paddingRight: spacing[1],
  },
  messageInfoLeft: {
    justifyContent: 'flex-start',
    paddingLeft: spacing[1],
  },
  timeText: {
    fontSize: typography.fontSize.xs,
    color: colors.gray[500],
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing[1],
  },
  statusIcon: {
    marginLeft: 2,
  },
});

export default ChatBubble; 