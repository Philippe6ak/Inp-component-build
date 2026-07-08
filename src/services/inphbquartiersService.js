import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const quartierService = {
  getQuartier: async () => {
    const data = await api.get(API_ENDPOINTS.GETQUARTIERS);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load quartiers');
    }
    return data;
  },

  createEditQuartier: async ({ libelle, code }, quartiers_id) => {
    if (!quartiers_id) {
      const data = await api.post(API_ENDPOINTS.ADDQUARTIERS, {
        libelle,
        code,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create quartier');
      }
      return data;
    }

    const data = await api.post(API_ENDPOINTS.UPDATEQUARTIERS, {
      quartiers_id,
      libelle,
      code,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update quartier');
    }
    return data;
  },

  deleteQuartier: async (quartiers_id) => {
    const data = await api.post(API_ENDPOINTS.DELETEQUARTIERS, {
      quartiers_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete quartier');
    }
    return data;
  },
};
