import { useQuery } from '@tanstack/react-query';
import { PermissionsService } from '../../../services/inphbpermissionsService';

export function UsePermissions() {
  const {
    isLoading,
    error,
    data: permissions,
  } = useQuery({
    queryKey: ['permissions'],
    queryFn: PermissionsService.getPermissions,
  });

  return { isLoading, error, permissions };
}
