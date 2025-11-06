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
    <Grid m={0} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid.Col visibleFrom="sm" span={{ base: 12, sm: 4 }} p={0}>
        <ImageContainer
          src={image}
          fit="cover"
          h='100vh'
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 8 }} p={0} style={{ 
        display: 'flex', 
        justifyContent: 'center',
        padding: '0 10%',
        height: '100vh',
        alignItems: 'center'
      }}>
        <LoginOrganism />
      </Grid.Col>
    </Grid>
  );
}
