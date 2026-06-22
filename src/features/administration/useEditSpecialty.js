import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { specsService } from '../../services/inphbSpecsService';

export function useEditSpecialty() {
  const queryClient = useQueryClient();

  const { mutate: editSpecialty, isPending: isEditing } = useMutation({
    mutationFn: ({ newSpecialtyData, id }) =>
      specsService.createEditSpecialty(newSpecialtyData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] });
      toast.success('Spécialté mise à jour avec succès');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la mise à jour de la spécialité');
    },
  });

  return { editSpecialty, isEditing };
}
