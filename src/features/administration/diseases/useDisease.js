import { useQuery } from '@tanstack/react-query';
import { diseaseService } from '../../../services/inphbDiseaseService';

export function useDisease() {
  const {
    isLoading,
    error,
    data: disease,
  } = useQuery({
    queryKey: ['disease'],
    queryFn: diseaseService.getDiseases,
  });

  return { isLoading, error, disease };
}
