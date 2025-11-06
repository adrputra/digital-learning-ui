import { useEffect, useState } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Box, Button, Center, Group, Stack, TableData } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import TableBody from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import AddForm from '@/components/organisms/Parameter/AddForm';
import { formatDate } from '@/libs/utils';
import { useParameterStore } from '@/store/parameter';
import DeleteDialogue from '@/components/molecules/DeleteDialogue';
import { deleteParameter } from '@/api/parameter';

export default function Parameter() {
  const [data, setData] = useState<Parameter>();
  const [filter, setFilter] = useState<string>('');
  const [addFormOpened, { open: openAddForm, close: closeAddForm }] = useDisclosure(false);
  const [deleteFormOpened, { open: openDeleteForm, close: closeDeleteForm }] = useDisclosure(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deleteID, setDeleteID] = useState<string>('');

  const { parameterList, getParameterList, resetParameterStore } = useParameterStore();

  useEffect(() => {
    getParameterList();
    return () => {
      resetParameterStore();
    };
  }, []);

  const tableData: TableData = {
    head: ['Key', 'Value', 'Description', 'Last Update', 'Action'],
    body: parameterList
      ?.filter(
        (value) =>
          value.key.toLowerCase().includes(filter) || value.value.toLowerCase().includes(filter)
      )
      .map((value) => [
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
    getParameterList();
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
        <TableHeader title="Parameters" setFilter={setFilter} ActionButton={<ActionButton />} />
        <Box style={{ overflowX: 'auto', maxWidth: '100%' }}>
          <Box style={{ minWidth: 800 }}>
            <TableBody tableData={tableData} layout='auto'/>
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
