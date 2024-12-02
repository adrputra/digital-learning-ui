import { Outlet } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import { useLayoutStore } from '@/store/layout';
import { useThemeStore } from '@/store/theme';

export default function AppShellWrapper() {
  const { sidebarOpen, mobileOpened } = useLayoutStore();
  const { colors } = useThemeStore();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: sidebarOpen ? 300 : 60,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened },
      }}
      padding="sm"
      transitionDuration={500}
      transitionTimingFunction="ease-in-out"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar py="sm">
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main bg={colors[9]}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
