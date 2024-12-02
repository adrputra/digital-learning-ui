import { Loader, Select, SelectProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRoleStore } from '@/store/role';

interface Props extends SelectProps {
  placeholder?: string;
  nothingFoundMessage?: string;
  searchable?: boolean;
}

export default function MenuInputSelection({
  placeholder = 'Pick value',
  nothingFoundMessage = 'Nothing found...',
  searchable = true,
  ...props
}: Props) {
  const { menuList, getMenuList } = useRoleStore();
  const [opened, { toggle }] = useDisclosure(false);

  const data = menuList.map((item) => ({
    value: item.id,
    label: item.menu_name,
  }));

  return (
    <Select
      {...props}
      placeholder={placeholder}
      data={data}
      searchable={searchable}
      nothingFoundMessage={nothingFoundMessage}
      onDropdownOpen={getMenuList}
      onClick={toggle}
      rightSection={data.length === 0 && opened && <Loader />}
    />
  );
}
