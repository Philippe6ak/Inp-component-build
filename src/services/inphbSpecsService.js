import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const specsService = {
  getSpecialties: async () => {
    const data = await api.get(API_ENDPOINTS.GETSPECIALITES);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load specialties');
    }
    return data;
  },

  // create or edit in same function
  createEditSpecialty: async ({ libelle, code }, specialites_id) => {
    //CREATE — when no id passed
    if (!specialites_id) {
      const data = await api.post(API_ENDPOINTS.ADDSPECIALITES, {
        libelle,
        code,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create specialty');
      }
      return data;
    }

    //EDIT — when id passed
    const data = await api.post(API_ENDPOINTS.UPDATESPECIALITES, {
      specialites_id,
      libelle,
      code,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update specialty');
    }
    return data;
  },

  deleteSpecialty: async (specialites_id) => {
    const data = await api.post(API_ENDPOINTS.DELETESPECIALITES, {
      specialites_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete specialty');
    }
    return data;
  },
};
