import { useQuery } from '@tanstack/react-query';
import { typeexamenService } from '../../../services/inphbtypeexamen';

export function useTypeExam() {
  const {
    isLoading,
    error,
    data: examens,
  } = useQuery({
    queryKey: ['examens'],
    queryFn: typeexamenService.getExamen,
  });

  return { isLoading, error, examens };
}
