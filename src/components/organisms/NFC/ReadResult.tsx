import { Code, Group, Paper, Stack, Text } from '@mantine/core';
import { useNFCStore } from '@/store/nfc';

export default function ReadResult() {
  const { nfcTagUID, nfcDatas } = useNFCStore();

  return (
    <Paper p="md" shadow="xl">
      <Text size="xl" fw="bold">
        NFC Tag Data
      </Text>
      <Stack mt="md" justify="space-between">
        <Text>Tag UID : {nfcTagUID ?? '-'}</Text>
        {Object.entries(nfcDatas).map(([key, data]) => (
          <Group justify="start" key={key}>
            <Text fw="bold" size="sm">
              {key} :
            </Text>
            <Code>
              <Text size="sm">{data}</Text>
            </Code>
          </Group>
        ))}
      </Stack>
    </Paper>
  );
}
