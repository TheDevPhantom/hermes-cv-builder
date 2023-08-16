import { IExperience } from '../../../../interfaces/Experience';

export interface IExperienceEditorProps {
  experience: IExperience;
  onSave: (experience: IExperience) => void;
  onDelete: (experience: IExperience) => void;
}
