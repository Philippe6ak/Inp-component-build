import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const roleExtendedService = {
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
