import { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const ContextProvider = ({ children }) => {
    const [transactionsData, setTransactionsData] = useState([]);

    const providerValue = {
        transactionsData,
        setTransactionsData,
    };

    return (
        <GlobalContext.Provider value={providerValue}>
            {children}
        </GlobalContext.Provider>
    );
};