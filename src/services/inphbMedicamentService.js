import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const medicationsService = {
  getMedications: async () => {
    const data = await api.get(API_ENDPOINTS.GETMEDECINE);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load medications');
    }
    return data;
  },

  // create or edit in same function
  creatEditMedications: async (
    { libelle, code, typesmedicaments_id, montant },
    medicaments_id
  ) => {
    //CREATE — when no id passed
    if (!medicaments_id) {
      const data = await api.post(API_ENDPOINTS.ADDMEDECINE, {
        libelle,
        code,
        typesmedicaments_id,
        montant,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create medications');
      }

      return data;
    }

    //EDIT — when id passed
    const data = await api.post(API_ENDPOINTS.UPDATEMEDECINE, {
      medicaments_id,
      libelle,
      code,
      typesmedicaments_id,
      montant,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update medications');
    }
    return data;
  },

  deleteMedications: async (medicaments_id) => {
    const data = await api.post(API_ENDPOINTS.DELETEMEDECINE, {
      medicaments_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete medications');
    }
    return data;
  },
};
