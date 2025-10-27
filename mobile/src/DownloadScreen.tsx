import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import Style from './Style';
import { BACKEND_URL } from './App';

export default function DownloadScreen() {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/download`)
      .then(res => res.json())
      .then(data => setFiles(data.files || []))
      .catch(err => {
        console.error('Failed to fetch file list!');
      });
  }, []);

  const handleDownload = (fileName: string) => {
    const url = `${BACKEND_URL}/download?file=${encodeURIComponent(fileName)}`;
    Linking.openURL(url);
  };

  return (
    <View style={Style.container}>
      <Text style={Style.title}>Downloads List</Text>
      <View style={{ height: 20 }} />

      {files.map(file => (
        <TouchableOpacity key={file} style={Style.button} onPress={() => handleDownload(file)}>
          <Text style={Style.buttonText}>{file}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
