import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const typeGrossesseService = {
  getTypeGrossesse: async () => {
    const data = await api.get(API_ENDPOINTS.GETTYPEGROSSESSES);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load pregnancy types   ');
    }
    return data;
  },

  // create or edit in same function
  createEditTypeGrossesse: async ({ libelle }, typegrossesses_id) => {
    //CREATE — when no id passed
    if (!typegrossesses_id) {
      const data = await api.post(API_ENDPOINTS.ADDTYPEGROSSESSES, {
        libelle,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create pregnancy type');
      }
      return data;
    }

    //EDIT — when id passed
    const data = await api.post(API_ENDPOINTS.UPDATETYPEGROSSESSES, {
      typegrossesses_id,
      libelle,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update pregnancy types');
    }
    return data;
  },

  deleteTypeGrossesse: async (typegrossesses_id) => {
    const data = await api.post(API_ENDPOINTS.DELETETYPEGROSSESSES, {
      typegrossesses_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete pregnancy type');
    }
    return data;
  },
};
