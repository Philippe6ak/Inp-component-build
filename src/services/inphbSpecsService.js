import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

// export const specsService = {
//   getSpecialties: async () => {
//     const data = await api.get(API_ENDPOINTS.SPECIALTIES);
//     if (data?.status === 'error' || data?.success === false) {
//       throw new Error(data.message || 'Failed to load specialties');
//     }
//     return data;
//   },

//   addSpecialty: async ({ libelle, code }) => {
//     const data = await api.post(API_ENDPOINTS.NEWSPECIALTIES, {
//       libelle,
//       code,
//     });
//     if (data?.status === 'error' || data?.success === false) {
//       throw new Error(data.message || 'Failed to add specialty');
//     }
//     return data;
//   },
// };

export const specsService = {
  getSpecialties: async () => {
    const data = await api.get(API_ENDPOINTS.SPECIALTIES);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load specialties');
    }
    return data;
  },

  // Single function, two behaviors — mirrors your createEditCabin pattern
  createEditSpecialty: async ({ libelle, code }, specialites_id) => {
    // A) CREATE — no id passed
    if (!specialites_id) {
      const data = await api.post(API_ENDPOINTS.NEWSPECIALTIES, {
        libelle,
        code,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create specialty');
      }
      return data;
    }

    // B) EDIT — id passed
    const data = await api.post(API_ENDPOINTS.UPDATESPECIALTIES, {
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
    const data = await api.post(API_ENDPOINTS.DELETESPECIALTIES, {
      specialites_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete specialty');
    }
    return data;
  },
};
