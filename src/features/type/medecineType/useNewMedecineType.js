import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { medecineTypeService } from '../../../services/inphbMedecineTypeService';

export function useNewMedecineType() {
  const queryClient = useQueryClient();

  const { mutate: createMedecineType, isPending: isCreating } = useMutation({
    mutationFn: medecineTypeService.createEditTypeMedecine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medecineType'] });
      toast.success('Type de médicament ajouté avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout du type de médicament");
    },
  });

  return { createMedecineType, isCreating };
}
