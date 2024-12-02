import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './styles.css';

import { useMemo } from 'react';
import { createTheme, Loader, LoadingOverlay, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import RingLoader from './components/atoms/RingLoader';
import { Router } from './Router';
import { useLayoutStore } from './store/layout';
import { useThemeStore } from './store/theme';

export default function App() {
  const { isLoading } = useLayoutStore();
  const { colors, isDarkMode } = useThemeStore();

  const theme = useMemo(() => {
    return createTheme({
      colors: {
        primary: colors,
      },

      components: {
        Paper: {
          styles: () => ({
            root: {
              backgroundColor: isDarkMode ? colors[5] : 'white',
            },
          }),
        },
        Loader: Loader.extend({
          defaultProps: {
            loaders: { ...Loader.defaultLoaders, ring: RingLoader },
            type: 'ring',
          },
        }),
      },
    });
  }, [isDarkMode]);

  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-center" autoClose={5000} />
      <LoadingOverlay visible={isLoading} overlayProps={{ fixed: true }} loaderProps={{ children: <Loader /> }} />
      <Router />
    </MantineProvider>
  );
}
