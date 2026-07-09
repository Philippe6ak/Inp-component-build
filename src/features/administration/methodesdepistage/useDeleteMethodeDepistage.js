import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { depistageService } from '../../../services/inphbDepistageService';

export function useDeleteMethodeDepistage() {
  const queryClient = useQueryClient();

  const { mutate: deleteMethodeDepistage, isPending: isDeleting } = useMutation(
    {
      mutationFn: (id) => depistageService.deleteMethodeDepistage(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['methodesdepistages'] });
        toast.success('Méthode de dépistage supprimée avec succès');
      },
      onError: (err) => {
        toast.error(
          err.message || 'Échec de la suppression de la méthode de dépistage'
        );
      },
    }
  );

  return { deleteMethodeDepistage, isDeleting };
}
