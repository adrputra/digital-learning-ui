import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type MenuStore = {
  menuList: Menu[];
  setMenuList: (menuList: Menu[]) => void;
};

export const useMenuStore = create<MenuStore>()(
  persist(
    (set) => ({
      menuList: [],
      setMenuList: (menuList: Menu[]) => set({ menuList }),
    }),
    {
      name: 'menu', // Key to store the data in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
