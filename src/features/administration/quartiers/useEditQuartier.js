import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { quartierService } from '../../../services/inphbquartiersService';

export function useEditQuartier() {
  const queryClient = useQueryClient();

  const { mutate: editQuartier, isPending: isEditing } = useMutation({
    mutationFn: ({ newQuartierData, id }) =>
      quartierService.createEditQuartier(newQuartierData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quartiers'] });
      toast.success('Quartier mis à jour avec succès');
    },
    onError: (error) => {
      toast.error(error.message || 'Échec de la modification du quartier');
    },
  });

  return { editQuartier, isEditing };
}
