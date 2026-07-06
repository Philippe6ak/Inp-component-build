import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { serviceSante } from '../../../services/inphbServiceSante';

export function useEditService() {
  const queryClient = useQueryClient();

  const { mutate: editService, isPending: isEditing } = useMutation({
    mutationFn: ({ newServiceData, id }) =>
      serviceSante.createEditService(newServiceData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Mise à jour du service reussi');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la mise à jour du service');
    },
  });

  return { editService, isEditing };
}
