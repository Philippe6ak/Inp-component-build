import { useQuery } from '@tanstack/react-query';
import { patientsService } from '../../services/inphbPatientsService';

export function useSearchPatient(type_personne, matricule) {
  const {
    isFetching,
    error,
    data: patientSearch,
  } = useQuery({
    queryKey: ['patient', type_personne, matricule],
    queryFn: () => patientsService.searchPatient({ type_personne, matricule }),
    enabled: Boolean(type_personne) && Boolean(matricule),
    retry: false,
  });

  return { isLoading: isFetching, error, patientSearch };
}
