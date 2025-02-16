import { useState, useContext, useEffect } from "react"
import Content from "./Content"
import Header from "./Header"
import api from "./api";
import { AuthContext } from "./AuthContext";
function HomePage() {
    const [courses, setCourses] = useState([]);
    const { isLogin, setIsLogin } = useContext(AuthContext);
    useEffect(() => {
        setCourses(courses)
        api.get("/courses")
            .then(response => {
                setIsLogin(true)
                setCourses(response.data.data.result)
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [])
    return (<>
        <Header></Header>
        <Content courses={courses}></Content>
    </>)
}

export default HomePage