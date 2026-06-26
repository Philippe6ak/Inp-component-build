import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { consulTypeService } from '../../../services/inphbconsulTypeService';

export function useNewConsultationType() {
  const queryClient = useQueryClient();

  const { mutate: createConsultationType, isPending: isCreating } = useMutation({
    mutationFn: consulTypeService.createEditTypeConsultation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultationType'] });
      toast.success('Type de consultation ajouté avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout du type de consultation");
    },
  });

  return { createConsultationType, isCreating };
}
