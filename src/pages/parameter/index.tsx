import { useEffect, useState, useRef } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Box, Button, Center, Group, Stack, TableData } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import TableBody, { SortConfig } from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import AddForm from '@/components/organisms/Parameter/AddForm';
import { formatDate } from '@/libs/utils';
import { useParameterStore } from '@/store/parameter';
import DeleteDialogue from '@/components/molecules/DeleteDialogue';
import { deleteParameter } from '@/api/parameter';

const sortableColumns: SortConfig = {
  0: 'key',
  1: 'value',
  2: 'description',
  3: 'updated_at',
};

export default function Parameter() {
  const [data, setData] = useState<Parameter>();
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' | undefined>();
  const [addFormOpened, { open: openAddForm, close: closeAddForm }] = useDisclosure(false);
  const [deleteFormOpened, { open: openDeleteForm, close: closeDeleteForm }] = useDisclosure(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deleteID, setDeleteID] = useState<string>('');
  const isInitialMount = useRef(true);

  const { parameterList, getParameterList, resetParameterStore, page, total, limit, totalRecords } = useParameterStore();

  useEffect(() => {
    getParameterList(1, limit, search || undefined, sortBy, sortOrder);
    return () => {
      resetParameterStore();
    };
  }, []);

  // Refetch when search or sort changes (reset to page 1)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    getParameterList(1, limit, search || undefined, sortBy, sortOrder);
  }, [search, sortBy, sortOrder]);

  const tableData: TableData = {
    head: ['Key', 'Value', 'Description', 'Last Update', 'Action'],
    body: parameterList?.map((value) => [
      value.key,
      value.value,
      value.description,
      `${formatDate(value.updated_at)} by ${value.updated_by}`,
      <Group>
        <ActionIcon
          variant="default"
          style={{ border: 'none' }}
          onClick={() => handleEdit(value.key)}
        >
          <IconEdit size={20} color="blue" />
        </ActionIcon>
        <ActionIcon
          variant="default"
          style={{ border: 'none' }}
          onClick={() => handleDelete(value.key)}
        >
          <IconTrash size={20} color="red" />
        </ActionIcon>
      </Group>,
    ]),
  };

  const handleEdit = (key: string) => {
    setIsEdit(true);
    setData(parameterList.find((value) => value.key === key));
    openAddForm();
  };

  const handleDelete = (id: string) => {
    setDeleteID(id);
    openDeleteForm();
  };

  const onCloseDeleteForm = () => {
    setDeleteID('');
    closeDeleteForm();
  };

  const onCloseAddForm = () => {
    setIsEdit(false);
    setData(undefined);
    closeAddForm();
  };

  const onConfirm = async () => {
    await deleteParameter(deleteID);
    closeDeleteForm();
    // Refetch with current filters
    getParameterList(page, limit, search || undefined, sortBy, sortOrder);
  };

  const handlePageChange = (newPage: number, newLimit?: number) => {
    getParameterList(newPage, newLimit ?? limit, search || undefined, sortBy, sortOrder);
  };

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  const handleSort = (fieldName: string, order: 'ASC' | 'DESC') => {
    setSortBy(fieldName);
    setSortOrder(order);
  };

  const ActionButton = () => {
    return (
      <Button leftSection={<IconCirclePlus />} onClick={openAddForm}>
        Add
      </Button>
    );
  };

  return (
    <Center>
      <Stack p="sm" w="100%">
        <TableHeader title="Parameters" onSearch={handleSearch} ActionButton={<ActionButton />} />
        <Box style={{ overflowX: 'auto', maxWidth: '100%' }}>
          <Box style={{ minWidth: 800 }}>
            <TableBody 
              tableData={tableData} 
              layout='auto'
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
        title='Delete Parameter'
        message="Are you sure you want to delete this parameter?"
        onConfirm={onConfirm}
      />
    </Center>
  );
}
