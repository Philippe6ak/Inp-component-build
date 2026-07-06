import { useQuery } from '@tanstack/react-query';
import { serviceSante } from '../../../services/inphbServiceSante';

export function useServices() {
  const {
    isLoading,
    error,
    data: services,
  } = useQuery({
    queryKey: ['services'],
    queryFn: serviceSante.getServices,
  });

  return { isLoading, error, services };
}
