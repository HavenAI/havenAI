import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();
// wraps the children components with UserContext.Provider
// and provides the nickname and ageRange state along with their setters
export const UserProvider = ({ children }) => {
    const [nickname, setNickname] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [sessionsData, setSessionsData] = useState([
        { day: 'M', count: 0 },
        { day: 'T', count: 0 },
        { day: 'W', count: 0 },
        { day: 'T', count: 0 },
        { day: 'F', count: 0 },
        { day: 'S', count: 0 },
        { day: 'S', count: 0 }
    ]);
    const [cutbackDays, setCutbackDays] = useState(0);
    const [lastCutbackDate, setLastCutbackDate] = useState('');
    const [filledDays, setFilledDays] = useState([]);
    const [token, setToken] = useState('');
    return(
        <UserContext.Provider value={{
            token,
            setToken, 
            nickname, 
            setNickname, 
            ageRange, 
            setAgeRange,
            selectedDays,
            setSelectedDays,
            sessionsData,
            setSessionsData,
            cutbackDays,
            setCutbackDays,
            lastCutbackDate,
            setLastCutbackDate,
            filledDays,
            setFilledDays
        }}>
            {children}
        </UserContext.Provider>
    )
}

//custom hook to use the UserContext
export const useUser = () => useContext(UserContext);