import { Select, SelectProps } from '@mantine/core';

interface Props extends SelectProps {
  placeholder?: string;
  nothingFoundMessage?: string;
  searchable?: boolean;
  form?: any;
}
export default function GenderSelection({
  placeholder = 'Select Gender',
  nothingFoundMessage = 'Nothing found...',
  searchable = true,
  form,
  ...props
}: Props) {
  return (
    <Select
      {...props}
      placeholder={placeholder}
      defaultValue="Male"
      value={props.defaultValue}
      data={genderOptions}
      onChange={(value) => {
        form.setFieldValue(props.name, value);
      }}
    />
  );
}

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  //   { value: 'other', label: 'Other' },
];
