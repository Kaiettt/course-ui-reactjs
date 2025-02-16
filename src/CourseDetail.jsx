import React, { useEffect, useState } from "react";
const CourseDetail = ({ course }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return (
        <div className="bg-gray-900 text-white p-8 w-screen h-screen flex flex-row">
            <div className="flex flex-col w-3xl">
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

                <div className="flex items-center space-x-3 mb-6">
                    <span className="bg-green-600 text-white px-4 py-2 text-sm font-bold rounded-lg">Active</span>
                    <span className="text-yellow-400 text-2xl">★★★★☆</span>
                    <span className="text-gray-300 text-lg">(55,424 ratings) 276,989 students</span>
                </div>

                <p className="text-lg text-gray-400 mb-6">
                    Created by <span className="text-blue-400 font-medium">{course.instructor.name}</span>
                </p>

                <div className="flex items-center text-gray-400 text-lg space-x-4">
                    <span>📅{formatDate(course.start_date)} - </span>
                    <span>🌍 {formatDate(course.end_date)}</span>
                </div>
            </div>
            <div className="mt-7 flex flex-col gap-2 bg-amber-50 w-100 h-90 rounded-2xl">
                <img className="w-100 h-60" src="https://chonlink.com/wp-content/uploads/2022/08/Course-Hero.jpg" alt="" />
                <button className="text-2xl px-4 py-4 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold max-w-50 ml-25 mt-5">
                    Enroll
                </button>
            </div>
        </div>
    );
};

export default CourseDetail;

