import { useEffect, useState } from 'react';
import { Grid } from '@mantine/core';
import { getRandomImage } from '@/api/login';
import LoginOrganism from '@/components/organisms/Login';
import ImageContainer from '@/components/atoms/ImageContainer';

export default function Login() {
  const [image, setImage] = useState<string>('');

  const getImage = async () => {
    const res: string = await getRandomImage();
    if (res) {
      setImage(res);
    }
  };
  useEffect(() => {
    getImage();
  }, []);

  return (
    <Grid>
      <Grid.Col span={4} p={0}>
        <ImageContainer
          src={image}
          fit="cover"
          h='99vh'
        />
      </Grid.Col>
      <Grid.Col span={8} p={0}>
        <LoginOrganism />
      </Grid.Col>
    </Grid>
  );
}
