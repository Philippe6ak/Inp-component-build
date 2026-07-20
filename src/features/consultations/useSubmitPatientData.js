import { useQuery } from '@tanstack/react-query';
import { patientsService } from '../../services/inphbPatientsService';

export function useSubmitPatientData() {
  const {
    isLoading,
    error,
    data: patientData,
  } = useQuery({
    queryKey: ['patient'],
    queryFn: () => patientsService.submitPatientData(),
  });

  return { isLoading, error, patientData };
}
