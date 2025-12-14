import { useEffect, useState, useRef } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Center, Group, Stack, TableData } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import TableBody, { SortConfig } from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import { formatDate } from '@/libs/utils';
import { useRoleStore } from '@/store/role';
import AddFormRole from '@/components/organisms/Role/AddFormRole';

const sortableColumns: SortConfig = {
  0: 'role_name',
  1: 'role_desc',
  2: 'created_at',
};

export default function RoleList() {
  const { roleList, getRoleList, resetRoleStore, page, total, limit, totalRecords } = useRoleStore();
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' | undefined>();
  const [opened, { open, close }] = useDisclosure(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    getRoleList(1, limit, search || undefined, sortBy, sortOrder);
    return () => {
      resetRoleStore();
    };
  }, []);

  // Refetch when search or sort changes (reset to page 1)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    getRoleList(1, limit, search || undefined, sortBy, sortOrder);
  }, [search, sortBy, sortOrder]);

  const tableData: TableData = {
    head: ['Name', 'Description', 'Created At', 'Action'],
    body: roleList.map((value) => [
      value.role_name,
      value.role_desc,
      `${formatDate(value.created_at)} by ${value.created_by}`,
      <Group>
        <ActionIcon variant="default" style={{ border: 'none' }}>
          <IconEdit size={20} color="blue" />
        </ActionIcon>
        <ActionIcon variant="default" style={{ border: 'none' }}>
          <IconTrash size={20} color="red" />
        </ActionIcon>
      </Group>,
    ]),
  };

  const ActionButton = () => {
    return (
      <Button leftSection={<IconCirclePlus />} onClick={open}>
        Add
      </Button>
    );
  };

  const handlePageChange = (newPage: number, newLimit?: number) => {
    getRoleList(newPage, newLimit ?? limit, search || undefined, sortBy, sortOrder);
  };

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  const handleSort = (fieldName: string, order: 'ASC' | 'DESC') => {
    setSortBy(fieldName);
    setSortOrder(order);
  };

  return (
    <Center>
      <Stack p="sm" w="100%">
        <TableHeader title='Role List' onSearch={handleSearch} ActionButton={<ActionButton />} />
        <TableBody 
          tableData={tableData} 
          page={page} 
          total={total} 
          limit={limit}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
          sortableColumns={sortableColumns}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </Stack>

      <AddFormRole open={opened} close={close} />
    </Center>
  );
}
