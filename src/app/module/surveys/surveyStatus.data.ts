import { ISurveyStatus } from './interfaces/ISurveryFilter.interface';
import { TFormStatus } from './types/TFormStatus.type';

export const SURVEY_STATUS_DATA: ISurveyStatus[] = [
  {
    id: 1,
    name: 'مكتمل',
    value: TFormStatus.completed,
    selected: true,
  },
  {
    id: 2,
    name: 'ملغي',
    value: TFormStatus.canceled,
    selected: false,
  },
  {
    id: 3,
    name: 'مسودة',
    value: TFormStatus.drafted,
    selected: false,
  },
  {
    id: 4,
    name: 'قيد الارسال',
    value: TFormStatus.inProgress,
    selected: false,
  },
];
