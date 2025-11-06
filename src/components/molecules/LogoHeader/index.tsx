import { Group, Text } from '@mantine/core';
import { Logo } from '@/components/atoms/Logo';

export default function LogoHeader() {
  return (
    <Group>
      <Logo />
      <Text fz={{ base: 'md', sm: 'lg' }} fw={900} lineClamp={1}>
        Digital Learning
      </Text>
    </Group>
  );
}
