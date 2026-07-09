import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { typeGrossesseService } from '../../../services/inphbtypegrossesseService';

export function useNewtypeGrossesse() {
  const queryClient = useQueryClient();

  const { mutate: createtypeGrossesse, isPending: isCreating } = useMutation({
    mutationFn: typeGrossesseService.createEditTypeGrossesse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['typegrossesses'] });
      toast.success('Type de grossesse ajouté avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout du type de grossesse");
    },
  });

  return { createtypeGrossesse, isCreating };
}
