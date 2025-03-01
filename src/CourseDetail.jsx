import React, { useState } from "react";
import axiosInstance from "./axiosConfig";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { useCourse } from "./CourseOverview";
const CourseDetail = () => {

    const { course, isEnrolled, setIsEnrolled } = useCourse();
    const navigate = useNavigate();
    const { userInfo, API_URL } = useAuth();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    function handleAccessLesson(courseId) {
        navigate(`/lessons/${courseId}/${userInfo.id}`);
    }

    function handleEnrollCourse() {
        axiosInstance.post(`${API_URL}/enrollments`, {
            user: {
                id: userInfo.id
            },
            course: {
                id: course.id
            },
            enrollmentStatus: "ACTIVE"
        })
            .then(response => {
                console.log(response.data);
                setIsEnrolled(true);
            })
            .catch(error => {
                console.error("Error enrolling in course:", error);
            });
    }

    return (
        <div className="bg-gray-900 text-white p-8 w-full min-h-screen flex flex-col md:flex-row gap-8">
            {/* Course Information Section */}
            <div className="flex flex-col md:w-2/3">
                <nav className="text-lg text-gray-400 mb-6">
                    <span className="text-purple-400 font-semibold">Course</span> &gt;
                    <span className="text-purple-400 font-semibold"> {course.name}</span>
                </nav>

                <h1 className="text-4xl font-extrabold mb-4 leading-tight">
                    {course.name}
                </h1>

                <p className="text-gray-300 text-lg mb-6">
                    {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="bg-green-600 text-white px-4 py-2 text-sm font-bold rounded-lg">Active</span>
                    <span className="text-yellow-400 text-2xl">★★★★☆</span>
                    <span className="text-gray-300 text-lg">(55,424 ratings) 276,989 students</span>
                </div>

                <p className="text-lg text-gray-400 mb-6">
                    Created by <span className="text-blue-400 font-medium">{course.instructor.name}</span>
                </p>

                <div className="flex items-center text-gray-400 text-lg">
                    <span className="mr-1">📅 {formatDate(course.start_date)} -</span>
                    <span>{formatDate(course.end_date)}</span>
                </div>
            </div>

            {/* Course Card Section */}
            <div className="md:w-1/3 flex flex-col bg-amber-50 rounded-2xl overflow-hidden shadow-lg">
                <img
                    className="w-full h-48 object-cover"
                    src="https://chonlink.com/wp-content/uploads/2022/08/Course-Hero.jpg"
                    alt={`${course.name} thumbnail`}
                />
                <div className="p-6 flex flex-col items-center">
                    {isEnrolled ? (
                        <button
                            onClick={() => handleAccessLesson(course.id)}
                            className="w-full text-xl px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold transition-colors"
                        >
                            CONTINUE LEARNING
                        </button>
                    ) : (
                        <button
                            onClick={handleEnrollCourse}
                            className="w-full text-xl px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold transition-colors"
                        >
                            ENROLL NOW
                        </button>
                    )}

                    <div className="mt-6 text-gray-700 text-center">
                        <p className="font-bold text-lg">Course Includes:</p>
                        <ul className="mt-2 space-y-2">
                            <li className="flex items-center">✓ Full lifetime access</li>
                            <li className="flex items-center">✓ Certificate of completion</li>
                            <li className="flex items-center">✓ Downloadable resources</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;