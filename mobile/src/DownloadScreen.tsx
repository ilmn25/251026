import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Style from './Style';
import { BACKEND_URL } from './App';
import RNFS from 'react-native-fs';

export default function DownloadScreen() {
  const [files, setFiles] = useState<string[]>([]);
  const [progress, setProgress] = useState<string>();

  useEffect(() => {
    fetch(`${BACKEND_URL}/download`)
      .then(res => res.json())
      .then(data => setFiles(data.files || []))
      .catch(() => {
        console.error('Failed to fetch file list!');
      });
  }, []);

  const handleDownload = async (fileName: string) => {
    const url = `${BACKEND_URL}/download?file=${encodeURIComponent(fileName)}`;
    const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    const download = RNFS.downloadFile({
      fromUrl: url,
      toFile: path,
      progressDivider: 6,
      progress: ({ bytesWritten, contentLength }) => {
        const percent = Math.floor((bytesWritten / contentLength) * 100);
        setProgress(`Downloading ${fileName}: ${percent}%`);
      },
    });

    download.promise
      .then(res => res.statusCode === 200 && console.log('Saved to:', path))
      .catch(err => console.error('Download failed:', err));
  };

  return (
    <View style={Style.container}>
      <Text style={Style.title}>Downloads List</Text>
      <Text style={Style.paragraph}>{progress}</Text>
      <View style={{ height: 20 }} />

      {files.map(file => (
        <TouchableOpacity key={file} style={Style.button} onPress={() => handleDownload(file)}>
          <Text style={Style.buttonText}>{file}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
