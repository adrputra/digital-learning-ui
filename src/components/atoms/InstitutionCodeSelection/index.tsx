import { useUserStore } from '@/store/user';
import { Loader, Select, SelectProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface Props extends SelectProps {
  placeholder?: string;
  nothingFoundMessage?: string;
  searchable?: boolean;
}
export default function InstitutionCodeSelection({
  placeholder = 'Select Institution ID',
  nothingFoundMessage = 'Nothing found...',
  searchable = true,
  ...props
}: Props) {
    const { institutionList, getInstitutionList } = useUserStore();
    const [opened, { toggle }] = useDisclosure(false);
      
  return (
    <Select
      {...props}
      placeholder={placeholder}
      data={institutionList}
      searchable={searchable}
      nothingFoundMessage={nothingFoundMessage}
      onDropdownOpen={getInstitutionList}
      onClick={toggle}
      rightSection={institutionList.length === 0 && opened && <Loader />}
    />
  );
}
