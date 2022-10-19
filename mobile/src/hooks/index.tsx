import { ReactNode } from 'react';

import { BuguerMenuProvider } from './buguerMenu';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <BuguerMenuProvider>
    {children}
  </BuguerMenuProvider>
);

export default AppProvider;