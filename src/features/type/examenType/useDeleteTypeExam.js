import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { typeexamenService } from '../../../services/inphbTypeExamen';

export function useDeleteTypeExam() {
  const queryClient = useQueryClient();

  const { mutate: deleteExamen, isPending: isDeleting } = useMutation({
    mutationFn: (id) => typeexamenService.deleteExamen(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examens'] });
      toast.success("Type d'examen supprimée avec succès");
    },
    onError: (err) => {
      toast.error(err.message || "Échec de la suppression du type d'examen");
    },
  });

  return { deleteExamen, isDeleting };
}
