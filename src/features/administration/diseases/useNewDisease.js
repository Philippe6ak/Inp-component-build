import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { diseaseService } from '../../../services/inphbDiseaseService';

export function useNewDisease() {
  const queryClient = useQueryClient();

  const { mutate: createDisease, isPending: isCreating } = useMutation({
    mutationFn: diseaseService.createEditDisease,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disease'] });
      toast.success('Maladie ajoutée avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout de la Maladie");
    },
  });

  return { createDisease, isCreating };
}
