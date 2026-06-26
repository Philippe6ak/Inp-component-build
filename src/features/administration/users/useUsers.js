import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { PAGE_COUNT, userService } from '../../../services/inphbUserService';

export function useUsers() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterField = searchParams.get('filterField') || 'status';
  const filterValue = searchParams.get('filterValue') || searchParams.get('status') || 'all';
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: filterField, value: filterValue };

  const sortByRaw = searchParams.get('sortBy') || 'nom-asc';
  const [field, rawDirection] = sortByRaw.split('-');
  const sortBy = { field, direction: rawDirection === 'desc' ? 'desc' : 'asc' };

  const rawPage = Number(searchParams.get('page'));
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const {
    isLoading,
    data: { data: users, count, agents, specialites } = {},
    error,
  } = useQuery({
    queryKey: ['users', filter, sortBy, page],
    queryFn: () => userService.getUsers({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil((count || 0) / PAGE_COUNT);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['users', filter, sortBy, page + 1],
      queryFn: () => userService.getUsers({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['users', filter, sortBy, page - 1],
      queryFn: () => userService.getUsers({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, users, count, agents, specialites };
}
