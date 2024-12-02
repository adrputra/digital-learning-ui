import { SimpleGrid, Stack } from '@mantine/core';
import DatasetList from '@/components/organisms/Dataset/DatasetList';
import ModelTrainingHistory from '@/components/organisms/Dataset/ModelTrainingHistory';
import TrainModel from '@/components/organisms/Dataset/TrainModel';
import UploadDataset from '@/components/organisms/Dataset/Upload';

export default function Dataset() {
  return (
    <Stack gap="xl">
      <SimpleGrid cols={2}>
        <UploadDataset />
        <TrainModel />
      </SimpleGrid>
      <DatasetList />
      <ModelTrainingHistory />
    </Stack>
  );
}
