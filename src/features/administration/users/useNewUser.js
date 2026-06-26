import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { userService } from '../../../services/inphbUserService';

export function useNewUser() {
  const queryClient = useQueryClient();

  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Utilisateur ajouté avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout de l'utilisateur");
    },
  });

  return { createUser, isCreating };
}