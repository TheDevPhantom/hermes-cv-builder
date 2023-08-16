import { IProject } from '../../../../interfaces/Project';

export interface IProjectEditorProps {
  project: IProject;
  onSave: (project: IProject) => void;
}
