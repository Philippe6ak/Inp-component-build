import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { medicationsService } from '../../../services/inphbMedicamentService';

export function UseDeleteMedication() {
  const queryClient = useQueryClient();

  const { mutate: deleteMedicament, isPending: isDeleting } = useMutation({
    mutationFn: (id) => medicationsService.deleteMedications(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicament'] });
      toast.success('Medicament supprimée avec succès');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la suppression du medicament');
    },
  });

  return { deleteMedicament, isDeleting };
}
