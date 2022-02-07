import { ISurveyStatus } from './interfaces/ISurveryFilter.interface';
import { TFormStatus } from './types/TFormStatus.type';

export const SURVEY_STATUS_DATA: ISurveyStatus[] = [
  {
    id: 1,
    name: 'Completed',
    value: TFormStatus.completed,
    selected: true,
  },
  {
    id: 2,
    name: 'Canceled',
    value: TFormStatus.canceled,
    selected: false,
  },
  {
    id: 3,
    name: 'Drafted',
    value: TFormStatus.drafted,
    selected: false,
  },
  {
    id: 4,
    name: 'In Progress',
    value: TFormStatus.inProgress,
    selected: false,
  },
];
