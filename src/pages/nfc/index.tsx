import { Grid, SimpleGrid, Stack } from '@mantine/core';
import CheckNFCConnection from '@/components/organisms/NFC/CheckConnection';
import ReadTag from '@/components/organisms/NFC/ReadTag';
import WriteTag from '@/components/organisms/NFC/WriteTag';
import ReadResult from '@/components/organisms/NFC/ReadResult';
import WriteTagUser from '@/components/organisms/NFC/WriteTagUser';

export default function NFC() {
  return (
    <Stack gap="xl">
      <SimpleGrid cols={3}>
        <CheckNFCConnection />
        <WriteTag />
        <WriteTagUser />
      </SimpleGrid>
      <Grid>
        <Grid.Col span={4}>
          <ReadTag />
        </Grid.Col>
        <Grid.Col span={8}>
          <ReadResult />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
