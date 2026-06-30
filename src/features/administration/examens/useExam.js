import { useQuery } from '@tanstack/react-query';
import { examenService } from '../../../services/inphbExamenService';

export function UseExamen() {
  const {
    isLoading,
    error,
    data: examen,
  } = useQuery({
    queryKey: ['examen'],
    queryFn: examenService.getExamen,
  });

  return { isLoading, error, examen };
}
