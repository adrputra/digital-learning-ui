import { Select } from '@mantine/core';

export default function FilterDropdown() {
  return (
    <Select
      placeholder="Pick value"
      allowDeselect
      defaultValue="React"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
