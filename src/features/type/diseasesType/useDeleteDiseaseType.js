import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { diseaseTypeService } from '../../../services/inphbDiseaseTypeService';

export function useDeleteDiseaseType() {
  const queryClient = useQueryClient();

  const { mutate: deleteDiseaseType, isPending: isDeleting } = useMutation({
    mutationFn: (id) => diseaseTypeService.deleteTypeDisease(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diseaseType'] });
      toast.success('Maladie supprimée avec succès');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la suppression de la maladie');
    },
  });

  return { deleteDiseaseType, isDeleting };
}
