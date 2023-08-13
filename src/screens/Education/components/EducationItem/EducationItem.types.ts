import { IEducation } from '../../../../interfaces/Education';

export interface IEducationItemProps {
  experience: IEducation;
  isActive: boolean;
  onClick: () => void;
}
