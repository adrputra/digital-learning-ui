import { IconLanguage } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';

export default function LanguageIcon() {
  return (
    <ActionIcon variant="light" radius="xl" aria-label="Settings">
      <IconLanguage style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  );
}
