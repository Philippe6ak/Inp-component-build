// hooks/mutations/useLogin.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { authService } from '../../services/inphbAuthService';

export function useLoginInp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ login, password }) => authService.login(login, password),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      toast.success('Welcome back!');
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.error('Login failed', err);
      console.error('Error message:', err.message);
      console.error('Error response:', err.response?.data);
      toast.error(
        err.message || 'Login failed. Please check your credentials.'
      );
    },
  });

  return { login, isLoggingIn };
}
