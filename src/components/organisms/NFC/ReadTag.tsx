import { useState } from 'react';
import { Button, Paper, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NFCBlockNumber from '@/components/atoms/NFCBlockNumber';
import ScanTagModal from '@/components/molecules/NFC/ScanTagModal';
import { useNFCStore } from '@/store/nfc';

export default function ReadTag() {
  const [value, setValue] = useState<string[]>([]);
  const [loading, setLoading] = useDisclosure(false);
  const { scanNFC, nfcDeviceLastConnection } = useNFCStore();

  const handleScan = async () => {
    setLoading.open();
    await scanNFC(value).finally(() => {
      setLoading.close();
    });
  };
  return (
    <Paper p="md" shadow="xl">
      <Text size="xl" fw="bold">
        Read NFC Tag
      </Text>
      <Stack mt="md" justify="space-between">
        <NFCBlockNumber value={value} setValue={setValue} multiple />
        <Button
          m={0}
          w="100%"
          onClick={handleScan}
          disabled={Date.now() - new Date(nfcDeviceLastConnection).getTime() > 3600 * 1000}
        >
          Scan
        </Button>
      </Stack>
      <ScanTagModal open={loading} close={setLoading.close} />
    </Paper>
  );
}
