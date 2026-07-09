import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { depistageService } from '../../../services/inphbDepistageService';

export function useEditMethodeDepistage() {
  const queryClient = useQueryClient();

  const { mutate: editMethodeDepistage, isPending: isEditing } = useMutation({
    mutationFn: ({ newMethodeDepistageData, id }) =>
      depistageService.createEditMethodeDepistage(newMethodeDepistageData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['methodesdepistages'] });
      toast.success('Mise à jour de la méthode de dépistage réussie');
    },
    onError: (err) => {
      toast.error(
        err.message || 'Échec de la mise à jour de la méthode de dépistage'
      );
    },
  });

  return { editMethodeDepistage, isEditing };
}
