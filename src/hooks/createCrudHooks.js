import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function createCrudHooks(service, queryKey) {
  function useGetAll() {
    const { isLoading, error, data } = useQuery({
      queryKey: [queryKey],
      queryFn: service.getAll,
    });
    return { isLoading, error, data: data?.data ?? [] };
  }

  function useCreateEdit() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
      mutationFn: ({ formData, id }) => service.createEdit(formData, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Enregistré avec succès');
      },
      onError: (error) =>
        toast.error(error.message || "Échec de l'enregistrement"),
    });
    return { createEdit: mutate, isWorking: isPending };
  }

  function useDelete() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
      mutationFn: service.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Supprimé avec succès');
      },
      onError: (error) =>
        toast.error(error.message || 'Échec de la suppression'),
    });
    return { delete: mutate, isDeleting: isPending };
  }

  return { useGetAll, useCreateEdit, useDelete };
}
