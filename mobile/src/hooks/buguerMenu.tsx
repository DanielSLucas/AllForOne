import { createContext, ReactNode, useContext, useState } from "react";

interface BuguerMenuContextData {
  isOpen: boolean;
  toggleMenu: () => void;
}

const BuguerMenuContext = createContext<BuguerMenuContextData>(
  {} as BuguerMenuContextData
);

interface BuguerMenuProviderProps {
  children: ReactNode;
}

export const BuguerMenuProvider: React.FC<BuguerMenuProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  function toggleMenu() {
    setIsOpen(state => !state);
  }

  return(
    <BuguerMenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </BuguerMenuContext.Provider>
  )
}

export function useBuguerMenu(): BuguerMenuContextData {
  const context = useContext(BuguerMenuContext);

  if (!context) {
    throw new Error('useBuguerMenu must be used within an BuguerMenuProvider');
  }

  return context;
}