import { Stack, Title, Text } from '@mantine/core';

export default function LoginHeaderMolecule() {
  return (
    <Stack gap={0}>
      <Title order={1}>Welcome!</Title>
      <Text fs='italic' size='sm'>Sorry, I have bad memory. Can you tell me who are you again?</Text>
    </Stack>
  );
}
