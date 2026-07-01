import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { clearSuperloginToken } from './inphbSuperloginService';
import { setUser, removeUser, getUser } from '../utils/helpers';

export const authService = {
  login: async (login, password) => {
    const data = await api.post(API_ENDPOINTS.LOGIN, { login, password });

    if (data.status === 'error' || data.success === false) {
      throw new Error(data.message || 'Login failed');
    }

    const user = data.user;
    if (!user) {
      throw new Error('Invalid response structure from server');
    }

    setUser(user);

    return user;
  },

  logout: async () => {
    try {
      await api.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      // ignore
    } finally {
      clearSuperloginToken();
      removeUser();
    }
  },

  getCurrentUser: () => getUser(),

  isAuthenticated: () => {
    return !!getUser();
  },
};
