import { useEffect } from 'react';
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { useThemeStore } from '@/store/theme';

export default function ThemeButton() {
  const { setColorScheme } = useMantineColorScheme();
  const { isDarkMode, toggleColorScheme } = useThemeStore();

  useEffect(() => {
    isDarkMode ? setColorScheme('dark') : setColorScheme('light');
  }, [isDarkMode]);

  const toggleClick = () => {
    if (isDarkMode) {
      setColorScheme('light');
    } else {
      setColorScheme('dark');
    }
    toggleColorScheme();
  };

  return (
    <ActionIcon
      variant="light"
      color={isDarkMode ? 'blue' : 'yellow'}
      radius="xl"
      aria-label="Settings"
      onClick={toggleClick}
    >
      {isDarkMode ? (
        <IconMoonFilled
          style={{ width: '70%', height: '70%' }}
          stroke={1.5}
        />
      ) : (
        <IconSunFilled
          style={{ width: '70%', height: '70%' }}
          stroke={1.5}
        />
      )}
    </ActionIcon>
  );
}
