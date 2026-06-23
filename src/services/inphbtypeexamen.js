import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const typeexamenService = {
  getExamen: async () => {
    const data = await api.get(API_ENDPOINTS.GETSEXAMEN);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load exam');
    }
    return data;
  },

  // create or edit in same function
  createEditexamen: async ({ libelle, code }, typesexamens_id) => {
    //CREATE — when no id passed
    if (!typesexamens_id) {
      const data = await api.post(API_ENDPOINTS.ADDEXAMEN, {
        libelle,
        code,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create exam');
      }
      return data;
    }

    //EDIT — when id passed
    const data = await api.post(API_ENDPOINTS.UPDATEEXAMEN, {
      typesexamens_id,
      libelle,
      code,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update exam');
    }
    return data;
  },

  deleteExamen: async (typesexamens_id) => {
    const data = await api.post(API_ENDPOINTS.DELETEEXAMEN, {
      typesexamens_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete exam');
    }
    return data;
  },
};
