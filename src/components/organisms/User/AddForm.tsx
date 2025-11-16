import { useEffect } from 'react';
import { IconLock } from '@tabler/icons-react';
import { Button, Group, Modal, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import GenderSelection from '@/components/atoms/GenderSelection';
import InstitutionCodeSelection from '@/components/atoms/InstitutionCodeSelection';
import ReligionSelection from '@/components/atoms/ReligionSelection';
import RoleInputSelection from '@/components/atoms/RoleInputSelection';
import { useUserStore } from '@/store/user';

interface Props {
  open: boolean;
  close: () => void;
  isEdit?: boolean;
  data?: User;
}

export default function AddForm({ open, close, isEdit = false, data }: Props) {
  const [loading, setLoading] = useDisclosure(false);
  const { createNewUser, updateUser } = useUserStore();

  const initialValues = {
    username: data?.username || '',
    email: data?.email || '',
    fullname: data?.fullname || '',
    shortname: data?.shortname || '',
    role_id: data?.role_id || '',
    institution_id: data?.institution_id || '',
    address: data?.address || '',
    phone_number: data?.phone_number || '',
    gender: data?.gender || '',
    religion: data?.religion || '',
    ...(isEdit ? {} : { password: '', confirmPassword: '' }), // Only add these fields for new user creation
  };

  const validate = {
    username: (value: string) => (value.length < 4 ? 'Invalid NIP' : null),
    email: (value: string) =>
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)
        ? null
        : 'Please enter a valid email address',
    ...(!isEdit && {
      password: (value: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
          ? null
          : 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',
      confirmPassword: (value: string, values: typeof initialValues) =>
        value !== values.password ? 'Passwords do not match' : null,
    }),
    phone_number: (value: string) =>
      /^\d{5,13}$/.test(value) ? null : 'Please enter a valid phone number',
  };

  const form = useForm<RequestNewUser | RequestEditUser>({
    name: 'CreateUserForm',
    mode: 'uncontrolled',
    initialValues,
    validate,
  });

  const handleSubmit = async (values: RequestNewUser | RequestEditUser) => {
    setLoading.open();
    try {
      isEdit ? await updateUser(values) : await createNewUser(values as RequestNewUser);
    } finally {
      setLoading.close();
      form.reset();
      close();
    }
  };

  useEffect(() => {
    if (isEdit) {
      form.setValues(data as RequestEditUser);
    }
    return () => {
      form.reset();
    };
  }, [open]);

  return (
    <Modal
      opened={open}
      onClose={close}
      title={<Title order={2}>{isEdit ? 'Edit User' : 'Add New User'}</Title>}
      centered
      closeOnClickOutside={false}
      size="xl"
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack my="md">
          <Group grow align="flex-start">
            <TextInput withAsterisk required label="NIP" {...form.getInputProps('username')} />
            <TextInput withAsterisk required label="Email" {...form.getInputProps('email')} />
          </Group>
          {!isEdit && (
            <Group grow align="flex-start">
              <PasswordInput
                leftSection={<IconLock size={20} />}
                withAsterisk
                required
                label="Password"
                {...form.getInputProps('password')}
                hidden={isEdit}
              />
              <PasswordInput
                leftSection={<IconLock size={20} />}
                withAsterisk
                required
                label="Confirm Password"
                {...form.getInputProps('confirmPassword')}
                hidden={isEdit}
              />
            </Group>
          )}

          <Group grow align="flex-start">
            <TextInput
              withAsterisk
              required
              label="Full Name"
              {...form.getInputProps('fullname')}
            />
            <TextInput
              withAsterisk
              required
              label="Short Name"
              {...form.getInputProps('shortname')}
            />
          </Group>
          <Group grow align="flex-start">
            <RoleInputSelection
              withAsterisk
              required
              label="Role"
              name="role_id"
              placeholder="Select Role"
              {...form.getInputProps('role_id')}
              form={form.getInputProps('role_id').defaultValue}
              defaultValue={data?.role_id}
            />
            <InstitutionCodeSelection
              withAsterisk
              required
              label="Institution"
              placeholder="Select Institution"
              name="institution_id"
              {...form.getInputProps('institution_id')}
              defaultValue={data?.institution_id}
              form={form.getInputProps('institution_id').defaultValue}
            />
          </Group>
          <Group grow align="flex-start">
            <TextInput withAsterisk required label="Address" {...form.getInputProps('address')} />
            <TextInput
              withAsterisk
              required
              label="Phone Number"
              {...form.getInputProps('phone_number')}
            />
          </Group>
          <Group grow align="flex-start">
            <GenderSelection
              withAsterisk
              required
              label="Gender"
              name="gender"
              placeholder="Select Gender"
              form={form}
              defaultValue={data?.gender}
              {...form.getInputProps('gender')}
            />
            <ReligionSelection
              withAsterisk
              required
              label="Religion"
              name="religion"
              placeholder="Select Religion"
              form={form}
              defaultValue={data?.religion}
              {...form.getInputProps('religion')}
            />
          </Group>
        </Stack>

        <Button fullWidth type="submit" mt="xl" loading={loading} loaderProps={{ type: 'dots' }}>
          {isEdit ? 'Update User' : 'Create User'}
        </Button>
      </form>
    </Modal>
  );
}
