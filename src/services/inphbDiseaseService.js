import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const diseaseService = {
  getDiseases: async () => {
    const data = await api.get(API_ENDPOINTS.GETDISEASES);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load diseases');
    }
    return data;
  },

  // create or edit in same function
  createEditDisease: async ({ libelle, code }, typemaladie_id) => {
    //CREATE — when no id passed
    if (!typemaladie_id) {
      const data = await api.post(API_ENDPOINTS.ADDDISEASES, {
        libelle,
        code,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create disease');
      }
      return data;
    }

    //EDIT — when id passed
    const data = await api.post(API_ENDPOINTS.UPDATEDISEASES, {
      typemaladie_id,
      libelle,
      code,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update disease');
    }
    return data;
  },

  deleteDisease: async (typemaladie_id) => {
    const data = await api.post(API_ENDPOINTS.DELETEDISEASES, {
      typemaladie_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete disease');
    }
    return data;
  },
};
