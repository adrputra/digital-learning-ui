import { useUserStore } from '@/store/user';
import { Loader, Select, SelectProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface Props extends SelectProps {
  placeholder?: string;
  nothingFoundMessage?: string;
  searchable?: boolean;
}

export default function UserInputSelection({
  placeholder = 'Select User',
  nothingFoundMessage = 'Nothing found...',
  searchable = true,
  ...props
}: Props) {
    const { userList, getUserList } = useUserStore();
    const [opened, { toggle }] = useDisclosure(false);

    const data = userList.map((value) => ({
        value: value.username,
        label: `${value.fullname} (${value.username})`,
      }));

  return (
    <Select
      {...props}
      placeholder={placeholder}
      data={data}
      searchable={searchable}
      nothingFoundMessage={nothingFoundMessage}
      onDropdownOpen={getUserList}
      onClick={toggle}
      rightSection={data.length === 0 && opened && <Loader />}
    />
  );
}
