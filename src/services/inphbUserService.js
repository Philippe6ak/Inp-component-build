import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const PAGE_COUNT = 10;

function getFieldValue(entry, field) {
  if (!field) return undefined;
  return field
    .split('.')
    .reduce((accumulator, key) => accumulator?.[key], entry);
}

export const userService = {
  getUsers: async ({ filter, sortBy, page = 1 } = {}) => {
    const response = await api.get(API_ENDPOINTS.GETUSERS);
    if (response?.status === 'error' || response?.success === false) {
      throw new Error(response.message || 'Failed to load users');
    }

    const users = Array.isArray(response?.data) ? response.data : [];

    let processedUsers = users;

    if (
      filter?.field &&
      filter?.value !== undefined &&
      filter?.value !== null
    ) {
      const filterMethod = filter.method || 'eq';
      const normalizedFilterValue = String(filter.value).toLowerCase();

      processedUsers = processedUsers.filter((user) => {
        const currentValue = getFieldValue(user, filter.field);
        const normalizedCurrentValue = String(currentValue ?? '').toLowerCase();

        if (filterMethod === 'contains') {
          return normalizedCurrentValue.includes(normalizedFilterValue);
        }

        if (filterMethod === 'neq') {
          return normalizedCurrentValue !== normalizedFilterValue;
        }

        return normalizedCurrentValue === normalizedFilterValue;
      });
    }

    if (sortBy?.field) {
      processedUsers = [...processedUsers].sort((firstUser, secondUser) => {
        const firstValue = getFieldValue(firstUser, sortBy.field);
        const secondValue = getFieldValue(secondUser, sortBy.field);

        const compareResult = String(firstValue ?? '').localeCompare(
          String(secondValue ?? ''),
          undefined,
          { numeric: true, sensitivity: 'base' }
        );

        return sortBy.direction === 'desc' ? -compareResult : compareResult;
      });
    }

    const count = processedUsers.length;
    const from = (page - 1) * PAGE_COUNT;
    const to = from + PAGE_COUNT;
    const paginatedUsers = processedUsers.slice(from, to);

    return {
      data: paginatedUsers,
      count,
      agents: response?.agents ?? [],
      specialites: response?.specialites ?? [],
      user_id: response?.user_id,
      success: response?.success,
    };
  },

  getAgents: async () => {
    const data = await api.get(API_ENDPOINTS.GETAGENTS);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load Agents');
    }
    return data;
  },

  createUser: async ({ specialites_id, agents_id } = {}) => {
    const payload = {
      specialites_id,
      agents_id,
    };

    const data = await api.post(API_ENDPOINTS.ADDUSER, payload);

    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to create user');
    }

    return data;
  },
};
