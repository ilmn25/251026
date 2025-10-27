import React from 'react';
import Style from './Style.tsx';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { BACKEND_URL } from './App.tsx';

export default function AboutScreen( { navigation } : { navigation: any } ){
  return (
    <View style={Style.container}>

      <Text style={Style.title}>
        illu's File Hosting and Transfer System
      </Text>
      <View style={{ height: 15 }} />
      <Text style={Style.paragraph}>
        A Full Stack File Hosting Software made with React Native, TypeScript, etc.
      </Text>
      <View style={{ height: 20 }} />
      <Text style={Style.paragraph}>
        Backend URL: {BACKEND_URL}
      </Text>

      <TouchableOpacity style={Style.button} onPress={() => Linking.openURL('https://github.com/ilmn25/251026')}>
        <Text style={Style.buttonText}>Github</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />

      <Image
        source={{ uri: 'https://cdn.discordapp.com/attachments/643815263648612359/1431928546065907802/run-chase-ezgif.com-effects.gif?ex=68ff32e1&is=68fde161&hm=8333980cad38e052f8bb4671812aff83d33f351d0e41ceed5af0c49eb351e4fe&' }}
        style={{ width: 200, height: 200 }}
      />

    </View>
  );
};