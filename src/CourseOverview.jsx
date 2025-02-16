import Header from "./Header"
import CourseDetail from "./CourseDetail"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api";
function CourseOverview() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    useEffect(() => {
        console.log("ID:la ", id)
        api.get(`/courses/${id}`)
            .then(response => {
                console.log(response.data)
                setCourse(response.data.data)
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [id])
    if (course) {
        return (
            <>
                <Header></Header>
                <CourseDetail course={course}></CourseDetail>
            </>
        )
    }


}

export default CourseOverview