import { Image } from 'react-native';

export default function DynamicImage({ uri }: any ) {
  return (
    <Image
      source={{ uri }}
      style={{ width: 200, height: 200 }}
    />
  );
}
