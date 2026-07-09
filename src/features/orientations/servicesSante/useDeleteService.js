import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { serviceSante } from '../../../services/inphbServiceSante';

export function useDeleteService() {
  const queryClient = useQueryClient();

  const { mutate: deleteService, isPending: isDeleting } = useMutation({
    mutationFn: (id) => serviceSante.deleteServices(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service supprimé avec succès');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la suppression du service');
    },
  });

  return { deleteService, isDeleting };
}
