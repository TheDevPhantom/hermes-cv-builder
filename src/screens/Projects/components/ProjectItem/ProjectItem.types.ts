import { IProject } from '../../../../interfaces/Project';

export interface IProjectItemProps {
  project: IProject;
  isActive: boolean;
  onClick: (projectId: string) => void;
}
