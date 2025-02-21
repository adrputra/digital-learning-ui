import { UserProfileHeader, UserProfileInfo } from '@/components/template/UserProfile';
import { Center, Stack } from '@mantine/core';

export default function UserProfile() {
  return (
    <Center>
      <Stack p="sm" w="100%">
        <UserProfileHeader />
        <UserProfileInfo />
      </Stack>
    </Center>
  );
}
