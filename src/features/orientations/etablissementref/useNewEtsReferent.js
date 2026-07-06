import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { etsreferentsService } from '../../../services/inphbetsreferentService';

export function useNewEtsReferent() {
  const queryClient = useQueryClient();

  const { mutate: createEtsReferent, isPending: isCreating } = useMutation({
    mutationFn: etsreferentsService.createEditEtsReferent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['etablissementsreferents'] });
      toast.success('Etablissement ajouté avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout du type de l'etablissement");
    },
  });

  return { createEtsReferent, isCreating };
}
