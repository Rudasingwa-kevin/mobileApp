import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import PreferenceCarouselScreen from '../screens/PreferenceCarouselScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  PreferenceCarousel: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen 
        name="PreferenceCarousel" 
        component={PreferenceCarouselScreen}
        options={{
          animation: 'fade_from_bottom',
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator; 