import QuizzResultReview from "./QuizzResultReview";
import Quizz from "./quizz/Quizz";
import { useParams } from "react-router-dom";
import { QuizzProvider } from "./QuizzProvider";
function QuizzOverView() {
    const { id } = useParams();
    return (
        <QuizzProvider>
            <QuizzResultReview id={id} />
            <Quizz id={id} />
        </QuizzProvider>
    );
}
export default QuizzOverView