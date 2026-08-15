import { create } from 'zustand';
import { UserRole } from './useAppStore';

export interface OnboardingData {
  // Step 1: Account
  email?: string;
  password?: string;
  userName?: string;
  role?: UserRole;
  
  // Step 2: Profile
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  company?: string;
  
  // Step 3: Interests
  interests?: string[];
  
  // Step 4: Experience
  experienceLevel?: string;
  
  // Step 5: Goals
  goals?: string[];
}

interface OnboardingState {
  currentStep: number;
  data: OnboardingData;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (newData: Partial<OnboardingData>) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 1,
  data: {
    role: 'user',
    interests: [],
    goals: [],
  },
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 6) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
  reset: () => set({ currentStep: 1, data: { role: 'user', interests: [], goals: [] } }),
}));
