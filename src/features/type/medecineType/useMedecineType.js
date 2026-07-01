import { useQuery } from '@tanstack/react-query';
import { medecineTypeService } from '../../../services/inphbMedecineTypeService';

export function useMedecineType() {
  const {
    isLoading,
    error,
    data: medecineType,
  } = useQuery({
    queryKey: ['medecineType'],
    queryFn: medecineTypeService.getTypeMedecine,
  });

  return { isLoading, error, medecineType };
}
