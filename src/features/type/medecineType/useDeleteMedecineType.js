import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { medecineTypeService } from '../../../services/inphbMedecineTypeService';

export function useDeleteMedecineType() {
  const queryClient = useQueryClient();

  const { mutate: deleteMedecineType, isPending: isDeleting } = useMutation({
    mutationFn: (id) => medecineTypeService.deleteTypeMedecine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medecineType'] });
      toast.success('Type de médicament supprimé avec succès');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la suppression du type de médicament');
    },
  });

  return { deleteMedecineType, isDeleting };
}
