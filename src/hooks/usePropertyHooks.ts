import { useApi, useApiAction } from './useApi';
import { propertyService } from '../services/api';
import { Property, SearchFilters } from '../types';

/**
 * Hook pour récupérer toutes les propriétés
 */
export function useProperties() {
  return useApi(propertyService.getAll, []);
}

/**
 * Hook pour récupérer une propriété par son ID
 */
export function useProperty(id: string) {
  return useApi(propertyService.getById, [id], [id]);
}

/**
 * Hook pour rechercher des propriétés
 */
export function usePropertySearch(query: string, filters?: SearchFilters) {
  return useApi(propertyService.search, [query, filters], [query, JSON.stringify(filters)]);
}

/**
 * Hook pour récupérer les propriétés d'un propriétaire
 */
export function useOwnerProperties(ownerId: string) {
  return useApi(propertyService.getByOwnerId, [ownerId], [ownerId]);
}

/**
 * Hook pour créer une propriété
 */
export function useCreateProperty() {
  return useApiAction(propertyService.create);
}

/**
 * Hook pour mettre à jour une propriété
 */
export function useUpdateProperty() {
  return useApiAction<Property, [string, Partial<Property>]>(
    (id, data) => propertyService.update(id, data)
  );
}

/**
 * Hook pour supprimer une propriété
 */
export function useDeleteProperty() {
  return useApiAction<void, [string]>(propertyService.delete);
} 