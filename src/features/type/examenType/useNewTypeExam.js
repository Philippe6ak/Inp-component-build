import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { typeexamenService } from '../../../services/inphbTypeExamen';

export function useNewTypeExamen() {
  const queryClient = useQueryClient();

  const { mutate: createTypeExam, isPending: isCreating } = useMutation({
    mutationFn: typeexamenService.createEditexamen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examens'] });
      toast.success("Type d'examen ajoutée avec succès");
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout du type d'examen");
    },
  });

  return { createTypeExam, isCreating };
}
