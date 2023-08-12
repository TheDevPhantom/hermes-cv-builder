import { create } from 'zustand';

interface IProfileDetails {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  bio: string;
}

type Store = {
  profileDetails: IProfileDetails;
  setProfileDetails: (profileDetails: Partial<IProfileDetails>) => void;
};

const useStore = create<Store>()((set) => ({
  profileDetails: {
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    bio: ''
  },
  setProfileDetails: (profileDetails) =>
    set((state) => ({
      ...state,
      profileDetails: { ...state.profileDetails, ...profileDetails }
    }))
}));

export default useStore;
