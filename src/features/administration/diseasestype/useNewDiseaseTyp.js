import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { diseaseTypeService } from '../../../services/inphbDiseaseTypeService';

export function useNewDiseaseTyp() {
  const queryClient = useQueryClient();

  const { mutate: createDiseaseTyp, isPending: isCreating } = useMutation({
    mutationFn: diseaseTypeService.createEditTypeDisease,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diseaseType'] });
      toast.success('Type de maladie ajouté avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout du type de maladie");
    },
  });

  return { createDiseaseTyp, isCreating };
}
