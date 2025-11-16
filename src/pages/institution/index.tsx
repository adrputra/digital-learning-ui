import { useEffect, useState } from 'react';
import { IconCirclePlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Button, Center, Group, Stack, TableData, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import DeleteDialogue from '@/components/molecules/DeleteDialogue';
import TableBody from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import AddForm from '@/components/organisms/Institution/AddForm';
import { useInstitutionStore } from '@/store/institution';

export default function InstitutionList() {
  const [filter, setFilter] = useState<string>('');
  const [addFormOpened, { open: openAddForm, close: closeAddForm }] = useDisclosure(false);
  const [deleteFormOpened, { open: openDeleteForm, close: closeDeleteForm }] = useDisclosure(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [data, setData] = useState<Institution>();
  const [deleteID, setDeleteID] = useState<string>('');
  const { institutionList, getInstitutionList, resetInstitutionStore, deleteInstitution } = useInstitutionStore();

  useEffect(() => {
    getInstitutionList();
    return () => {
      resetInstitutionStore();
    };
  }, []);

  const tableData: TableData = {
    head: ['No.', 'Name', 'Address', 'Phone Number', 'Email', 'Action'],
    body: institutionList
      .filter((value) => value.name.toLowerCase().includes(filter))
      .map((value, index) => [
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
    getInstitutionList();
  };

  return (
    <Center>
      <Stack p="sm" w="100%">
        <TableHeader
          title="Institution List"
          setFilter={setFilter}
          ActionButton={<ActionButton />}
        />
        <TableBody tableData={tableData} />
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
