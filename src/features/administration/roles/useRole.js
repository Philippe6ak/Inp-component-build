import { useQuery } from '@tanstack/react-query';
import { roleService } from '../../../services/inphbRoleService';

export function useRole() {
  const {
    isLoading,
    error,
    data: role,
  } = useQuery({
    queryKey: ['role'],
    queryFn: roleService.getRole,
  });

  return { isLoading, error, role };
}
