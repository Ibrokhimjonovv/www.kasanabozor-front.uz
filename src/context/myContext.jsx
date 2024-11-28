// src/MyContext.js
import React, { createContext, useState } from 'react';

// Context yaratish
export const MyContext = createContext(null);

// Provider komponenti
export const MyContextProvider = ({ children }) => {
    const [value, setValue] = useState("Hello, World!");

    return (
        <MyContext.Provider value={{ value, setValue }}>
            {children}
        </MyContext.Provider>
    );
};
