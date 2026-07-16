import { createCrudService } from './createCrudService';
import { API_ENDPOINTS } from '../api/endpoints';
import { approvisionnementService } from './inphbapprovService';

export const methodesDepistageService = createCrudService({
  getEndpoint: API_ENDPOINTS.GETMETHODESDEPISTAGES,
  addEndpoint: API_ENDPOINTS.ADDMETHODESDEPISTAGES,
  updateEndpoint: API_ENDPOINTS.UPDATEMETHODESDEPISTAGES,
  deleteEndpoint: API_ENDPOINTS.DELETEMETHODESDEPISTAGES,
  idField: 'methodesdepistages_id',
});

export const etatGrossessesService = createCrudService({
  getEndpoint: API_ENDPOINTS.GETETATGROSSESSES,
  addEndpoint: API_ENDPOINTS.ADDETATGROSSESSES,
  updateEndpoint: API_ENDPOINTS.UPDATEETATGROSSESSES,
  deleteEndpoint: API_ENDPOINTS.DELETEETATGROSSESSES,
  idField: 'etatgrossesses_id',
});

// types here

export const typeGrossessesService = createCrudService({
  getEndpoint: API_ENDPOINTS.GETTYPEGROSSESSES,
  addEndpoint: API_ENDPOINTS.ADDTYPEGROSSESSES,
  updateEndpoint: API_ENDPOINTS.UPDATETYPEGROSSESSES,
  deleteEndpoint: API_ENDPOINTS.DELETETYPEGROSSESSES,
  idField: 'typegrossesses_id',
});

export const typeDiseaseService = createCrudService({
  getEndpoint: API_ENDPOINTS.GETTYPEDISEASES,
  addEndpoint: API_ENDPOINTS.ADDTYPEDISEASES,
  updateEndpoint: API_ENDPOINTS.UPDATETYPEDISEASES,
  deleteEndpoint: API_ENDPOINTS.DELETETYPEDISEASES,
  idField: 'typesmaladies_id',
});

export const diseaseService = createCrudService({
  getEndpoint: API_ENDPOINTS.GETDISEASES,
  addEndpoint: API_ENDPOINTS.ADDDISEASES,
  updateEndpoint: API_ENDPOINTS.UPDATEDISEASES,
  deleteEndpoint: API_ENDPOINTS.DELETEDISEASES,
  idField: 'maladies_id',
});

export const typeExamensService = createCrudService({
  getEndpoint: '/typesexamens',
  addEndpoint: '/typesexamens/ajouter',
  updateEndpoint: `/typesexamens/update`,
  deleteEndpoint: `/typesexamens/delete`,
  idField: 'typesexamens_id',
});

export const typeConsultationsService = createCrudService({
  getEndpoint: API_ENDPOINTS.GETTYPECONSULTATIONS,
  addEndpoint: API_ENDPOINTS.ADDTYPECONSULTATIONS,
  updateEndpoint: API_ENDPOINTS.UPDATETYPECONSULTATIONS,
  deleteEndpoint: API_ENDPOINTS.DELETETYPECONSULTATIONS,
  idField: 'typesconsultations_id',
});

export const typeMedecinesService = createCrudService({
  getEndpoint: API_ENDPOINTS.GETTYPEMEDECINE,
  addEndpoint: API_ENDPOINTS.ADDTYPEMEDECINE,
  updateEndpoint: API_ENDPOINTS.UPDATETYPEMEDECINE,
  deleteEndpoint: API_ENDPOINTS.DELETETYPEMEDECINE,
  idField: 'typesmedicaments_id',
});

export const approvisionnementsService = createCrudService({
  getEndpoint: '/approvisionnements',
  addEndpoint: '/approvisionnements/ajouter',

  idField: 'approvisionnements_id',
});

export const medicamentServices = createCrudService({
  getEndpoint: '/medicaments',
  addEndpoint: '/medicaments/ajouter',
  updateEndpoint: `/medicaments/update`,
  deleteEndpoint: `/medicaments/delete`,
  idField: 'medicaments_id',
});
