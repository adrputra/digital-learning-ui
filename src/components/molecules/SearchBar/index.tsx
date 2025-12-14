import { IconSearch } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';

interface Props {
  onSearch?: (search: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Search' }: Props) {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 500);

  useEffect(() => {
    if (onSearch) {
      onSearch(debounced);
    }
  }, [debounced, onSearch]);

  return (
    <TextInput
      leftSectionPointerEvents="none"
      leftSection={<IconSearch />}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
