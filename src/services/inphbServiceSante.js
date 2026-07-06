import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const serviceSante = {
  getServices: async () => {
    const data = await api.get(API_ENDPOINTS.GETSERVICES);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Echec du chargement du service');
    }
    return data;
  },

  // create or edit in same function
  createEditService: async ({ libelle, code }, services_id) => {
    //CREATE — when no id passed
    if (!services_id) {
      const data = await api.post(API_ENDPOINTS.ADDSERVICES, {
        libelle,
        code,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Echec de création du service ');
      }
      return data;
    }

    //EDIT — when id passed
    const data = await api.post(API_ENDPOINTS.UPDATESERVICES, {
      services_id,
      libelle,
      code,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Echec de la mise a jour du service');
    }
    return data;
  },

  deleteServices: async (services_id) => {
    const data = await api.post(API_ENDPOINTS.DELETESERVICES, {
      services_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Echec de la suppression du service');
    }
    return data;
  },
};
