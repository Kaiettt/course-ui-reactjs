import { useState, useContext, useEffect } from "react"
import Content from "./Content"
import Header from "./Header"
import { useAuth } from "./AuthContext";
import axiosInstance from "./axiosConfig";
function HomePage() {
    const [courses, setCourses] = useState([]);
    const { isAuthenticated, login, logout, API_URL } = useAuth()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`${API_URL}/courses`);
                setCourses(response.data.data.result);
                print(response.data.data.result)
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchData();
    }, []);
    return (<>
        <Header></Header>
        <Content courses={courses}></Content>
    </>)

}

export default HomePage