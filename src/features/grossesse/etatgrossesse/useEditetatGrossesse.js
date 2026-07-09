import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { etatGrossesseService } from '../../../services/inphbetatgrosService';

export function useEditetatGrossesse() {
  const queryClient = useQueryClient();

  const { mutate: editetatGrossesse, isPending: isEditing } = useMutation({
    mutationFn: ({ newetatGrossesseData, id }) =>
      etatGrossesseService.createEditEtatGrossesse(newetatGrossesseData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['etatsgrossesses'] });
      toast.success("Mise à jour de l'etat de grossesse reussi");
    },
    onError: (err) => {
      toast.error(
        err.message || "Échec de la mise à jour de l'etat de grossesse"
      );
    },
  });

  return { editetatGrossesse, isEditing };
}
