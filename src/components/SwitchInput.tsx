import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform,
  ViewStyle,
  Switch
} from 'react-native';
import { colors, spacing, typography } from '../theme';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface SwitchInputProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  icon?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

const SwitchInput: React.FC<SwitchInputProps> = ({
  label,
  description,
  value,
  onValueChange,
  icon,
  style,
  disabled = false
}) => {
  return (
    <Animated.View 
      entering={FadeIn.duration(300)}
      style={[styles.container, style]}
    >
      <View style={styles.content}>
        {icon && (
          <View style={styles.iconContainer}>
            <Ionicons name={icon as any} size={22} color={colors.primary} />
          </View>
        )}
        
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
        
        <Switch
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          trackColor={{ 
            false: colors.gray[300], 
            true: `${colors.primary}80` 
          }}
          thumbColor={value ? colors.primary : colors.gray[100]}
          ios_backgroundColor={colors.gray[300]}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: spacing[4],
    borderRadius: 12,
    marginBottom: spacing[3],
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: spacing[3],
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.gray[800],
    marginBottom: spacing[1],
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.gray[600],
  },
});

export default SwitchInput; 