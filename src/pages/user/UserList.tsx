import { useEffect, useState } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Center, Group, Stack, TableData, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import TableBody from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import AddForm from '@/components/organisms/User/AddForm';
import { formatDate } from '@/libs/utils';
import { useUserStore } from '@/store/user';
import DeleteDialogue from '@/components/molecules/DeleteDialogue';

export default function UserList() {
  const { userList, getUserList, deleteUser, resetUserStore } = useUserStore();
  const [filter, setFilter] = useState<string>('');
  const [addFormOpened, { open: openAddForm, close: closeAddForm }] = useDisclosure(false);
  const [deleteFormOpened, { open: openDeleteForm, close: closeDeleteForm }] = useDisclosure(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [data, setData] = useState<User>();
  const [deleteID, setDeleteID] = useState<string>('');


  useEffect(() => {
    getUserList();
    return () => {
      resetUserStore();
    };
  }, []);

  const tableData: TableData = {
    head: ['NIP', 'Email', 'Full Name', 'Institution', 'Role', 'Date Created', 'Action'],
    body: userList
      .filter(
        (user) =>
          user.username.toLowerCase().includes(filter.toLowerCase()) ||
          user.email.toLowerCase().includes(filter.toLowerCase()) ||
          user.fullname.toLowerCase().includes(filter.toLowerCase())
      )
      .map((value) => [
        value.username,
        value.email,
        value.fullname,
        <Text fz="sm" style={{ maxWidth: '25vw' }}>
          {value.institution_name}
        </Text>,
        value.role_name,
        formatDate(value.created_at),
        <Group>
          <ActionIcon
            variant="default"
            style={{ border: 'none' }}
            onClick={() => handleEdit(value.username)}
          >
            <IconEdit size={20} color="blue" />
          </ActionIcon>
          <ActionIcon variant="default" style={{ border: 'none' }}
          onClick={() => handleDelete(value.username)}>
            <IconTrash size={20} color="red" />
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

  const handleEdit = (username: string) => {
    setIsEdit(true);
    setData(userList.find((value) => value.username === username));
    openAddForm();
  };

  const handleDelete = (username: string) => {
    setDeleteID(username);
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

  const onConfirmDelete = async () => {
    await deleteUser(deleteID);
    onCloseDeleteForm();
  };

  return (
    <Center>
      <Stack p="sm" w="100%">
        <TableHeader title="User List" setFilter={setFilter} ActionButton={<ActionButton />} />
        <TableBody tableData={tableData} />
      </Stack>
      <AddForm open={addFormOpened} close={onCloseAddForm} isEdit={isEdit} data={data} />
      <DeleteDialogue
        open={deleteFormOpened}
        close={onCloseDeleteForm}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        onConfirm={onConfirmDelete}
      />
    </Center>
  );
}
