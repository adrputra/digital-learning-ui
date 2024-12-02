import { useEffect, useRef, useState } from 'react';
import { Player } from '@lordicon/react';
import config from '@root/config.json';
import { Center, Group, Loader, Paper, Stack, Text } from '@mantine/core';
import { useDisclosure, useHover } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { trainModel } from '@/api/dataset';
import ICON from '@/assets/icon/fingerprint.json';
import InstitutionCodeSelection from '@/components/atoms/InstitutionCodeSelection';
import { useDatasetStore } from '@/store/dataset';
import { useParameterStore } from '@/store/parameter';
import { useThemeStore } from '@/store/theme';

export default function TrainModel() {
  const playerRef = useRef<Player>(null);
  const { hovered, ref } = useHover();
  const [lastTrainLoading, setLastTrainLoading] = useDisclosure(false);
  const [loading, setLoading] = useDisclosure(false);
  const [selectedInstitution, setSelectedInstitution] = useState<string>('');

  const { lastTrainModel, getLastTrainModel } = useDatasetStore();
  const { trainModelInterval, getTrainModelInterval } = useParameterStore();
  const { colors } = useThemeStore();


  const handleClick = () => {
    setLoading.open();
    playerRef.current?.playFromBeginning();

    if (!selectedInstitution) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Please select an institution',
      });
      setLoading.close();
      return;
    }

    if (new Date(lastTrainModel).getTime() + Number(trainModelInterval) * 60 * 1000 < Date.now()) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Model have just trained. Please wait for a moment',
      });
      setLoading.close();
      return;
    }

    trainModel(selectedInstitution)
      .then((res) => {
        if (res.code === 200) {
          showNotification({ color: 'green', title: 'Success', message: 'Model has been trained' });
        }
      })
      .finally(() => setLoading.close());
  };

  useEffect(() => {
    if (selectedInstitution) {
      setLastTrainLoading.open();
      getTrainModelInterval(config.train_model_key);
      getLastTrainModel(selectedInstitution).finally(() => setLastTrainLoading.close());
    }
  }, [selectedInstitution]);

  return (
    <Paper p="md" shadow="xl">
      <Text size="xl" fw="bold">
        Train Model
      </Text>
      <Stack mt="md" gap="md">
        <InstitutionCodeSelection
          label="Institution ID"
          withAsterisk
          onChange={(_, option) => setSelectedInstitution(option?.value)}
        />
        <Group>
          <Text size="sm" fw="bold">
            Last Model Training :
          </Text>
          {lastTrainLoading ? (
            <Loader color="blue" />
          ) : (
            <Text size="sm" fw="bold">
              {lastTrainModel || '-'}
            </Text>
          )}
        </Group>
      </Stack>
      <Center>
        <Group
          mt="xl"
          justify="center"
          ref={ref}
          w="50%"
          onClick={() => handleClick()}
          style={{
            cursor: 'pointer',
            backgroundColor: hovered ? colors[9] : 'transparent',
            borderRadius: 8,
          }}
        >
          <Text size="xl" fw="bold">
            Train Now
          </Text>
          <Player
            ref={playerRef}
            icon={ICON}
            size={100}
            onComplete={() => loading && playerRef.current?.playFromBeginning()}
          />
        </Group>
      </Center>
    </Paper>
  );
}
