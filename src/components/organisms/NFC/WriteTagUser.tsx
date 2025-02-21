import { Button, Paper, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import UserInputSelection from '@/components/atoms/UserInputSelection';
import ScanTagModal from '@/components/molecules/NFC/ScanTagModal';
import { useNFCStore } from '@/store/nfc';

export default function WriteTagUser() {
  const [loading, setLoading] = useDisclosure(false);
  const { nfcDeviceLastConnection } = useNFCStore();

  const isButtonDisabled = Date.now() - new Date(nfcDeviceLastConnection).getTime() > 3600 * 1000
  const handleWrite = () => {
  }
  
  return (
    <Paper p="md" shadow="xl">
      <Text size="xl" fw="bold">
        Write NFC Tag User
      </Text>
      <Stack mt="md" gap="md" h="80%" justify='space-between'>
        <UserInputSelection
          withAsterisk
          required
          label="Username"
          nothingFoundMessage="User not found"
        />
          <Button disabled={isButtonDisabled} onClick={handleWrite}>
            Write
          </Button>
      </Stack>
      {loading && <ScanTagModal open={loading} close={setLoading.close} />}
    </Paper>
  );
}
