import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { diseaseTypeService } from '../../../services/inphbDiseaseTypeService';

export function useEditDiseaseTyp() {
  const queryClient = useQueryClient();

  const { mutate: editDiseaseType, isPending: isEditing } = useMutation({
    mutationFn: ({ newDiseaseData, id }) =>
      diseaseTypeService.createEditTypeDisease(newDiseaseData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diseaseType'] });
      toast.success('Mise à jour du type de maladie réussie');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la mise à jour du type de maladie');
    },
  });

  return { editDiseaseType, isEditing };
}
