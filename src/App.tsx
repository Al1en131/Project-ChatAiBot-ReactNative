// src/App.tsx
import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { UserProvider } from './context/UserContext'; // Import UserProvider

const App: React.FC = () => {
  return (
    <UserProvider> {/* Wrap your app with UserProvider */}
      <AppNavigator />
    </UserProvider>
  );
};

export default App;
