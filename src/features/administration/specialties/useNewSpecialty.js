import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { specsService } from '../../../services/inphbSpecsService';

export function useNewSpecialty() {
  const queryClient = useQueryClient();

  const { mutate: createSpecialty, isPending: isCreating } = useMutation({
    mutationFn: specsService.createEditSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] });
      toast.success('Spécialté ajoutée avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout de la spécialité");
    },
  });

  return { createSpecialty, isCreating };
}
