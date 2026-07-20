import api from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const patientsService = {
  searchPatient: async ({ type_personne, matricule }) => {
    const data = await api.post(API_ENDPOINTS.SEARCHPATIENT, {
      type_personne,
      matricule,
    });
    if (data?.status === 'error' || data?.success === false) {
      throw new Error(
        data.message || 'Could not find a patient with the provided matricule'
      );
    }
    return data;
  },

  submitPatientData: async (patientData) => {
    const data = await api.post(API_ENDPOINTS.SUBMITPATIENTDATA, patientData);

    if (data?.status === 'error' || data?.success === false) {
      throw new Error(data.message || 'Failed to submit patient data');
    }

    return data;
  },
};
