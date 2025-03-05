import Header from "./Header";
import CourseDetail from "./CourseDetail";
import { useParams } from "react-router-dom";
import { useEffect, useState, createContext, useContext } from "react";
import axiosInstance from "./axiosConfig";
import { useAuth } from "./AuthContext";
// Create the context
const CourseContext = createContext();

// Create a custom hook for using the context
export function useCourse() {
    return useContext(CourseContext);
}

function CourseOverview() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const { userInfo, API_URL } = useAuth();

    // Fetch course data
    useEffect(() => {
        if (id)
            setLoading(true);
        axiosInstance.get(`${API_URL}/courses/${id}`)
            .then(response => {
                setCourse(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching course data:", error);
                setLoading(false);
            });
    }, [id, API_URL]);

    // Check enrollment status
    useEffect(() => {
        if (course && userInfo) {
            axiosInstance.get(`${API_URL}/enrollments/${course.id}/${userInfo.id}`)
                .then(response => {
                    console.log(response.data);
                    setIsEnrolled(true);
                })
                .catch(error => {
                    console.error("Error checking enrollment:", error);
                    setIsEnrolled(false);
                });
        }
    }, [course, userInfo, API_URL]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading course content...</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Course not found or error loading data</p>
            </div>
        );
    }

    return (
        <CourseContext.Provider value={{ course, isEnrolled, setIsEnrolled }}>
            <Header />
            <CourseDetail />
        </CourseContext.Provider>
    );
}

export default CourseOverview;
