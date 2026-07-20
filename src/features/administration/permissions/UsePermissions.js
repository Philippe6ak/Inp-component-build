import { useQuery } from '@tanstack/react-query';
import { permissionsService } from '../../../services/inphbpermissionsService';

export function usePermissions() {
  const {
    isLoading,
    error,
    data: permissions,
  } = useQuery({
    queryKey: ['permissions'],
    queryFn: permissionsService.getPermissions,
  });

  return { isLoading, error, permissions };
}
