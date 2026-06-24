import { useQuery } from '@tanstack/react-query';
import { coutsService } from '../../../services/inphbcoutService';

export function UseCosts() {
  const {
    isLoading,
    error,
    data: couts,
  } = useQuery({
    queryKey: ['couts'],
    queryFn: coutsService.getCost,
  });

  return { isLoading, error, couts };
}
