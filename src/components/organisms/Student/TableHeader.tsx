import { IconCirclePlus } from '@tabler/icons-react';
import { Button, Group, Paper, Select, Text } from '@mantine/core';
import SearchBar from '@/components/molecules/SearchBar';

export default function TableHeader() {
  return (
    <Paper p="sm" shadow="md" w="100%" bg='white'>
      <Group justify="space-between">
        <Group>
          <SearchBar />
        </Group>
        <Group>
          <Text size='xl' fw='bold'>Student List</Text>
        </Group>
        <Group>
          <Select
            placeholder="Pick value"
            allowDeselect
            defaultValue="React"
            data={['React', 'Angular', 'Vue', 'Svelte']}
          />
          <Button leftSection={<IconCirclePlus />}>Add</Button>
        </Group>
      </Group>
    </Paper>
  );
}
