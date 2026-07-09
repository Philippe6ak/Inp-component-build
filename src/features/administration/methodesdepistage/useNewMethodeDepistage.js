import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { depistageService } from '../../../services/inphbDepistageService';

export function useNewMethodeDepistage() {
  const queryClient = useQueryClient();

  const { mutate: createMethodeDepistage, isPending: isCreating } = useMutation(
    {
      mutationFn: depistageService.createEditMethodeDepistage,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['methodesdepistages'] });
        toast.success('Méthode de dépistage ajoutée avec succès');
      },
      onError: (err) => {
        toast.error(
          err.message || "Échec de l'ajout de la méthode de dépistage"
        );
      },
    }
  );

  return { createMethodeDepistage, isCreating };
}
