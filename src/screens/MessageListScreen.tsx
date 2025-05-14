import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadows } from '../theme';
import { useMessagesStore } from '../store/messages';
import ConversationListItem from '../components/ConversationListItem';
import Animated, { FadeIn } from 'react-native-reanimated';

type MessageListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MessagesList'>;

const MessageListScreen = () => {
  const navigation = useNavigation<MessageListScreenNavigationProp>();
  const { conversations } = useMessagesStore();
  
  const handleConversationPress = (conversationId: string) => {
    navigation.navigate('Conversation', { conversationId });
  };
  
  const sortedConversations = [...conversations].sort(
    (a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime()
  );
  
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="chatbubble-ellipses-outline" size={60} color={colors.gray[300]} />
      <Text style={styles.emptyTitle}>Aucun message</Text>
      <Text style={styles.emptyText}>
        Commencez à explorer des logements et contactez les propriétaires pour débuter une conversation.
      </Text>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={22} color={colors.gray[800]} />
        </TouchableOpacity>
      </View>
      
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={styles.listContainer}
      >
        <FlatList
          data={sortedConversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ConversationListItem 
              conversation={item} 
              onPress={handleConversationPress}
            />
          )}
          ListEmptyComponent={renderEmptyList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            sortedConversations.length === 0 ? { flex: 1 } : undefined
          }
        />
      </Animated.View>
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
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.gray[800],
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[6],
  },
  emptyTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.gray[800],
    marginTop: spacing[4],
    marginBottom: spacing[2],
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: typography.lineHeight.md,
  },
});

export default MessageListScreen; 