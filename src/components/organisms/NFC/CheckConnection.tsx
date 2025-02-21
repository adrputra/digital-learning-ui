import { useState } from 'react';
import { Button, Grid, Paper, Stack, Text, TextInput } from '@mantine/core';
import { useNFCStore } from '@/store/nfc';

export default function CheckNFCConnection() {
  const [ip, setIp] = useState<string>('');
  const [errorIP, setErrorIP] = useState<string>('');
  const [port, setPort] = useState<string>('');
  const { nfcDeviceLastConnection, pingNFC } = useNFCStore();
  const validateIP = (value: string) => {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)$/;
    if (!ipRegex.test(value)) {
      setErrorIP('Invalid IP address format');
    } else {
      setErrorIP('');
    }
  };

  const handleConnect = () => {
    pingNFC(ip, port);
  };

  return (
    <Paper p="md" shadow="xl">
      <Text size="xl" fw="bold">
        NFC Device Connection
      </Text>
      <Stack mt="md" gap="md" h="80%" justify="space-between">
        <Stack>
          <Text size="sm" fw="bold">
            Last Connection :{' '}
            {new Date(nfcDeviceLastConnection).getTime() === 0 ? '-' : nfcDeviceLastConnection}
          </Text>
          <Grid grow gutter="xs">
            <Grid.Col span={8}>
              <TextInput
                label="IP Address"
                placeholder="Enter IP Address"
                name="ipAddress"
                value={ip}
                required
                withAsterisk
                onChange={(event) => {
                  setIp(event.currentTarget.value);
                  validateIP(event.currentTarget.value);
                }}
                error={errorIP}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                label="Port"
                placeholder="5000"
                name="port"
                value={port}
                required
                withAsterisk
                onChange={(event) => setPort(event.currentTarget.value)}
              />
            </Grid.Col>
          </Grid>
        </Stack>

        <Button onClick={handleConnect} disabled={!ip || !port}>
          Connect
        </Button>
      </Stack>
    </Paper>
  );
}
