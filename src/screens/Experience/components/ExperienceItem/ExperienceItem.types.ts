import { IExperience } from '../../../../interfaces/Experience';

export interface IExperienceItemProps {
  experience: IExperience;
  isActive: boolean;
  onClick: () => void;
}
