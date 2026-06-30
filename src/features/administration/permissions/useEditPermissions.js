import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { PermissionsService } from '../../../services/inphbpermissionsService';

export function useEditPermissions() {
  const queryClient = useQueryClient();

  const { mutate: editPermissions, isPending: isEditing } = useMutation({
    mutationFn: ({ newPermissionsData, id }) =>
      PermissionsService.createEditPermissions(newPermissionsData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
      toast.success('Permission mise à jour avec succès');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la mise à jour de la permission');
    },
  });

  return { editPermissions, isEditing };
}
