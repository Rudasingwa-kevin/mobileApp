import { useState, useEffect } from 'react';
import { Property } from '../types';
import { mockListings } from '../data/mockListings';

/**
 * Hook personnalisé pour récupérer les détails d'un logement à partir de son ID
 * 
 * @param id - L'identifiant du logement à récupérer
 * @returns Un objet contenant le logement, l'état de chargement et les erreurs éventuelles
 */
const useListingById = (id: string | undefined) => {
  const [listing, setListing] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID du logement non défini');
      setIsLoading(false);
      return;
    }

    // Simuler un appel API avec délai
    setIsLoading(true);
    const timer = setTimeout(() => {
      try {
        // Chercher le logement dans les données mock
        const foundListing = mockListings.find(listing => listing.id === id);
        
        if (foundListing) {
          setListing(foundListing);
          setError(null);
        } else {
          setListing(null);
          setError('Logement non trouvé');
        }
      } catch (err) {
        setError('Erreur lors de la récupération du logement');
        console.error('Erreur de récupération:', err);
      } finally {
        setIsLoading(false);
      }
    }, 800); // Délai simulé de 800ms

    return () => clearTimeout(timer);
  }, [id]);

  return { listing, isLoading, error };
};

export default useListingById; 