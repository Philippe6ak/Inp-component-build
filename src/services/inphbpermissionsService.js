import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const PermissionsService = {
  getPermissions: async () => {
    const data = await api.get(API_ENDPOINTS.GETPERMISSIONS);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load permissions');
    }
    return data;
  },

  // create or edit in same function
  createEditPermissions: async ({ name }, permissions_id) => {
    //CREATE — when no id passed
    if (!permissions_id) {
      const data = await api.post(API_ENDPOINTS.ADDPERMISSIONS, { name });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create permision');
      }
      return data;
    }

    //EDIT — when id passed
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
