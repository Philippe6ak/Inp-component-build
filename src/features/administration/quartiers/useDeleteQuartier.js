import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { quartierService } from '../../../services/inphbquartiersService';

export function useDeleteQuartier() {
  const queryClient = useQueryClient();

  const { mutate: deleteQuartier, isPending: isDeleting } = useMutation({
    mutationFn: (id) => quartierService.deleteQuartier(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quartiers'] });
      toast.success('Quartier supprimé avec succès');
    },
    onError: (error) => {
      toast.error(error.message || 'Échec de la suppression du quartier');
    },
  });

  return { deleteQuartier, isDeleting };
}
