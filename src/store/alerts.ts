import { create } from 'zustand';
import { PropertyType, Amenity } from '../types/index';

export interface Alert {
  id: string;
  name: string;
  enabled: boolean;
  criteria: {
    propertyTypes?: PropertyType[];
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
    amenities?: Amenity[];
    districts?: string[];
  };
}

interface AlertState {
  alerts: Alert[];
  notificationsEnabled: boolean;
  createAlert: (alert: Omit<Alert, 'id'>) => void;
  updateAlert: (id: string, alert: Partial<Alert>) => void;
  removeAlert: (id: string) => void;
  toggleAlertStatus: (id: string) => void;
  toggleNotifications: () => void;
  renameAlert: (id: string, name: string) => void;
}

// Fonction pour générer un ID unique
const generateId = () => Math.random().toString(36).substring(2, 9);

export const useAlertsStore = create<AlertState>((set) => ({
  alerts: [],
  notificationsEnabled: true,
  
  createAlert: (alert) => {
    const newAlert = { 
      ...alert, 
      id: generateId() 
    };
    
    set((state) => ({
      alerts: [...state.alerts, newAlert]
    }));
  },
  
  updateAlert: (id, updatedAlert) => {
    set((state) => ({
      alerts: state.alerts.map(alert => 
        alert.id === id ? { ...alert, ...updatedAlert } : alert
      )
    }));
  },
  
  removeAlert: (id) => {
    set((state) => ({
      alerts: state.alerts.filter(alert => alert.id !== id)
    }));
  },
  
  toggleAlertStatus: (id) => {
    set((state) => ({
      alerts: state.alerts.map(alert => 
        alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
      )
    }));
  },
  
  toggleNotifications: () => {
    set((state) => ({
      notificationsEnabled: !state.notificationsEnabled
    }));
  },
  
  renameAlert: (id, name) => {
    set((state) => ({
      alerts: state.alerts.map(alert => 
        alert.id === id ? { ...alert, name } : alert
      )
    }));
  }
})); 