import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { diseaseTypeService } from '../../../services/inphbDiseaseTypeService';

export function useEditDisease() {
  const queryClient = useQueryClient();

  const { mutate: editDisease, isPending: isEditing } = useMutation({
    mutationFn: ({ newDiseaseData, id }) =>
      diseaseTypeService.createEditTypeDisease(newDiseaseData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diseaseType'] });
      toast.success(' Mise à jour de la maladie reussi');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la mise à jour de la Maladie');
    },
  });

  return { editDisease, isEditing };
}
