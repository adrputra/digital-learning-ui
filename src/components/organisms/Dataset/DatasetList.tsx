import { useEffect, useState } from 'react';
import { IconEye, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Box, Group, Paper, Stack, TableData, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import DeleteDialogue from '@/components/molecules/DeleteDialogue';
import TableBody from '@/components/molecules/TableBody';
import { formatDate } from '@/libs/utils';
import { useDatasetStore } from '@/store/dataset';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

export default function DatasetList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [deleteFormOpened, { open: openDeleteForm, close: closeDeleteForm }] = useDisclosure(false);
  const [deleteID, setDeleteID] = useState<string>('');

  const { datasetList, getDatasetList, deleteDataset, page, total, limit, totalRecords } = useDatasetStore();
  const { institutionID } = useAuthStore();

  useEffect(() => {
    getDatasetList(1);
  }, []);

  const tableData: TableData = {
    head: ['Username', 'Dataset Name', 'Date Created', 'Action'],
    body: datasetList?.map((value) => [
      value.username,
      value.dataset,
      formatDate(value.created_at),
      <Group>
        <ActionIcon variant="default" style={{ border: 'none' }}>
          <IconEye size={20} color="blue" onClick={() => navigate(`/dataset/${institutionID}/${value.username}${location.search}`)} />
        </ActionIcon>
        <ActionIcon
          variant="default"
          style={{ border: 'none' }}
          onClick={() => handleDelete(value.username)}
        >
          <IconTrash size={20} color="red" />
        </ActionIcon>
      </Group>,
    ]),
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
    await deleteDataset(deleteID);
    onCloseDeleteForm();
  };

  const handlePageChange = (newPage: number, newLimit?: number) => {
    getDatasetList(newPage, newLimit ?? limit);
  };

  return (
    <Paper p="md" shadow="xl">
      <Text size="xl" fw="bold">
        Dataset List
      </Text>
      <Stack p="sm" w="100%">
        <Box style={{ overflowX: 'auto', maxWidth: '100%' }}>
          <Box style={{ minWidth: 800 }}>
            <TableBody 
              tableData={tableData} 
              page={page} 
              total={total} 
              limit={limit}
              totalRecords={totalRecords}
              onPageChange={handlePageChange}
            />
          </Box>
        </Box>
      </Stack>
      <DeleteDialogue
        open={deleteFormOpened}
        close={onCloseDeleteForm}
        title="Delete Dataset"
        message={
          <>
            Are you sure you want to delete <b>{deleteID}</b>'s dataset?
          </>
        }
        onConfirm={onConfirm}
      />
    </Paper>
  );
}
