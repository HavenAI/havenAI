import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();
// wraps the children components with UserContext.Provider
// and provides the nickname and ageRange state along with their setters
export const UserProvider = ({ children }) => {
    const [nickname, setNickname] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);

    return(
        <UserContext.Provider value={{ 
            nickname, 
            setNickname, 
            ageRange, 
            setAgeRange,
            selectedDays,
            setSelectedDays
        }}>
            {children}
        </UserContext.Provider>
    )
}

//custom hook to use the UserContext
export const useUser = () => useContext(UserContext);