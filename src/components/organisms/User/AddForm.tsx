import { IconLock } from '@tabler/icons-react';
import { Button, Group, Modal, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { createNewUser } from '@/api/user';
import RoleInputSelection from '@/components/atoms/RoleInputSelection';
import { useAuthStore } from '@/store/auth';

interface Props {
  open: boolean;
  close: () => void;
}

export default function AddForm({ open, close }: Props) {
  const { institutionID } = useAuthStore();
  const [loading, setLoading] = useDisclosure(false);

  const form = useForm<RequestNewUser>({
    name: 'CreateUserForm',
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      fullname: '',
      shortname: '',
      role_id: '',
      institution_id: institutionID,
    },
    validate: {
      username: (value) => (value.length < 4 ? 'Invalid Username or Email' : null),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
          ? null
          : 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
      email: (value) =>
        /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : 'Please enter a valid email address',
    },
  });

  const handleSubmit = async (values: RequestNewUser) => {
    setLoading.open();
    await createNewUser(values).finally(() => {
      setLoading.close();
      form.reset();
      close();
    });
  };

  return (
    <Modal
      opened={open}
      onClose={close}
      title="Create User"
      centered
      closeOnClickOutside={false}
      size="xl"
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack my="md">
          <Group grow align="flex-start">
            <TextInput withAsterisk required label="Username" {...form.getInputProps('username')} />
            <TextInput withAsterisk required label="Email" {...form.getInputProps('email')} />
          </Group>
          <Group grow align="flex-start">
            <PasswordInput
              leftSection={<IconLock size={20} />}
              withAsterisk
              required
              label="Password"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              leftSection={<IconLock size={20} />}
              withAsterisk
              required
              label="Confirm Password"
              {...form.getInputProps('confirmPassword')}
            />
          </Group>
          <Group grow align="flex-start">
            <TextInput withAsterisk required label="Fullname" {...form.getInputProps('fullname')} />
            <TextInput
              withAsterisk
              required
              label="Shortname"
              {...form.getInputProps('shortname')}
            />
          </Group>
          <Group grow align="flex-start">
            <RoleInputSelection
              withAsterisk
              required
              label="Role"
              placeholder="Select Role"
              {...form.getInputProps('role_id')}
            />
            <TextInput
              withAsterisk
              required
              label="Institution ID"
              value={institutionID}
              disabled
            />
          </Group>
        </Stack>

        <Button fullWidth type="submit" mt="xl" loading={loading} loaderProps={{ type: 'dots' }}>
          Create
        </Button>
      </form>
    </Modal>
  );
}
