import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

let cachedToken = null;
let tokenPromise = null;

export async function getSuperloginToken() {
  if (cachedToken) return cachedToken;

  if (!tokenPromise) {
    tokenPromise = api
      .post(API_ENDPOINTS.SUPERLOGIN, {
        login: 'api.tokensante@inphb.ci',
        password: '#yellowApi#',
      })
      .then((data) => {
        const token = data.token;
        if (!token) throw new Error('Failed to retrieve API token');
        cachedToken = token;
        return token;
      })
      .finally(() => {
        tokenPromise = null;
      });
  }

  return tokenPromise;
}

export function clearSuperloginToken() {
  cachedToken = null;
}
