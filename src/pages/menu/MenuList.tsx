import { useEffect, useState, useRef } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Box, Button, Center, Group, Stack, TableData } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import DeleteDialogue from '@/components/molecules/DeleteDialogue';
import TableBody, { SortConfig } from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import AddForm from '@/components/organisms/Menu/AddForm';
import { formatDate } from '@/libs/utils';
import { useRoleStore } from '@/store/role';

const sortableColumns: SortConfig = {
  0: 'id',
  1: 'menu_name',
  2: 'menu_route',
  3: 'created_at',
};

export default function MenuList() {
  const { menuList, getMenuList, deleteMenu, resetRoleStore, page, total, limit, totalRecords } = useRoleStore();
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' | undefined>();
  const [addFormOpened, { open: openAddForm, close: closeAddForm }] = useDisclosure(false);
  const [deleteFormOpened, { open: openDeleteForm, close: closeDeleteForm }] = useDisclosure(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [data, setData] = useState<Menu>();
  const [deleteID, setDeleteID] = useState<string>('');
  const isInitialMount = useRef(true);

  useEffect(() => {
    getMenuList(1, limit, search || undefined, sortBy, sortOrder);
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
    getMenuList(1, limit, search || undefined, sortBy, sortOrder);
  }, [search, sortBy, sortOrder]);

  const tableData: TableData = {
    head: ['ID', 'Menu Name', 'Menu Route', 'Date Created', 'Action'],
    body: menuList.map((value) => [
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
    // Refetch with current filters
    getMenuList(page, limit, search || undefined, sortBy, sortOrder);
  };

  const handlePageChange = (newPage: number, newLimit?: number) => {
    getMenuList(newPage, newLimit ?? limit, search || undefined, sortBy, sortOrder);
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
        <TableHeader title="Menu List" onSearch={handleSearch} ActionButton={<ActionButton />} />
        <Box style={{ overflowX: 'auto', maxWidth: '100%' }}>
          <Box style={{ minWidth: 800 }}>
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
          </Box>
        </Box>
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
