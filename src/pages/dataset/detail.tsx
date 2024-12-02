import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Image, Paper, SimpleGrid, Text } from '@mantine/core';
import { getDatasetsByUsername } from '@/api/dataset';

export default function DatasetDetail() {
  const [data, setData] = useState<string[]>([]);
  const username = useLocation().pathname.split('/')[useLocation().pathname.split('/').length - 1];
  const institutionID =
    useLocation().pathname.split('/')[useLocation().pathname.split('/').length - 2];

  const fetchData = async () => {
    await getDatasetsByUsername(institutionID, username).then((res) => {
      if (res.code === 200) {
        setData(res.data);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Paper p="md" shadow="xl">
      <Text size="xl" fw="bold">
        Datasets {username}
      </Text>
      <SimpleGrid my='md' cols={20}>
        {data.map((image) => (
          <Image src={image} key={image} radius="sm" />
        ))}
      </SimpleGrid>
    </Paper>
  );
}
