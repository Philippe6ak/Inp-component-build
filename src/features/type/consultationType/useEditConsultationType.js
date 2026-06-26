import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { consulTypeService } from '../../../services/inphbconsulTypeService';

export function useEditConsultationType() {
  const queryClient = useQueryClient();

  const { mutate: editConsultationType, isPending: isEditing } = useMutation({
    mutationFn: ({ newConsultationData, id }) =>
      consulTypeService.createEditTypeConsultation(newConsultationData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultationType'] });
      toast.success('Mise à jour du type de consultation réussie');
    },
    onError: (err) => {
      toast.error(
        err.message || 'Échec de la mise à jour du type de consultation'
      );
    },
  });

  return { editConsultationType, isEditing };
}
