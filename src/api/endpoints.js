export const API_ENDPOINTS = {
  SUPERLOGIN: '/loginuserapi',
  LOGIN: '/loguser',
  LOGOUT: '/logout',
  ME: '/me',

  // A ajouter plus tard
  //   PATIENTS: '/patients',
  //   PATIENT: (id) => `/patients/${id}`,

  //   // Consultations
  //   CONSULTATIONS: '/consultations',
  //   CONSULTATION: (id) => `/consultations/${id}`,

  //   // Medications
  //   MEDICATIONS: '/medications',
  //   MEDICATION: (id) => `/medications/${id}`,

  //   // Stock
  //   STOCK: '/stock',
  //   SUPPLIES: '/supplies',

  //   // Appointments
  //   APPOINTMENTS: '/appointments',

  //   // Hospitalizations
  //   HOSPITALIZATIONS: '/hospitalizations',

  //   // Referrals
  //   REFERRALS: '/referrals',

  //   // Admin
  //   USERS: '/users',
  GETSPECIALTIES: '/specialites',
  ADDSPECIALTIES: '/specialites/ajouter',
  UPDATESPECIALTIES: `/specialites/update`,
  DELETESPECIALTIES: `/specialites/delete`,

  GETDISEASES: '/typesmaladies',
  ADDDISEASES: '/typesmaladies/ajouter',
  UPDATEDISEASES: `/typesmaladies/update`,
  DELETEDISEASES: `/typesmaladies/delete`,
  //   PRICING: '/pricing',

  //EXAMEN

  GETSEXAMEN: '/typesexamens',
  ADDEXAMEN: '/typesexamens/ajouter',
  UPDATEEXAMEN: `/typesexamens/update`,
  DELETEEXAMEN: `/typesexamens/delete`,
};
