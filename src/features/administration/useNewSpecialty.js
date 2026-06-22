import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { specsService } from '../../services/inphbSpecsService';

export function useNewSpecialty() {
  const queryClient = useQueryClient();

  const { mutate: createSpecialty, isPending: isCreating } = useMutation({
    mutationFn: specsService.addSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] });
      toast.success('Specialty added successfully');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to add specialty');
    },
  });

  return { createSpecialty, isCreating };
}
