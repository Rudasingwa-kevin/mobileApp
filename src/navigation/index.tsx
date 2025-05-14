import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';

// Screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LogementDetailScreen from '../screens/LogementDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PreferenceCarouselScreen from '../screens/PreferenceCarouselScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SavedScreen from '../screens/SavedScreen';
import MapScreen from '../screens/MapScreen';
import MessageListScreen from '../screens/MessageListScreen';
import ConversationScreen from '../screens/ConversationScreen';
import NewMessageScreen from '../screens/NewMessageScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AlertPreferencesScreen from '../screens/AlertPreferencesScreen';
import LeaveReviewScreen from '../screens/LeaveReviewScreen';
import LocalGuideScreen from '../screens/LocalGuideScreen';
import GuideDetailScreen from '../screens/GuideDetailScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

// Navigators
import AuthNavigator from './AuthNavigator';

// State
import { useUserStore } from '../store/user';
import { useMessagesStore } from '../store/messages';
import { useFavoritesStore } from '../store/favorites';

// Types
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Tab Navigator Component
const TabNavigator = () => {
  const theme = useTheme();
  const { totalUnreadCount } = useMessagesStore();
  const { favoriteIds } = useFavoritesStore();
  const favoriteCount = favoriteIds.length;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[500],
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.gray[200],
          height: 55,
          paddingBottom: 5,
          ...Platform.select({
            ios: {
              shadowColor: colors.gray[300],
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.15,
              shadowRadius: 3,
            },
            android: {
              elevation: 8,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginBottom: 3,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Explorer',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{
          tabBarLabel: 'Carte',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favoris',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="heart-outline" size={size} color={color} />
              {favoriteCount > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>
                    {favoriteCount > 9 ? '9+' : favoriteCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="MessagesList" 
        component={MessageListScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="chatbubble-outline" size={size} color={color} />
              {totalUnreadCount > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>
                    {totalUnreadCount > 9 ? '9+' : totalUnreadCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Root Navigator Component
const AppNavigator = () => {
  const theme = useTheme();
  const isAuthenticated = useUserStore(state => state.user.isLoggedIn);
  const hasCompletedOnboarding = useUserStore(state => state.user.hasCompletedOnboarding);

  const screenOptions = {
    headerShown: true,
    headerTitleStyle: {
      fontWeight: '600',
      fontSize: typography.fontSize.lg,
      color: colors.gray[800],
    },
    headerStyle: {
      backgroundColor: colors.white,
      shadowColor: 'transparent',
      borderBottomWidth: 0,
    },
    headerShadowVisible: false,
    headerBackTitleVisible: false,
    headerTintColor: colors.gray[800],
    contentStyle: {
      backgroundColor: colors.white,
    },
    animation: 'slide_from_right',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
      >
        {!isAuthenticated ? (
          // Flux d'authentification
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          // Flux après authentification
          !hasCompletedOnboarding ? (
            <Stack.Screen 
              name="PreferenceCarousel" 
              component={PreferenceCarouselScreen}
              options={{ headerShown: false }}
            />
          ) : (
            // Flux principal une fois les préférences définies
            <>
              <Stack.Screen
                name="MainTabs"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PropertyDetails"
                component={LogementDetailScreen}
                options={{
                  headerTransparent: true,
                  headerTitle: '',
                  headerBackVisible: true,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{
                  headerShown: false,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                  headerShown: false,
                  animation: 'slide_from_bottom',
                }}
              />
              <Stack.Screen
                name="Conversation"
                component={ConversationScreen}
                options={{
                  headerShown: false,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="NewMessage"
                component={NewMessageScreen}
                options={{
                  headerShown: false,
                  animation: 'slide_from_bottom',
                }}
              />
              <Stack.Screen
                name="LeaveReview"
                component={LeaveReviewScreen}
                options={{
                  headerShown: false,
                  animation: 'slide_from_bottom',
                }}
              />
              <Stack.Screen
                name="LocalGuide"
                component={LocalGuideScreen}
                options={{
                  headerShown: false,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="GuideDetail"
                component={GuideDetailScreen}
                options={{
                  headerShown: false,
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="AlertPreferences"
                component={AlertPreferencesScreen}
                options={{
                  headerShown: false,
                  animation: 'slide_from_bottom',
                }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                  headerShown: false,
                  animation: 'slide_from_right',
                }}
              />
            </>
          )
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  badgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
});

export default AppNavigator; 