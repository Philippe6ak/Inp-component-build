import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { consulTypeService } from '../../../services/inphbconsulTypeService';

export function useDeleteConsultationType() {
  const queryClient = useQueryClient();

  const { mutate: deleteConsultationType, isPending: isDeleting } = useMutation({
    mutationFn: (id) => consulTypeService.deleteTypeConsultation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultationType'] });
      toast.success('Type de consultation supprimé avec succès');
    },
    onError: (err) => {
      toast.error(
        err.message || 'Échec de la suppression du type de consultation'
      );
    },
  });

  return { deleteConsultationType, isDeleting };
}
