import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const specsService = {
  getSpecialties: async () => {
    const data = await api.get(API_ENDPOINTS.SPECIALTIES);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load specialties');
    }
    return data;
  },

  addSpecialty: async ({ libelle, code }) => {
    const data = await api.post(API_ENDPOINTS.NEWSPECIALTIES, {
      libelle,
      code,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to add specialty');
    }
    return data;
  },
};
