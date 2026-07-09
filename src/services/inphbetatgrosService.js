import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const etatGrossesseService = {
  getEtatGrossesse: async () => {
    const data = await api.get(API_ENDPOINTS.GETETATSGROSSESSES);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load pregnancy states');
    }
    return data;
  },

  // create or edit in same function
  createEditEtatGrossesse: async ({ libelle }, etatsgrossesses_id) => {
    //CREATE — when no id passed
    if (!etatsgrossesses_id) {
      const data = await api.post(API_ENDPOINTS.ADDETATSGROSSESSES, {
        libelle,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create pregnancy state');
      }
      return data;
    }

    //EDIT — when id passed
    const data = await api.post(API_ENDPOINTS.UPDATEETATSGROSSESSES, {
      etatsgrossesses_id,
      libelle,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update pregnancy states');
    }
    return data;
  },

  deleteEtatGrossesse: async (etatsgrossesses_id) => {
    const data = await api.post(API_ENDPOINTS.DELETEETATSGROSSESSES, {
      etatsgrossesses_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete pregnancy state');
    }
    return data;
  },
};
