import { useEffect, useState } from 'react';
import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { createNewMenu, updateMenu } from '@/api/menu';
import { useRoleStore } from '@/store/role';

interface Props {
  open: boolean;
  close: () => void;
  isEdit?: boolean;
  data?: Menu;
}

export default function AddForm({ open, close, isEdit = false, data }: Props) {
  const [loading, setLoading] = useDisclosure(false);

  const { getMenuList } = useRoleStore();

  const [request, setRequest] = useState<RequestNewMenu>({
    id: '',
    menu_name: '',
    menu_route: '',
  });

  useEffect(() => {
    if (isEdit) {
      setRequest({
        id: data!.id,
        menu_name: data!.menu_name,
        menu_route: data!.menu_route,
      });
    }
    return () => {
      setRequest({
        id: '',
        menu_name: '',
        menu_route: '',
      });
    };
  }, [data, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const regex = /^[a-zA-Z0-9-]*$/;

    if (name === 'menu_route') {
      if (regex.test(value)) {
        setRequest({ ...request, [name]: value });
      }
    } else {
      setRequest({ ...request, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = { ...request, menu_route: `/${request.menu_route}` };
    setLoading.open();
    try {
      const res = isEdit ? await updateMenu(payload) : await createNewMenu(payload);
      if (res.code === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: res.message,
        });
        await getMenuList();
        close();
      }
    } catch (err: any) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: err?.response?.data?.message || err?.response?.data || err?.message,
      });
    } finally {
      setLoading.close();
    }
  };

  return (
    <Modal
      opened={open}
      onClose={close}
      title={isEdit ? 'Edit Menu' : 'Create New Menu'}
      centered
      closeOnClickOutside={false}
    >
      <form onSubmit={handleSubmit}>
        <Stack my="md">
          <TextInput
            label="Menu Name"
            placeholder="Menu Name"
            required
            withAsterisk
            name="menu_name"
            value={request.menu_name}
            onChange={handleChange}
          />
          <TextInput
            label="Menu Route"
            placeholder="Menu Route"
            required
            withAsterisk
            leftSection="/"
            name="menu_route"
            value={request.menu_route.replace('/', '')}
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
