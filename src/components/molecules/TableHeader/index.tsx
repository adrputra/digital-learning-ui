import React from 'react';
import { Group, Paper, Select, Text, Stack, Box } from '@mantine/core';
import SearchBar from '../SearchBar';

interface Props {
  title?: string;
  setFilter?: (filter: string) => void;
  ActionButton?: React.ReactNode;
}

export default function TableHeader({ title, setFilter, ActionButton }: Props) {
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
          {setFilter && <Box mt="xs"><SearchBar setFilter={setFilter} /></Box>}
        </Box>

        <Box visibleFrom="sm">
          <Group justify="space-between">
            {setFilter ? <SearchBar setFilter={setFilter} /> : <div />}
            <Group>
              <Text size="xl" fw="bold">
                {title}
              </Text>
            </Group>
            <Group>
              <Select
                placeholder="Pick value"
                allowDeselect
                defaultValue="React"
                data={['React', 'Angular', 'Vue', 'Svelte']}
              />
              {ActionButton}
            </Group>
          </Group>
        </Box>
      </Stack>
    </Paper>
  );
}
