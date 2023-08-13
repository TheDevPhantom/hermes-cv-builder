import { StateCreator } from 'zustand';
import { IProfileDetails } from '../../interfaces/Profile';
import { loadData, saveData } from '../storage';

export interface IProfileSlice {
  profileDetails: IProfileDetails;
  setProfileDetails: (profileDetails: Partial<IProfileDetails>) => void;
}

const createProfileSlice: StateCreator<IProfileSlice, [], [], IProfileSlice> = (
  set
) => {
  const profileDetails = loadData('profileDetails') ?? {
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    bio: ''
  };

  return {
    profileDetails,
    setProfileDetails: (profileDetails) =>
      set((state) => {
        const newProfileDetails = {
          ...state.profileDetails,
          ...profileDetails
        };
        saveData('profileDetails', newProfileDetails);

        return {
          profileDetails: newProfileDetails
        };
      })
  };
};

export default createProfileSlice;
