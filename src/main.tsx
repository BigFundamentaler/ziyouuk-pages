import React from 'react';
import { XProvider } from '@ant-design/x';
import App from './App';

const Main: React.FC = () => (
  <XProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
    <App />
  </XProvider>
);

export default Main;