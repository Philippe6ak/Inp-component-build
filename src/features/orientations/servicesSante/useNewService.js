import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { serviceSante } from '../../../services/inphbServiceSante';

export function useNewService() {
  const queryClient = useQueryClient();

  const { mutate: createService, isPending: isCreating } = useMutation({
    mutationFn: serviceSante.createEditService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service ajouté avec succès');
    },
    onError: (err) => {
      toast.error(err.message || "Échec de l'ajout du service");
    },
  });

  return { createService, isCreating };
}
