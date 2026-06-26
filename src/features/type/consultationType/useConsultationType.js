import { useQuery } from '@tanstack/react-query';
import { consulTypeService } from '../../../services/inphbconsulTypeService';

export function useConsultationType() {
  const {
    isLoading,
    error,
    data: consultationType,
  } = useQuery({
    queryKey: ['consultationType'],
    queryFn: consulTypeService.getTypeConsultations,
  });

  return { isLoading, error, consultationType };
}
