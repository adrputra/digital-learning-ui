import { Group, Text } from '@mantine/core';
import { Logo } from '@/components/atoms/Logo';

export default function LogoHeader() {
  return (
    <Group>
      <Logo />
      <Text size="lg" fw={900}>
        Digital Learning
      </Text>
    </Group>
  );
}
