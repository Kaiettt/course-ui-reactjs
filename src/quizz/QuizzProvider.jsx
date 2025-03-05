import { useState, createContext } from "react";
export const QuizzContext = createContext();
export const QuizzProvider = ({ children }) => {
    const [isPreStart, setIsPreStart] = useState(true);
    return (
        <QuizzContext.Provider value={{ isPreStart, setIsPreStart }}>
            {children}
        </QuizzContext.Provider>
    );
};
