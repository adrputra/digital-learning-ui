import { useState } from 'react';
import { Button, FileInput, FileInputProps, Paper, Pill, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import UserInputSelection from '@/components/atoms/UserInputSelection';
import { useDatasetStore } from '@/store/dataset';

export default function UploadDataset() {
  const [files, setFiles] = useState<File[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const { uploadDataset } = useDatasetStore();

  const FileComponent: FileInputProps['valueComponent'] = ({ value }) => {
    if (value === null) {
      return null;
    }

    if (Array.isArray(value)) {
      return (
        <Pill.Group>
          {value.map((file, index) => (
            <Pill key={index} withRemoveButton onRemove={() => onRemoveDataset(file.name)} w={100}>
              <Text truncate="start" size="xs">
                {file.name}
              </Text>
            </Pill>
          ))}
        </Pill.Group>
      );
    }

    return <Pill withRemoveButton>{value.name}</Pill>;
  };

  const onRemoveDataset = (name: string) => {
    setFiles(files.filter((file) => file.name !== name));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const req = new FormData();
    req.append('username', username ?? '');

    if (files.length === 0) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Please upload dataset file',
      });
      return;
    }

    files.forEach((file) => {
      req.append('file', file);
    });

    uploadDataset(req).finally(() => {
      setFiles([]);
      setUsername(null);
    });
  };

  return (
    <Paper p="md" shadow="xl">
      <Text size="xl" fw="bold">
        Upload Dataset
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack mt="md" gap="md">
          {/* <TextInput
            label="Username"
            placeholder="Input Username"
            
            withAsterisk
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> */}
          <UserInputSelection
            withAsterisk
            required
            label="Username"
            value={username}
            onChange={(_, option) => setUsername(option.value)}
            nothingFoundMessage="User not found"
          />
          <FileInput
            label="Dataset File"
            placeholder="Input dataset"
            description="File Format: PNG, JPEG"
            withAsterisk
            required
            multiple
            accept="image/png,image/jpeg"
            value={files}
            onChange={(newFiles) => setFiles((prevFiles) => [...(prevFiles || []), ...newFiles])}
            valueComponent={FileComponent}
          />
        </Stack>
        <Button mt="md" fullWidth type="submit">
          Upload
        </Button>
      </form>
    </Paper>
  );
}
