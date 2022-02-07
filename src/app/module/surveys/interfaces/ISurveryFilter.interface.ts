import { TFormStatus } from '../types/TFormStatus.type';

export interface ISurveyStatus {
  id: number;
  name: string;
  value:
    | TFormStatus.completed
    | TFormStatus.canceled
    | TFormStatus.drafted
    | TFormStatus.inProgress;
  selected: boolean;
}
[];
