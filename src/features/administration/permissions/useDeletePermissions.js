import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { PermissionsService } from '../../../services/inphbpermissionsService';

export function useDeletePermissions() {
  const queryClient = useQueryClient();

  const { mutate: deletePermissions, isPending: isDeleting } = useMutation({
    mutationFn: (id) => PermissionsService.deletePermissions(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
      toast.success('Permission supprimée avec succès');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la suppression de la permission');
    },
  });

  return { deletePermissions, isDeleting };
}
