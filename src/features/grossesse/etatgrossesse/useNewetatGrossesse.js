import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { etatGrossesseService } from '../../../services/inphbetatgrosService';

export function useNewetatGrossesse() {
  const queryClient = useQueryClient();

  const { mutate: createetatGrossesse, isPending: isCreating } = useMutation({
    mutationFn: etatGrossesseService.createEditEtatGrossesse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['etatsgrossesses'] });
      toast.success('État de grossesse ajouté avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout de l'état de grossesse");
    },
  });

  return { createetatGrossesse, isCreating };
}
