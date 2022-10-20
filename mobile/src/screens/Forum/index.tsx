import React from 'react';
import WebView from 'react-native-webview';
import { BuguerMenu } from '../../components/BuguerMenu';

export function Forum() {
  return (  
    <>
      <BuguerMenu />
      <WebView 
        style={{ flex: 1 }}
        source={{ uri: "http://allforone.epizy.com/"}}
      />    
    </> 
  );
}