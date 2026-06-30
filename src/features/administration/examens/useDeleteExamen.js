import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { examenService } from '../../../services/inphbExamenService';

export function UseDeleteExamen() {
  const queryClient = useQueryClient();

  const { mutate: deleteExamen, isPending: isDeleting } = useMutation({
    mutationFn: (id) => examenService.deleteExamen(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examen'] });
      toast.success('Examen supprimée avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de la suppression de l'examen");
    },
  });

  return { deleteExamen, isDeleting };
}
