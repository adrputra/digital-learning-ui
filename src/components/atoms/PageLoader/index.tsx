import { Center, Loader } from '@mantine/core';

export default function PageLoader() {
  return (
    <Center h="100vh" w="100%">
      <Loader size="lg" type="ring" />
    </Center>
  );
}

