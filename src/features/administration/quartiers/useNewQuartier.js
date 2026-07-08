import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { quartierService } from '../../../services/inphbquartiersService';

export function useNewQuartier() {
  const queryClient = useQueryClient();

  const { mutate: createQuartier, isPending: isCreating } = useMutation({
    mutationFn: quartierService.createEditQuartier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quartiers'] });
      toast.success('Quartier ajouté avec succès');
    },
    onError: (error) => {
      toast.error(error.message || 'Échec de l’ajout du quartier');
    },
  });

  return { createQuartier, isCreating };
}
