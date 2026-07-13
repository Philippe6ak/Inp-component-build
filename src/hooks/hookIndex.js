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
  'typegrossesses'
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
