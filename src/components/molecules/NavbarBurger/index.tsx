import { Burger, Group } from '@mantine/core';
import { useLayoutStore } from '@/store/layout';

export default function NavbarBurger() {
  const { sidebarOpen, mobileOpened, setMobileOpened, setSidebarOpen } = useLayoutStore();
  return (
    <Group>
      <Burger
        opened={sidebarOpen}
        onClick={setSidebarOpen}
        visibleFrom="sm"
        size="sm"
        color="primary.0"
      />
      <Burger opened={mobileOpened} onClick={setMobileOpened} hiddenFrom="sm" size="sm" />
    </Group>
  );
}
