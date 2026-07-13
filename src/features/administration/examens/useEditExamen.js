import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { examenService } from '../../../services/inphbexamenService';

export function UseEditExamen() {
  const queryClient = useQueryClient();

  const { mutate: editExamen, isPending: isEditing } = useMutation({
    mutationFn: ({ newExamenData, id }) =>
      examenService.createEditexamen(newExamenData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examen'] });
      toast.success(" Mise à jour de l'examen reussi");
    },
    onError: (err) => {
      toast.error(err.message || "Échec de la mise à jour de l'examen");
    },
  });

  return { editExamen, isEditing };
}
