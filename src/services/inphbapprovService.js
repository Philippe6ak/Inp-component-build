import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const approvisionnementService = {
  getApprovisionnements: async () => {
    const data = await api.get(API_ENDPOINTS.GETAPPROVISIONNEMENTSMDCS);
    if (data.status === 'error' || data.success === false) {
      throw new Error(data.message || 'Failed to load approvisionnements');
    }
    return data.data;
  },

  createEditApprovisionnement: async (
    { libelle },
    approvisionnements_id
  ) => {
    // CREATE — no approvisionnement id passed
    if (!approvisionnements_id) {
      const data = await api.post(API_ENDPOINTS.ADDAPPROVISIONNEMENTSMDCS, {
        libelle,
       
      });
      if (data.status === 'error' || data.success === false) {
        throw new Error(data.message || 'Failed to create approvisionnement');
      }
      return data;
    }
    // EDIT — approvisionnement id passed
    const data = await api.post(API_ENDPOINTS.UPDATEAPPROVISIONNEMENTSMDCS, {
      approvisionnements_id,
      libelle,
    });
    if (data.status === 'error' || data.success === false) {
      throw new Error(data.message || 'Failed to update approvisionnement');
    }
    return data;
  },

  deleteApprovisionnement: async (approvisionnements_id) => {
    const data = await api.post(API_ENDPOINTS.DELETEAPPROVISIONNEMENTSMDCS, {
      approvisionnements_id,
    });
    if (data.status === 'error' || data.success === false) {
      throw new Error(data.message || 'Failed to delete approvisionnement');
    }
    return data;
  },
};
