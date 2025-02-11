import { useEffect, useState } from "react";
import api from "./api";
function Content() {
    const [courses, setCourses] = useState([]);

    const courses_container = courses.map(course => <>
        <div className="flex flex-col gap-0.5 text-l">
            <img src="https://chonlink.com/wp-content/uploads/2022/08/Course-Hero.jpg" alt="" />
            <p className="text-xl font-bold">{course.name}</p>
            <p className="text-l text-gray-400">{course.instructor.name}</p>
            <p className="text-xl font-bold">{course.start_date}</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold">
                Enroll
            </button>
        </div>
    </>);
    useEffect(() => {
        api.get("/courses") // Example: Fetch user data
            .then(response => {
                console.log(response.data)
                setCourses(response.data.data.result)
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [])
    return (
        <>
            <div className="my-5">
                <h2 className="ml-5 text-2xl font-bold">What to learn next</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 my-4 mx-5">
                    {/* <div className="flex flex-col gap-0.5 text-l">
                        <img src="https://chonlink.com/wp-content/uploads/2022/08/Course-Hero.jpg" alt="" />
                        <p className="text-xl font-bold">R Programming A-Z™: R For Data Science</p>
                        <p className="text-l text-gray-400">Tu Tuyet Hong</p>
                        <p className="text-xl font-bold">$2000</p>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold">
                            Enroll
                        </button>
                    </div>
                    <div className="flex flex-col gap-0.5 text-l">
                        <img src="https://chonlink.com/wp-content/uploads/2022/08/Course-Hero.jpg" alt="" />
                        <p className="text-xl font-bold">R Programming A-Z™: R For Data Science</p>
                        <p className="text-l text-gray-400">Tu Tuyet Hong</p>
                        <p className="text-xl font-bold">$2000</p>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold">
                            Enroll
                        </button>
                    </div>
                    <div className="flex flex-col gap-0.5 text-l">
                        <img src="https://chonlink.com/wp-content/uploads/2022/08/Course-Hero.jpg" alt="" />
                        <p className="text-xl font-bold">R Programming A-Z™: R For Data Science</p>
                        <p className="text-l text-gray-400">Tu Tuyet Hong</p>
                        <p className="text-xl font-bold">$2000</p>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold">
                            Enroll
                        </button>
                    </div>
                    <div className="flex flex-col gap-0.5 text-l">
                        <img src="https://chonlink.com/wp-content/uploads/2022/08/Course-Hero.jpg" alt="" />
                        <p className="text-xl font-bold">R Programming A-Z™: R For Data Science</p>
                        <p className="text-l text-gray-400">Tu Tuyet Hong</p>
                        <p className="text-xl font-bold">$2000</p>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold">
                            Enroll
                        </button>
                    </div> */}
                    {courses_container}

                </div>
            </div>


        </>
    );

}

export default Content