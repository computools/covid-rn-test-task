import {Case} from './case';

export interface Records {
  [key: string]: Array<Case>;
}

export interface CaseRecord {
  countrySlug: string;
  caseType: Case;
  date: string;
}
