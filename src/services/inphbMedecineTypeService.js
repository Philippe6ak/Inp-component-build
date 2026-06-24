import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const medecineTypeService = {
  getTypeMedecine: async () => {
    const data = await api.get(API_ENDPOINTS.GETTYPEMEDECINE);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load medicine types');
    }
    return data;
  },

  createEditTypeMedecine: async ({ libelle, code }, typesmedicaments_id) => {
    if (!typesmedicaments_id) {
      const data = await api.post(API_ENDPOINTS.ADDTYPEMEDECINE, {
        libelle,
        code,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create medicine type');
      }
      return data;
    }

    const data = await api.post(API_ENDPOINTS.UPDATETYPEMEDECINE, {
      typesmedicaments_id,
      libelle,
      code,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update medicine type');
    }
    return data;
  },

  deleteTypeMedecine: async (typesmedicaments_id) => {
    const data = await api.post(API_ENDPOINTS.DELETETYPEMEDECINE, {
      typesmedicaments_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete medicine type');
    }
    return data;
  },
};
