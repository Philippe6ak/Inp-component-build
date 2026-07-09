import { useQuery } from '@tanstack/react-query';
import { depistageService } from '../../../services/inphbDepistageService';

export const useMethodeDepistage = () => {
  const {
    isLoading,
    error,
    data: methodesdepistages,
  } = useQuery({
    queryKey: ['methodesdepistages'],
    queryFn: depistageService.getMethodeDepistage,
  });

  return { isLoading, error, methodesdepistages };
};
