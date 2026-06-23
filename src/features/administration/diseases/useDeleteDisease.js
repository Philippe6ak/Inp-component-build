import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { diseaseService } from '../../../services/inphbDiseaseService';

export function useDeleteDisease() {
  const queryClient = useQueryClient();

  const { mutate: deleteDisease, isPending: isDeleting } = useMutation({
    mutationFn: (id) => diseaseService.deleteDisease(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disease'] });
      toast.success('Maladie supprimée avec succès');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la suppression de la maladie');
    },
  });

  return { deleteDisease, isDeleting };
}
