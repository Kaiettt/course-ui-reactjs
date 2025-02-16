import { useEffect, useState, useContext } from "react";
import api from "./api";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
function Content({ courses }) {
    const navigate = useNavigate();
    const { isLogin, setIsLogin } = useContext(AuthContext);

    function handleChooseCourse(courseID) {
        navigate(`/courses/${courseID}`);  // Fix: "/courses/" instead of "/course/"
    }

    const courses_container = courses.map(course => course.status == "ACTIVE" ? (<>
        <div className="flex flex-col gap-0.5 text-l">
            <img src="https://chonlink.com/wp-content/uploads/2022/08/Course-Hero.jpg" alt="" />
            <p className="text-2xl font-bold">{course.name}</p>
            <p className="text-xl text-gray-400">{course.instructor.name}</p>
            <button onClick={() => handleChooseCourse(course.id)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold">
                Enroll
            </button>
        </div>
    </>) : (null));

    return (
        <>
            <div className="my-5">
                <h2 className="ml-5 text-2xl font-bold">What to learn next</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 my-4 mx-5">
                    {courses_container}
                </div>
                <h2 className="ml-5 text-2xl font-bold">Enrolled courses</h2>
            </div>


        </>
    );

}

export default Content