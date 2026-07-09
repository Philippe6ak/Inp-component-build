import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { typeGrossesseService } from '../../../services/inphbtypegrossesseService';

export function useDeletetypeGrossesse() {
  const queryClient = useQueryClient();

  const { mutate: deletetypeGrossesse, isPending: isDeleting } = useMutation({
    mutationFn: (id) => typeGrossesseService.deleteTypeGrossesse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['typegrossesses'] });
      toast.success('Type de grossesse supprimé avec succès');
    },
    onError: (err) => {
      toast.error(
        err.message || 'Échec de la suppression du type de grossesse'
      );
    },
  });

  return { deletetypeGrossesse, isDeleting };
}
