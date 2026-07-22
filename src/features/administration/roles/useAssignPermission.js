import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { roleExtendedService } from '../../../services/inphbRoleService';

export function useAssignPermissions() {
  const queryClient = useQueryClient();

  const { mutate: assignPermissions, isPending: isAssigning } = useMutation({
    mutationFn: roleExtendedService.assignPermissionsToRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role'] });
      toast.success('Permissions attribuées avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'attribution des permissions");
    },
  });

  return { assignPermissions, isAssigning };
}

export const useAssignPermission = useAssignPermissions;
