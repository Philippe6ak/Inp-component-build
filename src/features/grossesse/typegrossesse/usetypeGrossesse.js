import { useQuery } from '@tanstack/react-query';
import { typeGrossesseService } from '../../../services/inphbtypegrossesseService';

export const Usetypegrossesse = () => {
  const {
    isLoading,
    error,
    data: typegrossesses,
  } = useQuery({
    queryKey: ['typegrossesses'],
    queryFn: typeGrossesseService.getTypeGrossesse,
  });

  return { isLoading, error, typegrossesses };
};
