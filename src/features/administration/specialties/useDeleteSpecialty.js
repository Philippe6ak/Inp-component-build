import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { specsService } from '../../../services/inphbSpecsService';

export function useDeleteSpecialty() {
  const queryClient = useQueryClient();

  const { mutate: deleteSpecialty, isPending: isDeleting } = useMutation({
    mutationFn: (id) => specsService.deleteSpecialty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] });
      toast.success('Spécialté supprimée avec succès');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la suppression de la spécialité');
    },
  });

  return { deleteSpecialty, isDeleting };
}
