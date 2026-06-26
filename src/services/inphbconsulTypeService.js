import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const consulTypeService = {
  getTypeConsultations: async () => {
    const data = await api.get(API_ENDPOINTS.GETTYPECONSULTATIONS);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load consultation types');
    }
    return data;
  },

  createEditTypeConsultation: async ({ libelle, code }, typesconsultations_id) => {
    if (!typesconsultations_id) {
      const data = await api.post(API_ENDPOINTS.ADDTYPECONSULTATIONS, {
        libelle,
        code,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create consultation type');
      }
      return data;
    }

    const data = await api.post(API_ENDPOINTS.UPDATETYPECONSULTATIONS, {
      typesconsultations_id,
      libelle,
      code,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update consultation type');
    }
    return data;
  },

  deleteTypeConsultation: async (typesconsultations_id) => {
    const data = await api.post(API_ENDPOINTS.DELETETYPECONSULTATIONS, {
      typesconsultations_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete consultation type');
    }
    return data;
  },
};