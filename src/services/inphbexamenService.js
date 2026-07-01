import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const examenService = {
  getExamen: async () => {
    const data = await api.get(API_ENDPOINTS.GETEXAMENS);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load exam');
    }
    return data;
  },

  // create or edit in same function
  createEditexamen: async (
    { libelle, code, typesexamens_id, montant },
    examens_id
  ) => {
    //CREATE — when no id passed
    if (!examens_id) {
      const data = await api.post(API_ENDPOINTS.ADDEXAMENS, {
        libelle,
        code,
        typesexamens_id,
        montant,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create exam');
      }

      return data;
    }

    //EDIT — when id passed
    const data = await api.post(API_ENDPOINTS.UPDATEEXAMENS, {
      examens_id,
      libelle,
      code,
      typesexamens_id,
      montant,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update exam');
    }
    return data;
  },

  deleteExamen: async (examens_id) => {
    const data = await api.post(API_ENDPOINTS.DELETEEXAMENS, {
      examens_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete exam');
    }
    return data;
  },
};
