import { MultiSelect } from '@mantine/core';

interface Props {
  value: string[];
  setValue: (value: string[]) => void;
  multiple?: boolean;
}
export default function NFCBlockNumber({ value, setValue, multiple = false }: Props) {
  const availableBlock = [
    '4',
    '5',
    '6',
    '8',
    '9',
    '10',
    '12',
    '13',
    '14',
    '16',
    '17',
    '18',
    '20',
    '21',
    '22',
    '24',
    '25',
    '26',
    '28',
    '29',
    '30',
    '32',
    '33',
    '34',
    '36',
    '37',
    '38',
    '40',
    '41',
    '42',
    '44',
    '45',
    '46',
    '48',
    '49',
    '50',
    '52',
    '53',
    '54',
    '56',
    '57',
    '58',
    '60',
    '61',
    '62',
  ];
  return (
    <MultiSelect
      label={ multiple ? "Block Numbers" : "Block Number (Select one)"}
      data={availableBlock}
      value={value}
      onChange={setValue}
      hidePickedOptions={multiple}
      clearable
      searchable
      withAsterisk
      maxValues={multiple ? 64 : 1}
    />
  );
}
