import { ReactNode } from 'react';

import { BuguerMenuProvider } from './buguerMenu';
import { AuthProvider } from './auth';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <AuthProvider>
    <BuguerMenuProvider>
      {children}
    </BuguerMenuProvider>
  </AuthProvider>
);

export default AppProvider;