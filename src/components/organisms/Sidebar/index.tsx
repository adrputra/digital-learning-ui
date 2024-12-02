import { Flex } from '@mantine/core';
import SidebarMenu from '@/components/molecules/SidebarMenu';
import { useLayoutStore } from '@/store/layout';

export default function Sidebar() {
    const { sidebarOpen } = useLayoutStore();
  return (
    <Flex
      gap="lg"
      align={sidebarOpen ? "flex-start" : "center"}
      direction="column"
      wrap="wrap"
    >
      <SidebarMenu />
    </Flex>
  );
}
