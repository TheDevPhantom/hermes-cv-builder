import { create } from 'zustand';
import createProfileSlice, { IProfileSlice } from './slices/profileSlice';
import createExperienceSlice, {
  IExperienceSlice
} from './slices/experienceSlice';
import createEducationSlice, { IEducationSlice } from './slices/educationSlice';
import createProjectSlice, { IProjectSlice } from './slices/projectSlice';

const useStore = create<
  IProfileSlice & IExperienceSlice & IEducationSlice & IProjectSlice
>()((...a) => ({
  ...createProfileSlice(...a),
  ...createExperienceSlice(...a),
  ...createEducationSlice(...a),
  ...createProjectSlice(...a)
}));

export default useStore;
