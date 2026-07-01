import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { roleService } from '../../../services/inphbRoleService';

export function useNewRole() {
  const queryClient = useQueryClient();

  const { mutate: createRole, isPending: isCreating } = useMutation({
    mutationFn: roleService.createEditRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role'] });
      toast.success('Rôle ajouté avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout du Rôle");
    },
  });

  return { createRole, isCreating };
}
