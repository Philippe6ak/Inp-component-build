import { createCrudHooks } from './createCrudHooks';
import {
  methodesDepistageService,
  etatGrossessesService,
  typeGrossessesService,
  typeDiseaseService,
  diseaseService,
  typeExamensService,
} from '../services/inphbIndex';

export const methodesDepistageHooks = createCrudHooks(
  methodesDepistageService,
  'methodesdepistages'
);
export const etatGrossessesHooks = createCrudHooks(
  etatGrossessesService,
  'etatgrossesse'
);
export const typeGrossessesHooks = createCrudHooks(
  typeGrossessesService,
  'typesgrossesse'
);

export const typeDiseaseHooks = createCrudHooks(
  typeDiseaseService,
  'typesmaladies'
);

export const diseaseHooks = createCrudHooks(diseaseService, 'maladies');

export const typeExamensHooks = createCrudHooks(
  typeExamensService,
  'typesexamens'
);
