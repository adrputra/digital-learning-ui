import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Center, Group, List, Text, useMantineTheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import SidebarIcon from '@/components/atoms/SidebarIcon';
import { useLayoutStore } from '@/store/layout';
import { useMenuStore } from '@/store/menu';

export default function SidebarMenu() {
  const { sidebarOpen } = useLayoutStore();
  const { menuList } = useMenuStore();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const currentPath = window.location.pathname;

  const { t } = useTranslation();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <Group justify={sidebarOpen ? 'flex-start' : 'center'} gap={10} w="100%">
      {menuList.map((menu) => {
        const { hovered, ref } = useHover();
        return (
          <List w="100%" key={menu.id}>
            <Group
              ref={ref}
              w="100%"
              h={50}
              px={20}
              justify={sidebarOpen ? 'flex-start' : 'center'}
              style={{
                cursor: hovered ? 'pointer' : 'default',
                backgroundColor: hovered || menu.menu_route === `/${currentPath.split('/')[1]}` ? theme.colors.primary[8] : 'transparent',
                borderRight:
                  menu.menu_route === `/${currentPath.split('/')[1]}` ? `3px solid ${theme.colors.primary[0]}` : 'none',
              }}
              onClick={() => handleClick(menu.menu_route)}
            >
              <SidebarIcon page={menu.menu_route} />
              {sidebarOpen && (
                <Center>
                  <Text size="md" fw={700}>
                    {t(menu.menu_name)}
                  </Text>
                </Center>
              )}
            </Group>
          </List>
        );
      })}
    </Group>
  );
}
