import { StateCreator } from 'zustand';
import { IExperience } from '../../interfaces/Experience';
import { loadData, saveData } from '../storage';

export interface IExperienceSlice {
  experiences: IExperience[];
  updateExperiences: (experiences: IExperience[]) => void;
}

const createExperienceSlice: StateCreator<
  IExperienceSlice,
  [],
  [],
  IExperienceSlice
> = (set) => {
  const experiences = loadData('experiences') ?? [];

  return {
    experiences,
    activeExperience: null,
    updateExperiences: (experiences) =>
      set(() => {
        saveData('experiences', experiences);
        return {
          experiences
        };
      })
  };
};

export default createExperienceSlice;
