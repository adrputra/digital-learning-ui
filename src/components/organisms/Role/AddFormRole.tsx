import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useRoleStore } from '@/store/role';

interface Props {
  open: boolean;
  close: () => void;
  isEdit?: boolean;
  data?: Role;
}

export default function AddFormRole({ open, close }: Props) {
  const [loading, setLoading] = useDisclosure(false);
  const { addNewRole } = useRoleStore();
  const form = useForm<RequestNewRole>({
    name: 'CreateNewInstitution',
    mode: 'uncontrolled',
    initialValues: {
      role_name: '',
      role_desc: '',
    },
  });

  const handleSubmit = async (request: RequestNewRole) => {
    setLoading.open();
    await addNewRole(request).finally(() => {
      setLoading.close();
      form.reset();
      close();
    });
  };

  return (
    <Modal opened={open} onClose={close} title="Add New Role" centered closeOnClickOutside={false}>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack my="md">
          <TextInput withAsterisk required label="Role Name" {...form.getInputProps('role_name')} />
          <TextInput
            withAsterisk
            required
            label="Role Description"
            {...form.getInputProps('role_desc')}
          />
        </Stack>

        <Button fullWidth type="submit" mt="xl" loading={loading} loaderProps={{ type: 'dots' }}>
          Create
        </Button>
      </form>
    </Modal>
  );
}
