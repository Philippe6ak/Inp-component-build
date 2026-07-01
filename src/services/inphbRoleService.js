import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const roleService = {
  getRole: async () => {
    const data = await api.get(API_ENDPOINTS.GETROLES);
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to load roles');
    }
    return data;
  },

  createEditRole: async ({ name }, roles_id) => {
    if (!roles_id) {
      const data = await api.post(API_ENDPOINTS.ADDROLES, {
        name,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to create role');
      }
      return data;
    }

    const data = await api.post(API_ENDPOINTS.UPDATEROLES, {
      roles_id,
      name,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to update role');
    }
    return data;
  },

  deleteRole: async (roles_id) => {
    const data = await api.post(API_ENDPOINTS.DELETEROLES, {
      roles_id,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to delete role');
    }
    return data;
  },

  assignPermissionsToRole: async ({ roles_id, permissions_id }) => {
    if (roles_id === undefined || roles_id === null) {
      throw new Error('Role id is required');
    }

    const normalizedPermissions = Array.isArray(permissions_id)
      ? permissions_id
      : permissions_id === undefined || permissions_id === null
        ? []
        : [permissions_id];

    const data = await api.post(API_ENDPOINTS.ASSIGNPERMISSIONSTOROLE, {
      roles_id,
      permissions_id: normalizedPermissions,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to assign permissions to role');
    }
    return data;
  },
};
