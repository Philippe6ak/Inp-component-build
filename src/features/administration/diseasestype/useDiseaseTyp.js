import { useQuery } from '@tanstack/react-query';
import { diseaseService } from '../../../services/inphbDiseaseTypeService';

export function useDisease() {
  const {
    isLoading,
    error,
    data: diseases,
  } = useQuery({
    queryKey: ['diseases'],
    queryFn: diseaseService.getDiseases,
  });

  return { isLoading, error, diseases };
}
