import { useState, useEffect, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook générique pour effectuer des appels API avec gestion d'état
 * @param apiFunction La fonction de service API à appeler
 * @param initialArgs Les arguments initiaux à passer à la fonction API
 * @param deps Dépendances pour déclencher une nouvelle requête
 * @returns État de l'API: données, chargement, erreur et fonction de rechargement
 */
export function useApi<T, Args extends any[]>(
  apiFunction: (...args: Args) => Promise<T>,
  initialArgs: Args,
  deps: React.DependencyList = []
): ApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...initialArgs);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('Error in useApi:', err);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, ...initialArgs, ...deps]);

  // Effectuer l'appel API initial
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fonction pour rafraichir les données
  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

/**
 * Hook générique pour effectuer une action API avec gestion d'état
 * @returns État et fonctions pour exécuter l'action API
 */
export function useApiAction<T, Args extends any[]>(
  apiFunction: (...args: Args) => Promise<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const execute = useCallback(
    async (...args: Args) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const result = await apiFunction(...args);
        setData(result);
        setSuccess(true);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        console.error('Error in useApiAction:', err);
        setSuccess(false);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return { execute, loading, error, data, success, reset };
} 