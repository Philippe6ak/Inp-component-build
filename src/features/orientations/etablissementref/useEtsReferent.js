import { useQuery } from '@tanstack/react-query';
import { etsreferentsService } from '../../../services/inphbetsreferentService';

export function useEtsReferent() {
  const {
    isLoading,
    error,
    data: etablissementsreferents,
  } = useQuery({
    queryKey: ['etablissementsreferents'],
    queryFn: etsreferentsService.getEtsReferent,
  });

  return { isLoading, error, etablissementsreferents };
}
