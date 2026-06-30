import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { roleService } from '../../../services/inphbRoleService';

export function useEditRole() {
  const queryClient = useQueryClient();

  const { mutate: editRole, isPending: isEditing } = useMutation({
    mutationFn: ({ newRoleData, id }) =>
      roleService.createEditRole(newRoleData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role'] });
      toast.success(' Mise à jour du rôle reussi');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la mise à jour du rôle');
    },
  });

  return { editRole, isEditing };
}
