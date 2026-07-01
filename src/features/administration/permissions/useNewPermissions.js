import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { permissionsService } from '../../../services/inphbPermissionsService';

export function useNewPermissions() {
  const queryClient = useQueryClient();

  const { mutate: createPermissions, isPending: isCreating } = useMutation({
    mutationFn: permissionsService.createEditPermissions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
      toast.success('Permissions ajoutée avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout de la permission");
    },
  });

  return { createPermissions, isCreating };
}
