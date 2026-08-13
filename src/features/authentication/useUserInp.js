import { useQuery } from '@tanstack/react-query';
import { authService } from '../../services/inphbAuthService';

export function useUserInp() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const storedUser = authService.getCurrentUser();
      console.log('Stored user:', storedUser);
      if (!storedUser) {
        throw new Error('No user found');
      }
      return storedUser;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && authService.isAuthenticated(),
    error,
  };
}
