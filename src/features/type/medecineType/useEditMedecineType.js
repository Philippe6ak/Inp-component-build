import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { medecineTypeService } from '../../../services/inphbMedecineTypeService';

export function useEditMedecineType() {
  const queryClient = useQueryClient();

  const { mutate: editMedecineType, isPending: isEditing } = useMutation({
    mutationFn: ({ newMedecineData, id }) =>
      medecineTypeService.createEditTypeMedecine(newMedecineData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medecineType'] });
      toast.success('Mise à jour du type de médicament réussie');
    },
    onError: (err) => {
      toast.error(err.message || 'Échec de la mise à jour du type de médicament');
    },
  });

  return { editMedecineType, isEditing };
}
