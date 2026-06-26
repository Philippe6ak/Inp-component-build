import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { medicationsService } from '../../../services/inphbMedicamentService';

export function UseNewMedications() {
  const queryClient = useQueryClient();

  const { mutate: createMedication, isPending: isCreating } = useMutation({
    mutationFn: medicationsService.creatEditMedications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicament'] });
      toast.success('Medicament ajoutée avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout du medicament");
    },
  });

  return { createMedication, isCreating };
}
