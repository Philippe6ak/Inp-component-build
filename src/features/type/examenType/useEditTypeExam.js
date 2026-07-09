import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { typeexamenService } from '../../../services/inphbtypeexamen';
export function useEditExam() {
  const queryClient = useQueryClient();

  const { mutate: editExamen, isPending: isEditing } = useMutation({
    mutationFn: ({ newTypeExamData, id }) =>
      typeexamenService.createEditexamen(newTypeExamData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examens'] });
      toast.success(" Mise à jour du type d'examen reussi");
    },
    onError: (err) => {
      toast.error(err.message || "Échec de la mise à jour du type d'examen");
    },
  });

  return { editExamen, isEditing };
}
