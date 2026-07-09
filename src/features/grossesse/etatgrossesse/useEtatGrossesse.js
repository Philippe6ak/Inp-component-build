import { useQuery } from '@tanstack/react-query';
import { etatGrossesseService } from '../../../services/inphbetatgrosService';

export const useEtatGrossesse = () => {
  const {
    isLoading,
    error,
    data: etatsgrossesses,
  } = useQuery({
    queryKey: ['etatsgrossesses'],
    queryFn: etatGrossesseService.getEtatGrossesse,
  });

  return { isLoading, error, etatsgrossesses };
};
