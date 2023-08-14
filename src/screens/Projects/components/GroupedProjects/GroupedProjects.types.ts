import { IProject } from '../../../../interfaces/Project';

export interface GroupedProjectsProps {
  projects: IProject[];
  title?: string;
  onProjectClick: (projectId: string) => void;
  activeProjectId: string;
}
