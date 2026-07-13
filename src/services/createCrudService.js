import api from '../api/client';

export function createCrudService({
  getEndpoint,
  addEndpoint,
  updateEndpoint,
  deleteEndpoint,
  idField,
}) {
  return {
    getAll: async () => {
      const data = await api.get(getEndpoint);
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to load data');
      }
      return data;
    },

    createEdit: async (formData, id) => {
      if (!id) {
        const data = await api.post(addEndpoint, formData);
        if (data?.status === 'error' || data?.success === false) {
          throw new Error(data.message || 'Failed to create');
        }
        return data;
      }
      const data = await api.post(updateEndpoint, {
        [idField]: id,
        ...formData,
      });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to update');
      }
      return data;
    },

    delete: async (id) => {
      const data = await api.post(deleteEndpoint, { [idField]: id });
      if (data?.status === 'error' || data?.success === false) {
        throw new Error(data.message || 'Failed to delete');
      }
      return data;
    },
  };
}
