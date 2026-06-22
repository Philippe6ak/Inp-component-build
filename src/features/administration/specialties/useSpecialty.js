import { useQuery } from '@tanstack/react-query';
import { specsService } from '../../../services/inphbSpecsService';

export function useSpecialty() {
  const {
    isLoading,
    error,
    data: specialties,
  } = useQuery({
    queryKey: ['specialties'],
    queryFn: specsService.getSpecialties,
  });

  return { isLoading, error, specialties };
}
