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
  'etatgrossesses'
);
export const typeGrossessesHooks = createCrudHooks(
  typeGrossessesService,
  'typegrossesses'
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
