import { StateCreator } from 'zustand';
import { loadData, saveData } from '../storage';
import { IEducation } from '../../interfaces/Education';

export interface IEducationSlice {
  educations: IEducation[];
  updateEducations: (educations: IEducation[]) => void;
}

const createEducationSlice: StateCreator<
  IEducationSlice,
  [],
  [],
  IEducationSlice
> = (set) => {
  const educations = loadData('educations') ?? [];

  return {
    educations,
    updateEducations: (educations) =>
      set(() => {
        saveData('educations', educations);
        return {
          educations
        };
      })
  };
};

export default createEducationSlice;
