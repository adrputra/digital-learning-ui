import { useEffect, useState, useRef } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Center, Group, Stack, TableData, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import TableBody, { SortConfig } from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import AddForm from '@/components/organisms/User/AddForm';
import { formatDate } from '@/libs/utils';
import { useUserStore } from '@/store/user';
import DeleteDialogue from '@/components/molecules/DeleteDialogue';

export default function UserList() {
  const { userList, getUserList, deleteUser, resetUserStore, page, total, limit, totalRecords } = useUserStore();
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' | undefined>();
  const [addFormOpened, { open: openAddForm, close: closeAddForm }] = useDisclosure(false);
  const [deleteFormOpened, { open: openDeleteForm, close: closeDeleteForm }] = useDisclosure(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [data, setData] = useState<User>();
  const [deleteID, setDeleteID] = useState<string>('');
  const isInitialMount = useRef(true);

  // Define sortable columns: column index -> API field name
  const sortableColumns: SortConfig = {
    0: 'username', // NIP
    1: 'email', // Email
    2: 'fullname', // Full Name
    3: 'institution_name', // Institution
    4: 'role_name', // Role
    5: 'created_at', // Date Created
  };

  useEffect(() => {
    getUserList(1, limit, search || undefined, sortBy, sortOrder);
    return () => {
      resetUserStore();
    };
  }, []);

  // Refetch when search or sort changes (reset to page 1)
  useEffect(() => {
    // Skip initial mount (handled by first useEffect)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    getUserList(1, limit, search || undefined, sortBy, sortOrder);
  }, [search, sortBy, sortOrder]);

  const tableData: TableData = {
    head: ['NIP', 'Email', 'Full Name', 'Institution', 'Role', 'Date Created', 'Action'],
    body: userList.map((value) => [
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
    // Refetch with current filters
    getUserList(page, limit, search, sortBy, sortOrder);
  };

  const handlePageChange = (newPage: number, newLimit?: number) => {
    getUserList(newPage, newLimit ?? limit, search, sortBy, sortOrder);
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
        <TableHeader title="User List" onSearch={handleSearch} ActionButton={<ActionButton />} />
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
