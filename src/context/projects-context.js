/* ======= A way to pass data down the application's
    component tree without using props. ====== */

import React, { createContext, useContext } from 'react';

// Bring in project hook
import { useProjects } from '../hooks';

export const ProjectsContext = createContext();

// create provider
export const ProjectsProvider = ({children}) => {
    const { projects, setProjects } = useProjects();

    return (
        <ProjectsContext.Provider value={{projects, setProjects }}>
            {children}
        </ProjectsContext.Provider>
    )
}

// provide value to children components
export const useProjectsValue = () => useContext(ProjectsContext);