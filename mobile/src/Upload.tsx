import React from 'react';
import { Alert, TouchableOpacity, Text } from 'react-native';
import { pick } from '@react-native-documents/picker';

import Style from './Style.tsx';
import { BACKEND_URL } from './App.tsx';

export default function FileUploadButton({ onFilePicked } : {onFilePicked: (uri: string) => void}) {
  const handleFileUpload = async () => {
    const [file] = await pick({ mode: 'import' });
    onFilePicked(file.uri);
    handleFilePicked(file);
  };
  const handleFilePicked = async (file: any) => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name || `upload_${Date.now()}`, // fallback name
      type: file.type || 'application/octet-stream' // fallback type
    });

    try {
      const res = await fetch(`${BACKEND_URL}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await res.json();
      Alert.alert('File Uploaded', `Name: ${file.name}\nType: ${file.type}`);
    } catch (err) {
      console.error('Upload failed:', err);
      Alert.alert('Upload Failed', 'Could not upload file.');
    }
  };

  return (
    <TouchableOpacity style={Style.button} onPress={handleFileUpload}>
      <Text style={Style.buttonText}>Upload</Text>
    </TouchableOpacity>
  );
}
