import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MantineColorsTuple } from '@mantine/core';
import { darkColors, lightColors } from '@/types/themes';

// Define the store type
type ThemeStore = {
  colors: MantineColorsTuple;
  isDarkMode: boolean;
  toggleColorScheme: () => void;
  setColors: (colors: MantineColorsTuple) => void;
};

// Create the Zustand store
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      colors: lightColors,
      isDarkMode: false, // Default to light mode
      setColors: (colors: MantineColorsTuple) => set({ colors }),
      toggleColorScheme: () =>
        set((state) => {
          const isDarkMode = !state.isDarkMode;
          const colors = isDarkMode ? darkColors : lightColors;
          return { isDarkMode, colors };
        }),
    }),
    {
      name: 'theme', // Key to store the data in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
