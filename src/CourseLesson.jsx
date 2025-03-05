
import { useEffect, useState } from "react";
import Header from "./Header";
import Lesson from "./Lesson"
import { useParams } from "react-router-dom";
import axiosInstance from "./axiosConfig";
import { useAuth } from "./AuthContext";
function CourseLesson() {

    const { courseId, userid } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const { API_URL } = useAuth()
    useEffect(() => {
        axiosInstance.get(`${API_URL}/courses/${courseId}`)
            .then(response => {
                setCourse(response.data.data)
                setLoading(false)
            })
            .catch(error => console.error("Error fetching data:", error));

    }, [courseId])
    if (loading) {
        return (
            <> <div>LOADING</div></>
        )
    }
    if (course) {
        {
            return (<>
                <div className="bg-gray-100">
                    <Header></Header>
                    <div className=" relativ w-300 mx-auto my-10">
                        {/* Background Image */}
                        <img
                            src="https://t4.ftcdn.net/jpg/04/30/13/89/360_F_430138951_otmGEbVlWbrpfbRBJaNMvkqVXTkCRx76.jpg"
                            alt="Overlay Image"
                            className="w-full h-auto rounded-lg"
                        />

                        {/* Overlay Button */}
                        <div className="absolute top-40 left-20 bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-lg">
                            {course.name}
                        </div>
                    </div>
                    <ul className="mt-10 mb-10 flex flex-wrap text-sm font-medium text-center bg-white border  border-gray-400 w-300 mx-auto">
                        <li className="me-2">
                            <a href="#" aria-current="page" className="ml-10 inline-block p-4  bg-blue-600 rounded-t-lg active dark:bg-wite text-white">Khóa học</a>
                        </li>
                        <li className="me-2">
                            <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600  dark:hover:bg-blue-600 dark:hover:text-white">Danh sách thành viên</a>
                        </li>
                        <li className="me-2">
                            <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600  dark:hover:bg-blue-600 dark:hover:text-white">Điểm số</a>
                        </li>
                        <li className="me-2">
                            <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600  dark:hover:bg-blue-600 dark:hover:text-white">Năng lực</a>
                        </li>
                    </ul>
                </div>
                <Lesson userid={userid} courseId={courseId}></Lesson>
            </>)
        }
    }

}
export default CourseLesson