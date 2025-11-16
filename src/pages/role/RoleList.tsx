import { useEffect, useState } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Center, Group, Stack, TableData } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import TableBody from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import { formatDate } from '@/libs/utils';
import { useRoleStore } from '@/store/role';
import AddFormRole from '@/components/organisms/Role/AddFormRole';

export default function RoleList() {
  const { roleList, getRoleList, resetRoleStore } = useRoleStore();
  const [filter, setFilter] = useState<string>('');
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    getRoleList();
    return () => {
      resetRoleStore();
    };
  }, []);

  const tableData: TableData = {
    head: ['Name', 'Description', 'Created At', 'Action'],
    body: roleList
      .filter(
        (value) =>
          value.id.toLowerCase().includes(filter) ||
          value.role_name.toLowerCase().includes(filter) ||
          value.role_desc.toLowerCase().includes(filter)
      )
      .map((value) => [
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

  return (
    <Center>
      <Stack p="sm" w="100%">
        <TableHeader title='Role List' setFilter={setFilter} ActionButton={<ActionButton />} />
        <TableBody tableData={tableData} />
      </Stack>

      <AddFormRole open={opened} close={close} />
    </Center>
  );
}
