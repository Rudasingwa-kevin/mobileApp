import React, { useEffect, useState } from 'react';
import { Snackbar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { create } from 'zustand';

// Types de toast
export type ToastType = 'success' | 'error' | 'info';

// Interface du store
interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
  duration: number;
  
  // Actions
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: () => void;
}

// Store Zustand pour le toast
export const useToastStore = create<ToastState>((set) => ({
  visible: false,
  message: '',
  type: 'info',
  duration: 3000,
  
  showToast: (message: string, type: ToastType = 'info', duration: number = 3000) => {
    set({ message, type, duration, visible: true });
  },
  
  hideToast: () => {
    set({ visible: false });
  }
}));

// Hooks raccourcis
export const useToast = () => {
  const { showToast, hideToast } = useToastStore();
  return { showToast, hideToast };
};

// Composant principal
const ToastManager: React.FC = () => {
  const { visible, message, type, duration, hideToast } = useToastStore();
  const [color, setColor] = useState('#333333');
  
  // Déterminer la couleur du toast en fonction du type
  useEffect(() => {
    switch (type) {
      case 'success':
        setColor('#4CAF50');
        break;
      case 'error':
        setColor('#F44336');
        break;
      case 'info':
      default:
        setColor('#2196F3');
        break;
    }
  }, [type]);
  
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={hideToast}
        duration={duration}
        style={[styles.snackbar, { backgroundColor: color }]}
        action={{
          label: 'OK',
          onPress: hideToast,
          color: 'white',
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  snackbar: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default ToastManager; 