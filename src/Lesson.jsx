import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axiosInstance from "./axiosConfig";
import pdf_file from "./assets/pdf-file.png"
import docx_file from "./assets/docx_icon.svg.png"
import attachment_icon from "./assets/attach-document.png"
import Cookies from "js-cookie";
function Lesson({ courseId, userid }) {
    const { API_URL } = useAuth()
    const [lessons, setLessons] = useState([])
    const [loading, setLoading] = useState(true)
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axiosInstance.get(`${API_URL}/lessons/${courseId}`)
            .then(response => {
                console.log(response.data)
                setLessons(response.data.data)
                setLoading(false)
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [])
    function handleFileChange(event) {
        const file = event.target.files[0];
        setFile(file);
    }
    async function createNewMaterial(uploadedFile, id, index) {
        try {
            const response = await axiosInstance.post(`${API_URL}/materials`, {
                uri: uploadedFile.uri,
                name: uploadedFile.name,
                fileName: uploadedFile.fileName,
                folder: uploadedFile.folder,
                lessonId: id
            });
            console.log(response.data)
            setLessons(prevLessons => {
                const newLessons = [...prevLessons];
                if (newLessons[index]) {
                    newLessons[index] = {
                        ...newLessons[index],
                        materials: [...(newLessons[index].materials || []), response.data.data]
                    };
                }
                return newLessons;
            });
        } catch (error) {
            console.error("Upload failed:", error);
            alert("File upload failed.");
        }
    }
    async function handleUpLoadFile(lessonId, index) {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "avatar");

        try {
            const response = await axiosInstance.post(`${API_URL}/files`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("File uploaded successfully!");
            console.log(response.data);
            createNewMaterial(response.data.data, lessonId, index);

            setFile(null);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("File upload failed.");
        }
    }

    const list = ["The definition of information security", "The critical characteristics of information", "The comprehensive model for information security", "The approaches to information security implementation"];
    const list_component = list.map((item, index) => <li key={index}>{item}</li>);
    if (loading) {
        return (
            <>
                <div>LOADING</div>
            </>
        )
    }
    function handleFileIcon(type) {
        if (type === "PDF") {
            return pdf_file;
        }
        if (type === "DOCX" || type === "TXT") {
            return docx_file;
        }
        return attachment_icon;
    }
    const handleDownLoadFile = async (folder, fileName) => {
        try {
            const response = await axiosInstance.get(
                `${API_URL}/files?folder=avatar&filename=${fileName}`,
                { responseType: "blob" }
            );
            const contentDisposition = response.headers["content-disposition"];
            let suggestedFileName = fileName;

            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+?)"/);
                if (match) {
                    suggestedFileName = match[1];
                }
            }

            const blob = new Blob([response.data]);
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = suggestedFileName;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);

        } catch (error) {
            console.error("Download failed:", error);
            alert("Downloading file failed.");
        }
    };

    function handleDoTest(id) {
        navigate(`/quizzes/${id}`)
        Cookies.set("currentCourse", courseId, { expires: 1 });
    }

    const lesson_card = lessons.map((lesson, index) => (
        <div key={index} className="p-5 my-3 w-280 mx-auto bg-white border border-gray-400 flex flex-col rounded-xl">
            <h2 className="text-2xl">{lesson.name}</h2>
            <ul className="ml-4 mt-3 list-decimal">
                {list_component}
            </ul>
            <hr className="border-t border-gray-300 my-2" />
            <div className="ml-3 w-270 flex flex-col gap-2">
                {lesson.materials.map((material, matIndex) => (
                    <div key={matIndex} className="flex flex-row gap-3 items-center">
                        <img
                            className="w-8 h-8"
                            src={handleFileIcon(material.type)}
                            alt="PDF"
                        />
                        <p
                            onClick={() => handleDownLoadFile(material.folder, material.fileName)}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            {material.name}
                        </p>

                    </div>
                ))}
                <input type="file" onChange={(e) => handleFileChange(e)} className="mt-2" />
                <button onClick={() => handleUpLoadFile(lesson.id, index)} className="ml-2 p-2 bg-blue-600 w-30 text-white font-bold rounded-2xl hover:bg-blue-500 cursor-pointer">
                    Upload
                </button>
            </div>
            <hr className="border-t border-gray-300 my-2" />
            <div className="ml-3 flex fex-row gap-3">
                <img
                    className="w-8 h-8"
                    src="https://utexlms.hcmute.edu.vn/theme/image.php/maker/forum/1735169379/monologo?filtericon=1"
                    alt=""
                />
                <p className="text-blue-500 hover:underline cursor-pointer" >Thảo luận</p>
            </div>
            <hr className="border-t border-gray-300 my-2" />
            <div className="flex flex-col gap-3">
                {lesson.tests.map((test, index) =>
                (
                    <>
                        <div className="ml-3 w-[270px] flex flex-row gap-3">
                            <img className="w-10 h-10" src="https://utexlms.hcmute.edu.vn/theme/image.php/maker/quiz/1735169379/monologo?filtericon=1" alt="icon" />
                            <div className="flex flex-col">
                                <h2 onClick={() => handleDoTest(test.id)} className="text-xl font-semibold text-blue-500 hover:underline">{test.title}</h2>
                                <p className="text-sm text-gray-600">
                                    Opened: Thứ Hai, 23 tháng 12 2024, 10:18 AM <br />
                                    Closes: Thứ Tư, 23 tháng 4 2025, 10:18 AM
                                </p>
                            </div>
                        </div>
                    </>
                )
                )}

            </div>
        </div>
    ));

    if (lessons.length > 0) {
        return (<>
            <div className="mx-auto w-300 bg-white border border-gray-400 flex flex-col">
                {lesson_card}
            </div>
        </>);
    }


}
export default Lesson