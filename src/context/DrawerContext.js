import React, {useState, createContext} from 'react';

export const DrawerContext = createContext();

export const LoaderContextProvider = ({children}) => {
    const [open, setOpen] = useState(true);
    return (
        <DrawerContext.Provider value={[open, setOpen]}>
            {children}
        </DrawerContext.Provider>
    )
}
