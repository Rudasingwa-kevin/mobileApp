import React, { useState } from 'react';
import { StyleSheet, View, TextInput as RNTextInput, TextInputProps } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated } from 'react-native';

interface TextInputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: string;
  secureTextEntry?: boolean;
  touched?: boolean;
}

const TextInputField = ({
  label,
  error,
  icon,
  secureTextEntry = false,
  touched,
  ...props
}: TextInputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const animatedOpacity = new Animated.Value(0);
  
  React.useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: isFocused || props.value ? 1 : 0.7,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [isFocused, props.value]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={[
        styles.label, 
        isFocused && styles.focusedLabel,
        error && touched && styles.errorLabel
      ]}>
        {label}
      </Text>
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.focusedContainer,
        error && touched && styles.errorContainer
      ]}>
        {icon && (
          <Animated.View style={{ opacity: animatedOpacity }}>
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={error && touched ? '#FF5252' : isFocused ? '#4F46E5' : '#9E9E9E'}
              style={styles.icon}
            />
          </Animated.View>
        )}
        
        <RNTextInput
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#666666"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          selectionColor="#4F46E5"
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableRipple
            onPress={togglePasswordVisibility}
            rippleColor="rgba(79, 70, 229, 0.2)"
            style={styles.toggleButton}
          >
            <MaterialCommunityIcons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={22}
              color="#9E9E9E"
            />
          </TouchableRipple>
        )}
      </View>
      
      {error && touched && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#E5E5E5',
    fontWeight: '500',
  },
  focusedLabel: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  errorLabel: {
    color: '#FF5252',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 12,
    height: 56,
  },
  focusedContainer: {
    borderColor: '#4F46E5',
    backgroundColor: '#222222',
  },
  errorContainer: {
    borderColor: '#FF5252',
    backgroundColor: '#2C1A1A',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#E5E5E5',
    paddingVertical: 10,
  },
  toggleButton: {
    padding: 8,
  },
  errorText: {
    color: '#FF5252',
    fontSize: 12,
    marginTop: 4,
    paddingLeft: 4,
  },
});

export default TextInputField; 