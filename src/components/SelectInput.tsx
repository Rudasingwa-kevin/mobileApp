import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  ViewStyle
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../theme';
import Animated, { FadeIn } from 'react-native-reanimated';

interface SelectOption {
  value: string;
  label: string;
  icon?: string | React.ReactNode;
}

interface SelectInputProps {
  label: string;
  value: string;
  options: SelectOption[];
  onSelect: () => void;
  style?: ViewStyle;
  error?: string;
  disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  options,
  onSelect,
  style,
  error,
  disabled = false
}) => {
  const selectedOption = options.find(option => option.value === value);
  
  return (
    <Animated.View 
      entering={FadeIn.duration(300)}
      style={[styles.container, style]}
    >
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity 
        style={[
          styles.selectContainer,
          error ? styles.inputError : null,
          disabled ? styles.disabled : null
        ]}
        onPress={onSelect}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {selectedOption?.icon && (
          <View style={styles.iconContainer}>
            {typeof selectedOption.icon === 'string' ? (
              <Text style={styles.iconText}>{selectedOption.icon}</Text>
            ) : (
              selectedOption.icon
            )}
          </View>
        )}
        
        <Text style={styles.valueText}>
          {selectedOption?.label || ''}
        </Text>
        
        <Ionicons 
          name="chevron-down" 
          size={16} 
          color={disabled ? colors.gray[400] : colors.gray[600]} 
        />
      </TouchableOpacity>
      
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[3],
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    marginBottom: spacing[1],
    color: colors.gray[700],
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing[3],
    paddingVertical: Platform.OS === 'ios' ? spacing[3] : spacing[2],
    backgroundColor: colors.white,
  },
  iconContainer: {
    marginRight: spacing[2],
  },
  iconText: {
    fontSize: 16,
  },
  valueText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.gray[800],
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.sm,
    marginTop: spacing[1],
  },
  disabled: {
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[200],
    opacity: 0.7,
  },
});

export default SelectInput; 