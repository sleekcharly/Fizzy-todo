import React, { createContext, useContext, useState } from 'react';

export const SelectedProjectContext = createContext({});

export const SelectedProjectProvider = ({ children }: any) => {
  const [selectedProject, setSelectedProject] = useState('INBOX');

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProjectValue = (): any =>
  useContext(SelectedProjectContext);
