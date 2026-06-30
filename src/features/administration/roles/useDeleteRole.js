import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { roleService } from '../../../services/inphbRoleService';

export function useDeleteRole() {
  const queryClient = useQueryClient();

  const { mutate: deleteRole, isPending: isDeleting } = useMutation({
    mutationFn: (id) => roleService.deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role'] });
      toast.success('Rôle supprimé avec succès');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la suppression du rôle');
    },
  });

  return { deleteRole, isDeleting };
}
