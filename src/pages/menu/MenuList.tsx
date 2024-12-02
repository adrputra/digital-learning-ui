import { useEffect, useState } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Center, Group, Stack, TableData } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import DeleteDialogue from '@/components/molecules/DeleteDialogue';
import TableBody from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import AddForm from '@/components/organisms/Menu/AddForm';
import { formatDate } from '@/libs/utils';
import { useRoleStore } from '@/store/role';

export default function MenuList() {
  const { menuList, getMenuList, deleteMenu, resetRoleStore } = useRoleStore();
  const [addFormOpened, { open: openAddForm, close: closeAddForm }] = useDisclosure(false);
  const [deleteFormOpened, { open: openDeleteForm, close: closeDeleteForm }] = useDisclosure(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [data, setData] = useState<Menu>();
  const [deleteID, setDeleteID] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    getMenuList();
    return () => {
      resetRoleStore();
    };
  }, []);

  const tableData: TableData = {
    head: ['ID', 'Menu Name', 'Menu Route', 'Date Created', 'Action'],
    body: menuList
      .filter(
        (value) =>
          value.menu_name.toLowerCase().includes(filter) ||
          value.menu_route.toLowerCase().includes(filter)
      )
      .map((value) => [
        value.id,
        value.menu_name,
        value.menu_route,
        formatDate(value.created_at),
        <Group>
          <ActionIcon
            variant="default"
            style={{ border: 'none' }}
            onClick={() => handleEdit(value.id)}
          >
            <IconEdit size={20} color="blue" />
          </ActionIcon>
          <ActionIcon
            variant="default"
            style={{ border: 'none' }}
            onClick={() => handleDelete(value.id)}
          >
            <IconTrash size={20} color="red" />
          </ActionIcon>
        </Group>,
      ]),
  };

  const handleEdit = (id: string) => {
    setIsEdit(true);
    setData(menuList.find((value) => value.id === id));
    openAddForm();
  };

  const onCloseAddForm = () => {
    setIsEdit(false);
    setData(undefined);
    closeAddForm();
  };

  const ActionButton = () => {
    return (
      <Button leftSection={<IconCirclePlus />} onClick={openAddForm}>
        Add
      </Button>
    );
  };

  const handleDelete = (id: string) => {
    setDeleteID(id);
    openDeleteForm();
  };

  const onCloseDeleteForm = () => {
    setDeleteID('');
    closeDeleteForm();
  };

  const onConfirm = async () => {
    await deleteMenu(deleteID);
    onCloseDeleteForm();
    getMenuList();
  };

  return (
    <Center>
      <Stack p="sm" w="100%">
        <TableHeader title="Menu List" setFilter={setFilter} ActionButton={<ActionButton />} />
        <TableBody tableData={tableData} />
      </Stack>
      <AddForm open={addFormOpened} close={onCloseAddForm} isEdit={isEdit} data={data} />
      <DeleteDialogue
        open={deleteFormOpened}
        close={onCloseDeleteForm}
        title='Delete Menu'
        message="Are you sure you want to delete this menu?"
        onConfirm={onConfirm}
      />
    </Center>
  );
}
