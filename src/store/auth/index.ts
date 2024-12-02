import { deleteAllIndexedDBs } from '@/libs/utils';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthStore = {
  token: string;
  role: string;
  institutionID: string;
  setRole: (role: string) => void;
  setToken: (token: string) => void;
  setInstitutionID: (institutionID: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: '',
      role: '',
      institutionID: '',
      setRole: (role: string) => set(() => ({ role })),
      setToken: (token: string) => set(() => ({ token })),
      setInstitutionID: (institutionID: string) => set(() => ({ institutionID })),
      clearAuth: () => {
        set(() => ({ token: '', role: '' }));
        localStorage.removeItem('session');
        localStorage.removeItem('menu');
        deleteAllIndexedDBs();
        window.location.href = '/login';
      }
    }),
    {
      name: 'session', // Key to store the data in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
