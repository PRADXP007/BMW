import React from 'react';
import RootLayout from './app/layout';
import MasterPage from './app/page';

export const App: React.FC = () => {
  return (
    <RootLayout>
      <MasterPage />
    </RootLayout>
  );
};

export default App;
