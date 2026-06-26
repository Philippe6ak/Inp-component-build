import { useQuery } from '@tanstack/react-query';
import { medicationsService } from '../../../services/inphbMedicamentService';

export function UseMedications() {
  const {
    isLoading,
    error,
    data: medicament,
  } = useQuery({
    queryKey: ['medicament'],
    queryFn: medicationsService.getMedications,
  });

  return { isLoading, error, medicament };
}
