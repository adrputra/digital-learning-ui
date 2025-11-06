import { Center, Paper, Stack } from '@mantine/core';
import LoginFormMolecule from '@/components/molecules/Login/LoginForm';
import LoginHeaderMolecule from '@/components/molecules/Login/LoginHeader';

export default function LoginOrganism() {
  return (
    <Center h="100%" w={{ base: '90%', sm: '80%', md: '70%' }}>
      <Paper shadow="xl" radius="md" withBorder p="xl" w="100%">
        <Stack gap="xl">
          <LoginHeaderMolecule />
          <LoginFormMolecule />
        </Stack>
      </Paper>
    </Center>
  );
}
