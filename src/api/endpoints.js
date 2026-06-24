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

  GETTYPEDISEASES: '/typesmaladies',
  ADDTYPEDISEASES: '/typesmaladies/ajouter',
  UPDATETYPEDISEASES: `/typesmaladies/update`,
  DELETETYPEDISEASES: `/typesmaladies/delete`,

  GETDISEASES: '/maladies',
  ADDDISEASES: '/maladies/ajouter',
  UPDATEDISEASES: `/maladies/update`,
  DELETEDISEASES: `/maladies/delete`,

  GETTYPEEXAMENS: '/typesexamens',
  ADDTYPEEXAMENS: '/typesexamens/ajouter',
  UPDATETYPEEXAMENS: `/typesexamens/update`,
  DELETETYPEEXAMENS: `/typesexamens/delete`,

  //EXAMEN

  GETEXAMENS: '/examens',
  ADDEXAMENS: '/examens/ajouter',
  UPDATEEXAMENS: `/examens/update`,
  DELETEEXAMENS: `/examens/delete`,
  //   PRICING: '/pricing',

  //TYPE EXAMEN

  //EXAMEN
  GETSEXAMEN: '/typesexamens',
  ADDEXAMEN: '/typesexamens/ajouter',
  UPDATEEXAMEN: `/typesexamens/update`,
  DELETEEXAMEN: `/typesexamens/delete`,

  //COUTS
  GETCOUTS: '/couts',
  ADDCOUTS: '/couts/ajouter',
  UPDATECOUTS: '/couts/update',
  DELETECOUTS: '/couts/delete',
  // TYPE MEDECINE
  GETTYPEMEDECINE: '/typesmedicaments',
  ADDTYPEMEDECINE: '/typesmedicaments/ajouter',
  UPDATETYPEMEDECINE: `/typesmedicaments/update`,
  DELETETYPEMEDECINE: `/typesmedicaments/delete`,

  // MEDECINE
  GETMEDECINE: '/medicaments',
  ADDMEDECINE: '/medicaments/ajouter',
  UPDATEMEDECINE: `/medicaments/update`,
  DELETEMEDECINE: `/medicaments/delete`,
};
