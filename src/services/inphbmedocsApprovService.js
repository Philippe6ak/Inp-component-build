import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const medocsApprovService = {
  getApprovisionnementsMdc: async () => {
    const data = await api.get(API_ENDPOINTS.GETAPPROVISIONNEMENTSMDCS);
    if (data.status === 'error' || data.success === false) {
      throw new Error(data.message || 'Failed to load approvisionnements');
    }
    return data.data;
  },

  createEditApprovisionnementMdc: async (
    { approvisionnements_id, medicaments_id, medicament_libelle, quantite },
    approvisionnementsmedicaments_id
  ) => {
    // CREATE — no approvisionnement id passed
    if (!approvisionnementsmedicaments_id) {
      const data = await api.post(API_ENDPOINTS.ADDAPPROVISIONNEMENTSMDCS, {
        approvisionnements_id,
        medicaments_id,
        medicament_libelle,
        quantite,
      });
      if (data.status === 'error' || data.success === false) {
        throw new Error(data.message || 'Failed to create approvisionnement');
      }
      return data;
    }
    // EDIT — approvisionnement id passed
    const data = await api.post(API_ENDPOINTS.UPDATEAPPROVISIONNEMENTSMDCS, {
      approvisionnementsmedicaments_id,
      approvisionnements_id,
      medicaments_id,
      medicament_libelle,
      quantite,
    });
    if (data.status === 'error' || data.success === false) {
      throw new Error(data.message || 'Failed to update approvisionnement');
    }
    return data;
  },

  deleteApprovisionnementMdc: async (approvisionnementsmedicaments_id) => {
    const data = await api.post(API_ENDPOINTS.DELETEAPPROVISIONNEMENTSMDCS, {
      approvisionnementsmedicaments_id,
    });
    if (data.status === 'error' || data.success === false) {
      throw new Error(data.message || 'Failed to delete approvisionnement');
    }
    return data;
  },
};
