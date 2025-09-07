import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showSidebar, setShowSidebar] = useState(true);
    const [manualToggle, setManualToggle] = useState(false);

    const decodeAndSetUser = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            decodeAndSetUser(token);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('accessToken', token);
        decodeAndSetUser(token);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                if (!manualToggle) {
                    setShowSidebar(false);
                }
            } else {
                setShowSidebar(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [manualToggle]);

    const handleShowSidebar = () => {
        setShowSidebar((prevState) => !prevState);
        setManualToggle(true);  // Set manualToggle to true when sidebar is manually toggled
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, handleShowSidebar, showSidebar }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
