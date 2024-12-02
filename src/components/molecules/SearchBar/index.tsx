import { IconSearch } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';

interface Props {
  setFilter: (filter: string) => void;
}

export default function SearchBar({ setFilter }: Props) {
  return (
    <TextInput
      leftSectionPointerEvents="none"
      leftSection={<IconSearch />}
      placeholder="Search"
      onChange={(e) => setFilter(e.target.value)}
    />
  );
}
