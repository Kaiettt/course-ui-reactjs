import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { QuizzContext } from "./QuizzProvider";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import axiosInstance from "../axiosConfig";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function QuizzResultReview({ id }) {
    const navigate = useNavigate();
    const { userInfo, API_URL } = useAuth();
    const { isPreStart, setIsPreStart } = useContext(QuizzContext);
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (isPreStart) {
            axiosInstance.get(`${API_URL}/test-results/${id}/${userInfo.id}`)
                .then(responce => {
                    setResults(responce.data.data);
                    console.log("HAHAHAHHA")
                    console.log(responce.data.data);
                    setLoading(false)
                })
                .catch(error => console.log(error))
        }
    }, [isPreStart])
    function handleBackToLesson() {
        const currentCourse = Cookies.get("currentCourse");
        console.log(currentCourse)
        navigate(`/lessons/${currentCourse}/${userInfo.id}`);
    }
    const resultComponents = results.map((result, index) =>
        <>
            <div key={index} className="bg-gray-800 text-white px-10 py-6 rounded-lg w-full max-w-md shadow-lg text-center flex flex-col gap-2">
                <h2 className="text-white text-xl">Điểm tổng kết cho bài làm của bạn là</h2>
                <h2 className="text-white text-2xl font-bold">{`${result.score} / 10`}</h2>
                <h2 className="text-white text-xl">Thời gian của bạn: 1 phút</h2>
                <h2 className="text-white text-xl">{`Hoàn thành vào: ${result.completedAt}`}</h2>
                <h2 className="text-white text-xl">{`Lần làm bài: ${result.attempt_number}`}</h2>
                <div className="flex flex-row items-center gap-6 p-4 rounded-lg mx-auto">
                    <div className="w-20 h-20">
                        <CircularProgressbar
                            value={result.totalRightAnswers * 100 / result.totalQuestion}
                            text={`${Math.round(result.totalRightAnswers * 100 / result.totalQuestion)}%`}
                            styles={buildStyles({
                                textColor: "#fff",
                                pathColor: "#15c572",
                                trailColor: "#f18904",
                                textSize: "24px",
                            })}
                        />
                    </div>

                    <div className="flex flex-col gap-2 text-lg font-semibold">
                        <div className="flex items-center gap-2 text-green-400">
                            <span>Đúng</span>
                            <span className="border border-green-400 px-2 py-1 rounded-md">
                                {result.totalRightAnswers}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-orange-400">
                            <span>Sai</span>
                            <span className="border border-orange-400 px-2 py-1 rounded-md">
                                {result.totalQuestion - result.totalRightAnswers}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    if (isPreStart && loading) {
        return (<>
            <div>LOADING</div>
        </>)
    }
    if (isPreStart) {
        return (
            <div className="bg-gray-900 flex flex-col gap-4 items-center justify-center min-h-screen p-4 overflow-auto">

                <button onClick={handleBackToLesson} className="cursor-pointer -ml-280 px-6 py-4 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold">
                    Back
                </button>

                <button onClick={() => setIsPreStart(false)} className="px-6 py-4 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold">
                    TAKE THE TEST
                </button>

                {resultComponents}
            </div>
        );
    }

}

export default QuizzResultReview;
