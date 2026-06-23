import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { diseaseTypeService } from '../../../services/inphbDiseaseTypeService';

export function useNewDisease() {
  const queryClient = useQueryClient();

  const { mutate: createDisease, isPending: isCreating } = useMutation({
    mutationFn: diseaseTypeService.createEditTypeDisease,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diseaseType'] });
      toast.success('Maladie ajoutée avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout de la Maladie");
    },
  });

  return { createDisease, isCreating };
}
