import { useEffect, useState } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Center, Group, Stack, TableData } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import DeleteDialogue from '@/components/molecules/DeleteDialogue';
import TableBody from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import AddFormMapping from '@/components/organisms/Role/AddFormMapping';
import { formatDate } from '@/libs/utils';
import { useRoleStore } from '@/store/role';

export default function RoleMappingList() {
  const { roleMapping, getRoleMapping, deleteRoleMapping, resetRoleStore } = useRoleStore();
  const [filter, setFilter] = useState<string>('');
  const [addFormOpened, { open: openAddForm, close: closeAddForm }] = useDisclosure(false);
  const [deleteFormOpened, { open: openDeleteForm, close: closeDeleteForm }] = useDisclosure(false);
  const [deleteID, setDeleteID] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [data, setData] = useState<RoleMapping>();

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
            <IconEdit size={20} color="blue" onClick={() => handleEdit(value.id)} />
          </ActionIcon>
          <ActionIcon variant="default" style={{ border: 'none' }}>
            <IconTrash size={20} color="red" onClick={() => handleDelete(value.id)} />
          </ActionIcon>
        </Group>,
      ]),
  };

  const ActionButton = () => {
    return (
      <Button leftSection={<IconCirclePlus />} onClick={openAddForm}>
        Add
      </Button>
    );
  };

  const handleEdit = (id: string) => {
    setIsEdit(true);
    setData(roleMapping.find((value) => value.id === id));
    openAddForm();
  };

  const handleDelete = (id: string) => {
    setDeleteID(id);
    openDeleteForm();
  };

  const onCloseAddForm = () => {
    setIsEdit(false);
    setData(undefined);
    closeAddForm();
  };

  const onCloseDeleteForm = () => {
    setDeleteID('');
    closeDeleteForm();
  };

  const onConfirm = async () => {
    await deleteRoleMapping(deleteID);
    onCloseDeleteForm();
    getRoleMapping();
  };

  return (
    <Center>
      <Stack p="sm" w="100%">
        <TableHeader
          title="Role Mapping List"
          setFilter={setFilter}
          ActionButton={<ActionButton />}
        />
        <TableBody tableData={tableData} />
      </Stack>

      <AddFormMapping open={addFormOpened} close={onCloseAddForm} isEdit={isEdit} data={data} />
      <DeleteDialogue
        open={deleteFormOpened}
        close={onCloseDeleteForm}
        title="Delete Menu"
        message="Are you sure you want to delete this role mapping?"
        onConfirm={onConfirm}
      />
    </Center>
  );
}
