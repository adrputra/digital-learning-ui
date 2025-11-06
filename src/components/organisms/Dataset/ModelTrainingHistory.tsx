import DeleteDialogue from "@/components/molecules/DeleteDialogue";
import TableBody from "@/components/molecules/TableBody";
import { formatDate } from "@/libs/utils";
import { useDatasetStore } from "@/store/dataset";
import { ActionIcon, Badge, Box, Group, Paper, Stack, TableData, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";

export default function ModelTrainingHistory() {
  const [deleteFormOpened, { open: openDeleteForm, close: closeDeleteForm }] = useDisclosure(false);
  const [deleteID, setDeleteID] = useState<string>('');
  const [filter, setFilter] = useState<FilterModelTrainingHistory>({
    institution_id: '',
    status: '',
    is_used: '',
    order_by: '',
    sort_type: '',
  });

  const { modelTrainingHistory, getModelTrainingHistory, deleteDataset } = useDatasetStore();

  useEffect(() => {
    getModelTrainingHistory(filter);
  }, []);

  const tableData: TableData = {
    head: ['ID', 'Institution ID', 'Status', '', 'Date'],
    body: modelTrainingHistory?.map((value) => [
      value.id,
      value.institution_id,
      value.status,
      value.is_used === '1' ? <Badge color="green">Active</Badge> : null,
      formatDate(value.created_at),
      // <Group>
      //   <ActionIcon variant="default" style={{ border: 'none' }}>
      //     <IconEye size={20} color="blue" />
      //   </ActionIcon>
      //   <ActionIcon
      //     variant="default"
      //     style={{ border: 'none' }}
      //     onClick={() => handleDelete(value.id)}
      //   >
      //     <IconTrash size={20} color="red" />
      //   </ActionIcon>
      // </Group>,
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

  return (
    <Paper p="md" shadow="xl">
      <Text size="xl" fw="bold">
        Model Training History
      </Text>
      <Stack p="sm" w="100%">
        <Box style={{ overflowX: 'auto', maxWidth: '100%' }}>
          <Box style={{ minWidth: 800 }}>
            <TableBody tableData={tableData} />
          </Box>
        </Box>
      </Stack>
      {/* <DeleteDialogue
        open={deleteFormOpened}
        close={onCloseDeleteForm}
        title="Delete Dataset"
        message={
          <>
            Are you sure you want to delete <b>{deleteID}</b>'s dataset?
          </>
        }
        onConfirm={onConfirm}
      /> */}
    </Paper>
  );
}
