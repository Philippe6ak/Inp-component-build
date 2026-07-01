import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { coutsService } from '../../../services/inphbcoutService';

export function UseCreateCost() {
  const queryClient = useQueryClient();

  const { mutate: createCouts, isPending: isCreatingCouts } = useMutation({
    mutationFn: coutsService.createEditCost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['couts'] });
      toast.success('ajoutée du couts reussi');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout du cout");
    },
  });

  return { createCouts, isCreatingCouts };
}
