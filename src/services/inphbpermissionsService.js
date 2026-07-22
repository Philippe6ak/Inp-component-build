import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const permissionsService = {
  getPermissions: async () => {
    const data = await api.get(API_ENDPOINTS.GETPERMISSIONS);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load permissions');
    }
    return data;
  },

  createEditPermissions: async ({ name }, permissions_id) => {
    if (!permissions_id) {
      const data = await api.post(API_ENDPOINTS.ADDPERMISSIONS, { name });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create permision');
      }
      return data;
    }

    const data = await api.post(API_ENDPOINTS.UPDATEPERMISSIONS, {
      permissions_id,
      name,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update permissions');
    }
    return data;
  },

  deletePermissions: async (permissions_id) => {
    const data = await api.post(API_ENDPOINTS.DELETEPERMISSIONS, {
      permissions_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete permissions');
    }
    return data;
  },
};
