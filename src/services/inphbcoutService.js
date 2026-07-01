import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const coutsService = {
  getCost: async () => {
    const data = await api.get(API_ENDPOINTS.GETCOUTS);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load cost');
    }
    return data;
  },

  // create or edit in same function
  /*createEditCost: async ({ cout_montant }, couts_id) => {
    //CREATE — when no id passed
    if (!couts_id) {
      const data = await api.post(API_ENDPOINTS.ADDCOUTS, {
        cout_montant,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create cost');
      }
      return data;
    }

    //EDIT — when id passed
    const data = await api.post(API_ENDPOINTS.UPDATECOUTS, {
      couts_id,
      cout_montant,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update cost');
    }
    return data;
  },*/

  deleteCost: async (couts_id) => {
    const data = await api.post(API_ENDPOINTS.DELETECOUTS, {
      couts_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete cost');
    }
    return data;
  },
};
