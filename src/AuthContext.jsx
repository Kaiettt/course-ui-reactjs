import { createContext, useEffect, useState, useContext } from "react";
import authService from "./authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [isLogin, setIsLogin] = useState(false);
    // const [fullName, setFullName] = useState(null);
    const API_URL = 'http://localhost:8080/api/v1';
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        id: null,
        userName: '',
        fullName: '',
        role: ''
    });
    useEffect(() => {
        const token = authService.getAccessToken();
        setIsAuthenticated(true)
        setLoading(false)
    }, [])
    const login = async (username, password) => {

        try {
            const responce = await authService.login(username, password)
            setIsAuthenticated(true)
            setUserInfo(responce.data.user)
        } catch (error) {
            throw error
        }
    }
    const logout = async () => {
        try {
            await authService.logout()
            setUserInfo({
                id: null,
                userName: '',
                fullName: '',
                role: ''
            })
            setIsAuthenticated(false)
        } catch (error) {
            throw error;
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, API_URL, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);