import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { etsreferentsService } from '../../../services/inphbetsreferentService';

export function useEditEtsReferent() {
  const queryClient = useQueryClient();

  const { mutate: editEtsReferent, isPending: isEditing } = useMutation({
    mutationFn: ({ newEtsReferentData, id }) =>
      etsreferentsService.createEditEtsReferent(newEtsReferentData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['etablissementsreferents'] });
      toast.success("Mise à jour de l'etablissement reussi");
    },
    onError: (err) => {
      toast.error(err.message || "Échec de la mise à jour de l'etablissement");
    },
  });

  return { editEtsReferent, isEditing };
}
