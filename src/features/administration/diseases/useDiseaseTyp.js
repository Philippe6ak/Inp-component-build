import { useQuery } from '@tanstack/react-query';
import { diseaseTypeService } from '../../../services/inphbDiseaseTypeService';

export function useDisease() {
  const {
    isLoading,
    error,
    data: diseaseType,
  } = useQuery({
    queryKey: ['diseaseType'],
    queryFn: diseaseTypeService.getTypeDiseases,
  });

  return { isLoading, error, diseaseType };
}
