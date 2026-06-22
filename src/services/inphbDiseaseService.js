import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const diseaseTypeService = {
  getDiseases: async () => {
    const data = await api.get(API_ENDPOINTS.GETTYPEDISEASES);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load diseases');
    }
    return data;
  },

  // create or edit in same function
  createEditDisease: async ({ libelle, code }, typesmaladies_id) => {
    //CREATE — when no id passed
    if (!typesmaladies_id) {
      const data = await api.post(API_ENDPOINTS.ADDTYPEDISEASES, {
        libelle,
        code,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create disease');
      }
      return data;
    }

    //EDIT — when id passed
    const data = await api.post(API_ENDPOINTS.UPDATETYPEDISEASES, {
      typesmaladies_id,
      libelle,
      code,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update disease');
    }
    return data;
  },

  deleteDisease: async (typesmaladies_id) => {
    const data = await api.post(API_ENDPOINTS.DELETETYPEDISEASES, {
      typesmaladies_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete disease');
    }
    return data;
  },
};
