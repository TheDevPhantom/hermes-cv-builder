import { StateCreator } from 'zustand';
import { loadData, saveData } from '../storage';
import { IProject } from '../../interfaces/Project';

export interface IProjectSlice {
  projects: IProject[];
  updateProjects: (projects: IProject[]) => void;
}

const createProjectSlice: StateCreator<IProjectSlice, [], [], IProjectSlice> = (
  set
) => {
  const projects = loadData('projects') ?? [];

  return {
    projects,
    updateProjects: (projects) =>
      set(() => {
        saveData('projects', projects);
        return {
          projects
        };
      })
  };
};

export default createProjectSlice;
