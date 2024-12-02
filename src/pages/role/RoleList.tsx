import { useEffect, useState } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Center, Group, Stack, TableData } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import TableBody from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import AddForm from '@/components/organisms/Role/AddForm';
import { formatDate } from '@/libs/utils';
import { useRoleStore } from '@/store/role';

export default function RoleList() {
  const { roleMapping, getRoleMapping, resetRoleStore } = useRoleStore();
  const [filter, setFilter] = useState<string>('');
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    getRoleMapping();
    return () => {
      resetRoleStore();
    };
  }, []);

  const tableData: TableData = {
    head: ['ID', 'Menu Name', 'Role Name', 'Menu Route', 'Access Method', 'Date', 'Action'],
    body: roleMapping
      .filter(
        (value) =>
          value.menu_name.toLowerCase().includes(filter) ||
          value.role_name.toLowerCase().includes(filter)
      )
      .map((value) => [
        value.id,
        value.menu_name,
        value.role_name,
        value.menu_route,
        value.access_method,
        formatDate(value.created_at),
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

  return (
    <Center>
      <Stack p="sm" w="100%">
        <TableHeader title='Role Mapping List' setFilter={setFilter} ActionButton={<ActionButton />} />
        <TableBody tableData={tableData} />
      </Stack>

      <AddForm open={opened} close={close} />
    </Center>
  );
}
