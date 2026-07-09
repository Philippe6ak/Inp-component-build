import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { examenService } from '../../../services/inphbexamenService';

export function UseNewExamen() {
  const queryClient = useQueryClient();

  const { mutate: createExamen, isPending: isCreating } = useMutation({
    mutationFn: examenService.createEditexamen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examen'] });
      toast.success('Examen ajoutée avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout de l'examen");
    },
  });

  return { createExamen, isCreating };
}
