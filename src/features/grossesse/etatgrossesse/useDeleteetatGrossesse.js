import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { etatGrossesseService } from '../../../services/inphbetatgrosService';

export function useDeleteetatGrossesse() {
  const queryClient = useQueryClient();

  const { mutate: deleteetatGrossesse, isPending: isDeleting } = useMutation({
    mutationFn: (id) => etatGrossesseService.deleteEtatGrossesse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['etatsgrossesses'] });
      toast.success('État de grossesse supprimé avec succès');
    },
    onError: (err) => {
      toast.error(
        err.message || "Échec de la suppression de l'État de grossesse"
      );
    },
  });

  return { deleteetatGrossesse, isDeleting };
}
