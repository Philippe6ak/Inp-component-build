import { createCrudHooks } from './createCrudHooks';
import {
  methodesDepistageService,
  etatGrossessesService,
  typeGrossessesService,
  typeDiseaseService,
  diseaseService,
  typeExamensService,
  typeConsultationsService,
  typeMedecinesService,
  approvisionnementsService,
  medicamentServices,
  //approvMedocService,
} from '../services/inphbIndex';

// types here

export const typeConsultationsHooks = createCrudHooks(
  typeConsultationsService,
  'typesconsultations'
);

export const typeExamensHooks = createCrudHooks(
  typeExamensService,
  'typesexamens'
);

export const typeGrossessesHooks = createCrudHooks(
  typeGrossessesService,
  'typesgrossesse'
);

export const typeDiseaseHooks = createCrudHooks(
  typeDiseaseService,
  'typesmaladies'
);

export const typeMedecinesHooks = createCrudHooks(
  typeMedecinesService,
  'typemedicines'
);

// REST

export const methodesDepistageHooks = createCrudHooks(
  methodesDepistageService,
  'methodesdepistages'
);

export const etatGrossessesHooks = createCrudHooks(
  etatGrossessesService,
  'etatgrossesses'
);

export const diseaseHooks = createCrudHooks(diseaseService, 'maladies');

export const approvisionnementsHooks = createCrudHooks(
  approvisionnementsService,
  'approvisionnements'
);

export const medicamentHooks = createCrudHooks(
  medicamentServices,
  'medicaments'
);
