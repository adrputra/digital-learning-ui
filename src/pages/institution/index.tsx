import { useEffect, useState, useRef } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Center, Group, Stack, TableData, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import DeleteDialogue from '@/components/molecules/DeleteDialogue';
import TableBody, { SortConfig } from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import AddForm from '@/components/organisms/Institution/AddForm';
import { useInstitutionStore } from '@/store/institution';

const sortableColumns: SortConfig = {
  1: 'name',
  2: 'address',
  3: 'phone_number',
  4: 'email',
};

export default function InstitutionList() {
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' | undefined>();
  const [addFormOpened, { open: openAddForm, close: closeAddForm }] = useDisclosure(false);
  const [deleteFormOpened, { open: openDeleteForm, close: closeDeleteForm }] = useDisclosure(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [data, setData] = useState<Institution>();
  const [deleteID, setDeleteID] = useState<string>('');
  const { institutionList, getInstitutionList, resetInstitutionStore, deleteInstitution, page, total, limit, totalRecords } = useInstitutionStore();
  const isInitialMount = useRef(true);

  useEffect(() => {
    getInstitutionList(1, limit, search || undefined, sortBy, sortOrder);
    return () => {
      resetInstitutionStore();
    };
  }, []);

  // Refetch when search or sort changes (reset to page 1)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    getInstitutionList(1, limit, search || undefined, sortBy, sortOrder);
  }, [search, sortBy, sortOrder]);

  const tableData: TableData = {
    head: ['No.', 'Name', 'Address', 'Phone Number', 'Email', 'Action'],
    body: institutionList.map((value, index) => [
      index+1,
      <Text fz="sm" style={{ maxWidth: '30vw' }}>
        {value.name}
      </Text>,
      <Text fz="sm" style={{ maxWidth: '30vw' }}>
        {value.address}
      </Text>,
      value.phone_number,
      value.email,
      <Group>
        <ActionIcon variant="default" style={{ border: 'none' }} onClick={() => handleEdit(value.id)}>
          <IconEdit size={20} color="blue" />
        </ActionIcon>
        <ActionIcon variant="default" style={{ border: 'none' }} onClick={() => handleDelete(value.id)}>
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

  const handleEdit = (id: string) => {
    setIsEdit(true);
    console.log(institutionList)
    setData(institutionList.find((value) => value.id === id));
    openAddForm();
  };

  const handleDelete = (id: string) => {
    setDeleteID(id);
    openDeleteForm();
  };

  const onCloseDeleteForm = () => {
    closeDeleteForm();
  };

  const onConfirm = async () => {
    await deleteInstitution(deleteID);
    onCloseDeleteForm();
    // Refetch with current filters
    getInstitutionList(page, limit, search || undefined, sortBy, sortOrder);
  };

  const handlePageChange = (newPage: number, newLimit?: number) => {
    getInstitutionList(newPage, newLimit ?? limit, search || undefined, sortBy, sortOrder);
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
        <TableHeader
          title="Institution List"
          onSearch={handleSearch}
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
      <AddForm open={addFormOpened} close={closeAddForm} isEdit={isEdit} data={data}/>
      <DeleteDialogue
        open={deleteFormOpened}
        close={onCloseDeleteForm}
        title="Delete Institution"
        message="Are you sure you want to delete this institution?"
        onConfirm={onConfirm}
      />
    </Center>
  );
}
