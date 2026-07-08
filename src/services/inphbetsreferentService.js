import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const etsreferentsService = {
  getEtsReferent: async () => {
    const data = await api.get(API_ENDPOINTS.GETETABLISSEMENTSREF);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || "Echec du chargement de l'etablissement");
    }
    return data;
  },

  // create or edit in same function
  createEditEtsReferent: async (
    { libelle, code },
    etablissementsreferents_id
  ) => {
    //CREATE — when no id passed
    if (!etablissementsreferents_id) {
      const data = await api.post(API_ENDPOINTS.ADDETABLISSEMENTSREF, {
        libelle,
        code,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(
          data.message || "Echec de création de l'etablissement "
        );
      }
      return data;
    }

    //EDIT — when id passed
    const data = await api.post(API_ENDPOINTS.UPDATEETABLISSEMENTSREF, {
      etablissementsreferents_id,
      libelle,
      code,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(
        data.message || "Echec de la mise a jour de l'etablissemen"
      );
    }
    return data;
  },

  deleteEtsReferent: async (etablissementsreferents_id) => {
    const data = await api.post(API_ENDPOINTS.DELETEETABLISSEMENTSREF, {
      etablissementsreferents_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(
        data.message || "Echec de la suppression de l'etablissement "
      );
    }
    return data;
  },
};
