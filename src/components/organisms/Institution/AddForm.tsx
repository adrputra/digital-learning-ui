import { Button, Modal, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useInstitutionStore } from '@/store/institution';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  close: () => void;
  isEdit?: boolean;
  data?: Institution;
}

export default function AddForm({ open, close, isEdit = false, data }: Props) {
  const [loading, setLoading] = useDisclosure(false);
  const { addInstitution, updateInstitution } = useInstitutionStore();
  const form = useForm<RequestNewInstitution | RequestEditInstitution>({
    name: 'CreateNewInstitution',
    mode: 'uncontrolled',
    initialValues: {
      id: data?.id || '',
      name: data?.name || '',
      address: data?.address || '',
      phone_number: data?.phone_number || '',
      email: data?.email || '',
    },
    validate: {
      phone_number: (value) =>
        /^\d{5,13}$/.test(value) ? null : 'Please enter a valid phone number',
      email: (value) =>
        /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : 'Please enter a valid email address',
    },
  });

  useEffect(() => {
    if (isEdit) {
      form.setValues(data as RequestEditInstitution);
    }
    return () => {
      form.reset();
    };
  }, [open]);

  const handleSubmit = async (request: RequestNewInstitution | RequestEditInstitution) => {
    setLoading.open();

    try {
      isEdit ? await updateInstitution(request as RequestEditInstitution) : await addInstitution(request);
    } finally {
      setLoading.close();
      form.reset();
      close();
    }
  };

  return (
    <Modal
      opened={open}
      onClose={close}
      title={<Title order={2}>{isEdit ? 'Edit Institution' : 'Add New Institution'}</Title>}
      centered
      closeOnClickOutside={false}
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack my="md">
          <TextInput
            withAsterisk
            required
            label="Name"
            name="name"
            value={form.getValues().name}
            onChange={(e) => form.setFieldValue('name', e.target.value)}
          />
          <Textarea
            withAsterisk
            required
            label="Address"
            name="address"
            value={form.getValues().address}
            onChange={(e) => form.setFieldValue('address', e.target.value)}
          />
          <TextInput
            withAsterisk
            required
            label="Phone Number"
            name="phone_number"
            value={form.getValues().phone_number}
            onChange={(e) => form.setFieldValue('phone_number', e.target.value)}
          />
          <TextInput
            withAsterisk
            required
            label="Email"
            name="email"
            value={form.getValues().email}
            onChange={(e) => form.setFieldValue('email', e.target.value)}
          />
        </Stack>

        <Button fullWidth type="submit" mt="xl" loading={loading} loaderProps={{ type: 'dots' }}>
          {isEdit ? 'Edit' : 'Create'}
        </Button>
      </form>
    </Modal>
  );
}
