import React from 'react';
import WebView from 'react-native-webview';

export function Forum() {
  return (    
    <WebView 
      style={{ flex: 1 }}
      source={{ uri: "http://allforone.epizy.com/"}}
    />    
  );
}