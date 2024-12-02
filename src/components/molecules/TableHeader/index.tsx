import React from 'react';
import { Group, Paper, Select, Text } from '@mantine/core';
import SearchBar from '../SearchBar';

interface Props {
  title?: string;
  setFilter?: (filter: string) => void;
  ActionButton?: React.ReactNode;
}

export default function TableHeader({ title, setFilter, ActionButton }: Props) {
  return (
    <Paper p="sm" shadow="md" w="100%">
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
    </Paper>
  );
}
