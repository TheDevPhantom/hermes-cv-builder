import { IEducation } from '../../../../interfaces/Education';

export interface IEducationEditorProps {
  education: IEducation;
  onSave: (education: IEducation) => void;
}
