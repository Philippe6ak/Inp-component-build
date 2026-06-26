import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { medicationsService } from '../../../services/inphbMedicamentService';

export function UseEditMedications() {
  const queryClient = useQueryClient();

  const { mutate: editMedication, isPending: isEditing } = useMutation({
    mutationFn: ({ newMedicationsData, id }) =>
      medicationsService.creatEditMedications(newMedicationsData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicament'] });
      toast.success(' Mise à jour du medicament reussi');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la mise à jour du medicament');
    },
  });

  return { editMedication, isEditing };
}
