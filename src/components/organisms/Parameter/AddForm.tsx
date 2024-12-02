import { useEffect, useState } from 'react';
import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useParameterStore } from '@/store/parameter';

interface Props {
  open: boolean;
  close: () => void;
  isEdit?: boolean;
  data?: RequestNewParameter;
}

export default function AddForm({ open, close, isEdit = false, data }: Props) {
  const [loading, setLoading] = useDisclosure(false);
  const { createParameter, updateParameter, getParameterList } = useParameterStore();
  const [request, setRequest] = useState<RequestNewParameter>({
    key: '',
    value: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading.open();
    try {
      isEdit ? await updateParameter(request) : await createParameter(request);
      await getParameterList();
      close();
    } finally {
      setLoading.close();
    }
  };

  useEffect(() => {
    if (isEdit) {
      setRequest({
        key: data!.key,
        value: data!.value,
        description: data!.description,
      });
    }
    return () => {
      setRequest({
        key: '',
        value: '',
        description: '',
      });
    };
  }, [data, isEdit]);

  return (
    <Modal
      opened={open}
      onClose={close}
      title={isEdit ? 'Edit Parameter' : 'Create New Parameter'}
      centered
      closeOnClickOutside={false}
    >
      <form onSubmit={handleSubmit}>
        <Stack my="md">
          <TextInput
            label="Key"
            placeholder="Key"
            required
            withAsterisk
            name="key"
            disabled={isEdit}
            value={request.key}
            onChange={handleChange}
          />
          <TextInput
            label="Value"
            placeholder="Value"
            required
            withAsterisk
            name="value"
            value={request.value}
            onChange={handleChange}
          />
          <TextInput
            label="Description"
            placeholder="Description"
            name="description"
            value={request.description}
            onChange={handleChange}
          />
        </Stack>

        <Button fullWidth type="submit" mt="sm" loading={loading} loaderProps={{ type: 'dots' }}>
          {isEdit ? 'Edit' : 'Create'}
        </Button>
      </form>
    </Modal>
  );
}
