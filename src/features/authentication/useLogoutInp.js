import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { authService } from '../../services/inphbAuthService';

export function useLogoutInp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      queryClient.clear();
      toast.success('Logged out successfully');
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      console.error('Logout failed', err);
      toast.error('Logout failed. Please try again.');
    },
  });

  return { logout, isLoggingOut };
}
