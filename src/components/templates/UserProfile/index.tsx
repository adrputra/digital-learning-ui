import { Paper, Tabs, Text } from '@mantine/core';
import {
  UserProfileHeaderImage,
  UserProfileHeaderInfo,
} from '@/components/organisms/User/UserProfile/Header';

export function UserProfileHeader() {
  return (
    <Paper p="sm" shadow="xl">
      <UserProfileHeaderImage />
      <UserProfileHeaderInfo />
    </Paper>
  );
}

export function UserProfileInfo() {
  return (
    <Paper p="sm" shadow="xl">
      <Tabs defaultValue="personal">
        <Tabs.List justify="center">
          <Tabs.Tab value="personal">Personal Information</Tabs.Tab>
          <Tabs.Tab value="summary">Summary</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="personal">
          <Text>Personal Information</Text>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
