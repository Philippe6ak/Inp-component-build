import { useQuery } from '@tanstack/react-query';
import { quartierService } from '../../../services/inphbquartiersService';

export function UseQuartiers() {
  const {
    isLoading,
    error,
    data: quartiers,
  } = useQuery({
    queryKey: ['quartiers'],
    queryFn: quartierService.getQuartier,
  });

  return { isLoading, error, quartiers };
}
