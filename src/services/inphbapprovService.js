import { API_ENDPOINTS } from '../api/endpoints';
import api from '../api/client';

export const approvisionnementService = {
  getApprovisionnements: async () => {
    const data = await api.get(API_ENDPOINTS.GETAPPROVISIONNEMENTS);
    if (data.status === 'error' || data.success === false) {
      throw new Error(data.message || 'Failed to load approvisionnements');
    }
    return data.data;
  },

  createEditApprovisionnement: async (
    approvisionnementData,
    approvisionnements_id
  ) => {
    const payload = { ...approvisionnementData };

    // CREATE — no approvisionnement id passed
    if (!approvisionnements_id) {
      const data = await api.post(API_ENDPOINTS.ADDAPPROVISIONNEMENTS, payload);
      if (data.status === 'error' || data.success === false) {
        throw new Error(data.message || 'Failed to create approvisionnement');
      }
      return data;
    }

    // EDIT — approvisionnement id passed
    const data = await api.post(API_ENDPOINTS.UPDATEAPPROVISIONNEMENTS, {
      approvisionnements_id,
      ...payload,
    });
    if (data.status === 'error' || data.success === false) {
      throw new Error(data.message || 'Failed to update approvisionnement');
    }
    return data;
  },

  deleteApprovisionnement: async (approvisionnements_id) => {
    const data = await api.post(API_ENDPOINTS.DELETEAPPROVISIONNEMENTS, {
      approvisionnements_id,
    });
    if (data.status === 'error' || data.success === false) {
      throw new Error(data.message || 'Failed to delete approvisionnement');
    }
    return data;
  },
};
