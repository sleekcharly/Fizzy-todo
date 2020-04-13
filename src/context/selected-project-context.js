/* ======= A way to pass data down the application's
    component tree without using props. ====== */

    import React, { createContext, useContext, useState } from 'react';
    
    export const SelectedProjectContext = createContext();
    
    // create provider
    export const SelectedProjectProvider = ({children}) => {
        const [ selectedProject, setSelectedProject ] = useState('TODAY');
    
        return (
            <SelectedProjectContext.Provider value={{selectedProject, setSelectedProject }}>
                {children}
            </SelectedProjectContext.Provider>
        )
    }
    
    // provide value to children components
    export const useSelectedProjectValue = () => useContext(SelectedProjectContext);