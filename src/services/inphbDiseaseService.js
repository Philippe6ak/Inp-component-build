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

  createEditDisease: async (
    { libelle, code, typesmaladies_id },
    maladies_id
  ) => {
    // CREATE — no disease id passed
    if (!maladies_id) {
      const data = await api.post(API_ENDPOINTS.ADDDISEASES, {
        libelle,
        code,
        typesmaladies_id,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create disease');
      }
      return data;
    }

    // EDIT — disease id passed
    const data = await api.post(API_ENDPOINTS.UPDATEDISEASES, {
      maladies_id,
      libelle,
      code,
      typesmaladies_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update disease');
    }
    return data;
  },

  deleteDisease: async (maladies_id) => {
    const data = await api.post(API_ENDPOINTS.DELETEDISEASES, {
      maladies_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete disease');
    }
    return data;
  },
};
