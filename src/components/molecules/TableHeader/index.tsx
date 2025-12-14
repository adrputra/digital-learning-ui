import React from 'react';
import { Group, Paper, Text, Stack, Box } from '@mantine/core';
import SearchBar from '../SearchBar';

interface Props {
  title?: string;
  onSearch?: (search: string) => void;
  ActionButton?: React.ReactNode;
  searchPlaceholder?: string;
}

export default function TableHeader({ title, onSearch, ActionButton, searchPlaceholder }: Props) {
  return (
    <Paper p="sm" shadow="md" w="100%">
      <Stack gap="md">
        <Box hiddenFrom="sm">
          <Group justify="space-between" align="center">
            <Text size="xl" fw="bold">
              {title}
            </Text>
            {ActionButton}
          </Group>
          {onSearch && <Box mt="xs"><SearchBar onSearch={onSearch} placeholder={searchPlaceholder} /></Box>}
        </Box>

        <Box visibleFrom="sm">
          <Group justify="space-between">
            {onSearch ? <SearchBar onSearch={onSearch} placeholder={searchPlaceholder} /> : <div />}
            <Group>
              <Text size="xl" fw="bold">
                {title}
              </Text>
            </Group>
            <Group>
              {ActionButton}
            </Group>
          </Group>
        </Box>
      </Stack>
    </Paper>
  );
}
