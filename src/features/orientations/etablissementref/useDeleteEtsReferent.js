import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { etsreferentsService } from '../../../services/inphbetsreferentService';

export function useDeleteEtsReferent() {
  const queryClient = useQueryClient();

  const { mutate: deleteEtablissement, isPending: isDeleting } = useMutation({
    mutationFn: (id) => etsreferentsService.deleteEtsReferent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['etablissementsreferents'] });
      toast.success('Etablissement supprimée avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de la suppression de l'Etablissement");
    },
  });

  return { deleteEtablissement, isDeleting };
}
