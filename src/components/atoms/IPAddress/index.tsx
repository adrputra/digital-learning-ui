import { useState } from 'react';
import { TextInput } from '@mantine/core';

function IPAddressInput() {
  const [ip, setIp] = useState('');
  const [error, setError] = useState('');

  const validateIP = (value: string) => {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)$/;
    if (!ipRegex.test(value)) {
      setError('Invalid IP address format');
    } else {
      setError('');
    }
  };

  return (
    <TextInput
      label="IP Address"
      placeholder="192.168.1.1"
      value={ip}
      required
      withAsterisk
      onChange={(event) => {
        setIp(event.currentTarget.value);
        validateIP(event.currentTarget.value);
      }}
      error={error}
    />
  );
}

export default IPAddressInput;
