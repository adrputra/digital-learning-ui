import { useState } from 'react';
import { Button, Paper, Stack, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NFCBlockNumber from '@/components/atoms/NFCBlockNumber';
import ScanTagModal from '@/components/molecules/NFC/ScanTagModal';
import { useNFCStore } from '@/store/nfc';

export default function WriteTag() {
  const [blockNumber, setBlockNumber] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useDisclosure(false);
  const { writeNFC, nfcDeviceLastConnection } = useNFCStore();
  
  const isButtonDisabled = Date.now() - new Date(nfcDeviceLastConnection).getTime() > 3600 * 1000

  const handleWrite = async () => {
    setLoading.open();
    await writeNFC(blockNumber[0], value).finally(() => {
      setLoading.close();
    });
  };
  return (
    <Paper p="md" shadow="xl">
      <Text size="xl" fw="bold">
        Write NFC Tag Block
      </Text>
      <Stack mt="md" gap="md" h="80%">
        <NFCBlockNumber value={blockNumber} setValue={setBlockNumber} />
        <TextInput
          placeholder="Enter value to write"
          label="Value"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <Button onClick={handleWrite} disabled={isButtonDisabled}>Write</Button>
      </Stack>
      {loading && <ScanTagModal open={loading} close={setLoading.close} />}
    </Paper>
  );
}
