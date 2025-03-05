import React, { use, useContext, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../AuthContext";
import { QuizzContext } from "./QuizzProvider";
function Quizz({ id }) {
    const { isPreStart, setIsPreStart } = useContext(QuizzContext);
    const { userInfo, API_URL } = useAuth();
    const [test, setTest] = useState(null)
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        if (!isPreStart) {
            axiosInstance.get(`${API_URL}/tests/${id}`)
                .then(response => {
                    setTest(response.data.data);
                    setQuestions(response.data.data.questions);
                    setLoading(false);
                })
                .catch(error => console.error("Error fetching data:", error));
        }
    }, [isPreStart]);
    const [isStarted, setIsStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(Array(questions.length).fill(null));
    const [isFinish, setIsFinish] = useState(false);
    const [totalRightAnswers, setTotalRightAnswers] = useState(0);
    const total = questions.length;
    const percentage = total > 0 ? (totalRightAnswers / total) * 100 : 0;
    const incorrect = total - totalRightAnswers;

    async function handleFinishTest() {
        const score = (totalRightAnswers * 10) / questions.length;
        const completedAt = new Date().toISOString();
        console.log(completedAt);
        try {
            const response = await axiosInstance.post(`${API_URL}/test-results`, {
                attemptNumber: 3,
                completedAt: completedAt,
                totalQuestion: questions.length,
                totalRightAnswers: totalRightAnswers,
                score: score,
                status: "STATUS",
                studentId: userInfo.id,
                testId: test.id
            });
            setIsPreStart(true)
            console.log(response.data.data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    const handleNext = () => {
        if (currentQuestion === questions.length - 1) {
            let correctCount = 0;
            selectedOption.forEach((choice, index) => {
                if (choice === questions[index].answer) {
                    correctCount++;
                }
            });
            setTotalRightAnswers(correctCount);
            setIsFinish(true);
            return;
        }
        setCurrentQuestion(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleChooseOption = (option) => {
        setSelectedOption(prev => {
            const updatedSelection = [...prev];
            updatedSelection[currentQuestion] = option;
            return updatedSelection;
        });
    };
    function handleStartTest() {
        setIsStarted(true)
    }

    if (loading) {
        return (
            <></>
        )
    }
    if (!isPreStart) {
        return (
            <div className="bg-gray-900 flex items-center justify-center h-screen p-4">
                <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md shadow-lg text-center flex flex-col">
                    {!isStarted ?
                        (<>
                            <div>
                                <h2 className="text-2xl font-semibold mb-3">{test.title}</h2>
                                <p className="mb-2">Duration: {test.duration}</p>
                                <p className="mb-2">Start Time: 23/10/25 10:00</p>
                                <p className="mb-2">End Time: 23/10/25 10:50</p>
                                <p className="mb-4">Attempts Allowed: {test.attempsAllowed}</p>
                                <button
                                    className="text-white cursor-pointer py-2 px-4 rounded-lg bg-green-600 hover:bg-green-500"
                                    onClick={handleStartTest}
                                >
                                    Confirm & Start Test
                                </button>
                            </div></>) :
                        (<>
                            {isFinish ? (
                                <>
                                    <h2 className="text-2xl font-semibold mb-3">TEST 1</h2>
                                    <h2 className="text-2xl font-semibold mb-3">Thời gian của bạn: 1 phút</h2>
                                    <div className="ml-20 flex items-center gap-6 p-4 rounded-lg mx-auto">
                                        <div className="w-20 h-20">
                                            <CircularProgressbar
                                                value={percentage}
                                                text={`${Math.round(percentage)}%`}
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
                                                <span className="border border-green-400 px-2 py-1 rounded-md">{totalRightAnswers}</span>
                                            </div>
                                            <div className="ml-4 flex items-center gap-2 text-orange-400">
                                                <span>Sai</span>
                                                <span className="border border-orange-400 px-2 py-1 rounded-md">{incorrect}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={handleFinishTest} className="text-white cursor-pointer py-2 px-4 rounded-lg flex items-center gap-2 bg-blue-600 hover:bg-blue-500">
                                        FINISH <ArrowRight size={18} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-semibold mb-3">{`${currentQuestion + 1} / ${questions.length}`}</h2>
                                    <h2 className="text-xl font-semibold mb-3">Định nghĩa</h2>
                                    <p className="text-2xl font-bold mb-4">{questions[currentQuestion].questionTitle}</p>
                                    <p className="mb-3">Chọn thuật ngữ đúng</p>
                                    <div className="grid grid-cols-2 gap-4 place-items-center">
                                        {questions[currentQuestion].questionOptions.map((option, index) => (
                                            <button
                                                onClick={() => handleChooseOption(option)}
                                                key={index}
                                                className={`cursor-pointer p-3 rounded-lg w-full break-words ${selectedOption[currentQuestion] === option ? "bg-green-600 text-white" : "bg-gray-700 hover:bg-gray-600"
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="mt-4 text-sm text-blue-400 cursor-pointer hover:underline">Bạn không biết?</p>
                                    <div className="flex justify-between items-center mt-5">
                                        <button
                                            onClick={handleBack}
                                            disabled={currentQuestion === 0}
                                            className={`cursor-pointer py-2 px-4 rounded-lg flex items-center gap-2 ${currentQuestion === 0 ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-500"
                                                }`}
                                        >
                                            <ArrowLeft size={18} /> Back
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="cursor-pointer py-2 px-4 rounded-lg flex items-center gap-2 bg-blue-600 hover:bg-blue-500"
                                        >
                                            {currentQuestion === questions.length - 1 ? "FINISH" : "NEXT"} <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </>)}

                </div>
            </div>
        );
    }

}

export default Quizz;
