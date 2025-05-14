import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';

interface MessageInputBarProps {
  onSend: (text: string) => void;
}

const MessageInputBar: React.FC<MessageInputBarProps> = ({ onSend }) => {
  const [text, setText] = useState('');
  
  const handleSend = () => {
    if (text.trim().length === 0) return;
    
    onSend(text.trim());
    setText('');
    Keyboard.dismiss();
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.attachButton}>
        <Ionicons name="attach" size={24} color={colors.gray[600]} />
      </TouchableOpacity>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Écrire un message..."
          placeholderTextColor={colors.gray[500]}
          value={text}
          onChangeText={setText}
          multiline
          maxLength={500}
          returnKeyType="default"
        />
      </View>
      
      <TouchableOpacity 
        style={[
          styles.sendButton,
          text.trim().length === 0 && styles.sendButtonDisabled
        ]}
        onPress={handleSend}
        disabled={text.trim().length === 0}
      >
        <Ionicons name="send" size={20} color={text.trim().length === 0 ? colors.gray[400] : colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    ...Platform.select({
      ios: {
        paddingBottom: spacing[6], // Extra padding for iOS to avoid keyboard
      },
    }),
  },
  attachButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[2],
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: Platform.OS === 'ios' ? spacing[2] : 0,
    minHeight: 40,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.gray[800],
    maxHeight: 100, // Maximum height before scrolling
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing[2],
    ...shadows.sm,
  },
  sendButtonDisabled: {
    backgroundColor: colors.gray[200],
  },
});

export default MessageInputBar; 