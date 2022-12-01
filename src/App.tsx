// Apllication entry point
import React, { useState } from 'react';
import Content from './components/layout/Content';
import Header from './components/layout/Header';

// get providers
import { ProjectsProvider, SelectedProjectProvider } from './context';

type Prop = {
  darkModeDefault?: boolean;
};

export const App = ({ darkModeDefault = false }: Prop) => {
  // components state
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main
          data-testid="application"
          className={darkMode ? 'darkmode' : undefined}
        >
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};
