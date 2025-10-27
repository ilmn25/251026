import React, { useState } from 'react';
import Style from './Style.tsx';
import { View, Text, TouchableOpacity } from 'react-native';
import Upload from './Upload.tsx';
import Image from './DynamicImage.tsx';

export default function HomeScreen( { navigation } : { navigation: any }) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  return (
    <View style={Style.container}>

      <Text style={Style.title}>
        illu's File Hosting and Transfer System
      </Text>

      <View style={{ height: 50 }} />

      <TouchableOpacity style={Style.button} onPress={() => {navigation.navigate('About')}}>
        <Text style={Style.buttonText}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Style.button} onPress={() => {navigation.navigate('Download')}}>
        <Text style={Style.buttonText}>Download</Text>
      </TouchableOpacity>

      <Upload onFilePicked={ (uri) => {setImageUri(uri)}}/>

      <View style={{ height: 20 }} />
      <Image uri={imageUri} />

    </View>
  );
};
