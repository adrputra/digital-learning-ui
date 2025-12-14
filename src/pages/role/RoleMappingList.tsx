import { useEffect, useState, useRef } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Center, Group, Stack, TableData } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import DeleteDialogue from '@/components/molecules/DeleteDialogue';
import TableBody, { SortConfig } from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import AddFormMapping from '@/components/organisms/Role/AddFormMapping';
import { formatDate } from '@/libs/utils';
import { useRoleStore } from '@/store/role';

const sortableColumns: SortConfig = {
  0: 'id',
  1: 'menu_name',
  2: 'role_name',
  3: 'menu_route',
  4: 'access_method',
  5: 'created_at',
};

export default function RoleMappingList() {
  const { roleMapping, getRoleMapping, deleteRoleMapping, resetRoleStore, page, total, limit, totalRecords } = useRoleStore();
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' | undefined>();
  const [addFormOpened, { open: openAddForm, close: closeAddForm }] = useDisclosure(false);
  const [deleteFormOpened, { open: openDeleteForm, close: closeDeleteForm }] = useDisclosure(false);
  const [deleteID, setDeleteID] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [data, setData] = useState<RoleMapping>();
  const isInitialMount = useRef(true);

  useEffect(() => {
    getRoleMapping(1, limit, search || undefined, sortBy, sortOrder);
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
    getRoleMapping(1, limit, search || undefined, sortBy, sortOrder);
  }, [search, sortBy, sortOrder]);

  const tableData: TableData = {
    head: ['ID', 'Menu Name', 'Role Name', 'Menu Route', 'Access Method', 'Date', 'Action'],
    body: roleMapping.map((value) => [
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
    // Refetch with current filters
    getRoleMapping(page, limit, search || undefined, sortBy, sortOrder);
  };

  const handlePageChange = (newPage: number, newLimit?: number) => {
    getRoleMapping(newPage, newLimit ?? limit, search || undefined, sortBy, sortOrder);
  };

  const handleSearch = (search: string) => {
    setSearch(search);
  };

  const handleSort = (fieldName: string, order: 'ASC' | 'DESC') => {
    setSortBy(fieldName);
    setSortOrder(order);
  };

  return (
    <Center>
      <Stack p="sm" w="100%">
        <TableHeader
          title="Role Mapping List"
          onSearch={handleSearch}
          searchPlaceholder="Search by menu name or role name"
          ActionButton={<ActionButton />}
        />
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
