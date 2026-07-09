import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { typeGrossesseService } from '../../../services/inphbtypegrossesseService';

export function useEdittypeGrossesse() {
  const queryClient = useQueryClient();

  const { mutate: edittypeGrossesse, isPending: isEditing } = useMutation({
    mutationFn: ({ newtypeGrossesseData, id }) =>
      typeGrossesseService.createEditTypeGrossesse(newtypeGrossesseData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['typegrossesses'] });
      toast.success('Mise à jour du type de grossesse reussi');
    },
    onError: (err) => {
      toast.error(
        err.message || 'Échec de la mise à jour du type de grossesse'
      );
    },
  });

  return { edittypeGrossesse, isEditing };
}
