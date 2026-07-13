import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const depistageService = {
  getMethodeDepistage: async () => {
    const data = await api.get(API_ENDPOINTS.GETMETHODESDEP);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load screening methods');
    }
    return data;
  },

  // create or edit in same function
  createEditMethodeDepistage: async ({ libelle }, methodesdepistages_id) => {
    //CREATE — when no id passed
    if (!methodesdepistages_id) {
      const data = await api.post(API_ENDPOINTS.ADDMETHODESDEP, {
        libelle,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create screening method');
      }
      return data;
    }

    //EDIT — when id passed
    const data = await api.post(API_ENDPOINTS.UPDATEMETHODESDEP, {
      methodesdepistages_id,
      libelle,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update screening methods');
    }
    return data;
  },

  deleteMethodeDepistage: async (methodesdepistages_id) => {
    const data = await api.post(API_ENDPOINTS.DELETEMETHODESDEP, {
      methodesdepistages_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete screening method');
    }
    return data;
  },
};
