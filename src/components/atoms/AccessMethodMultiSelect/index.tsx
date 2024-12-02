import { MultiSelect, MultiSelectProps } from '@mantine/core';

interface Props extends MultiSelectProps {
  placeholder?: string;
  nothingFoundMessage?: string;
  searchable?: boolean;
}

export default function AccessMethodMultiSelect({
  placeholder = 'Pick value',
  nothingFoundMessage = 'Nothing found...',
  searchable = true,
  ...props
}: Props) {
  const data = ['GET', 'POST', 'PUT', 'DELETE'];
  return (
    <MultiSelect
      {...props}
      placeholder={placeholder}
      nothingFoundMessage={nothingFoundMessage}
      searchable={searchable}
      data={data}
    />
  );
}
