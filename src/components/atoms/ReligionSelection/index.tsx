import { Select, SelectProps } from '@mantine/core';

interface Props extends SelectProps {
  placeholder?: string;
  nothingFoundMessage?: string;
  searchable?: boolean;
  form?: any;
}
export default function ReligionSelection({
  placeholder = 'Select Religion',
  nothingFoundMessage = 'Nothing found...',
  searchable = true,
  form,
  ...props
}: Props) {
  return (
    <Select
      {...props}
      placeholder={placeholder}
      defaultValue="Islam"
      value={props.defaultValue}
      data={religionOptions}
      onChange={(value) => {
        form.setFieldValue(props.name, value);
      }}
    />
  );
}

const religionOptions = [
  { value: 'Islam', label: 'Islam' },
  { value: 'Kristen', label: 'Kristen' },
  { value: 'Katolik', label: 'Katolik' },
  { value: 'Hindu', label: 'Hindu' },
  { value: 'Budha', label: 'Budha' },
  { value: 'Konghucu', label: 'Konghucu' },
];
