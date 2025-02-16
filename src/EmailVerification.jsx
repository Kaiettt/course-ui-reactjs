import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Signup";
import axios from "axios";

function EmailVerification({ isOpen }) {
    if (!isOpen) {
        return null;
    }
    const navigate = useNavigate();
    const email = useContext(UserContext);
    const [tokenFail, setTokenFail] = useState(true);
    const [code, setCode] = useState(new Array(6).fill("")); // Stores 6-digit code
    const inputRefs = useRef([]); // To manage focus shifts

    const error = !tokenFail ?
        (<><p className="text-red-500">Invalid token</p></>) : null
    function handleVerify() {
        const verificationCode = code.join(""); // Convert array to string
        if (email && verificationCode.length === 6) {
            axios.get(`http://localhost:8080/api/v1/auth/confirm?token=${verificationCode},${email}`)
                .then(response => {
                    console.log("Verification successful", response);
                    navigate("/login");
                })
                .catch(error => {
                    setTokenFail(false)
                    console.log(verificationCode)
                    console.log(email)
                    console.log("Verification failed", error);
                });
        }
    }

    function handleChange(e, index) {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return; // Allow only numbers

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus(); // Move to next input
        }
    }

    function handleKeyDown(e, index) {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus(); // Move back if empty
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
                <h2 className="font-bold text-2xl mb-4">Verify your email</h2>
                <div className="flex justify-center gap-2">
                    {code.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputRefs.current[i] = el)}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            className="p-4 w-12 text-xl text-center rounded-xl border border-gray-500"
                        />
                    ))}
                </div>
                {error}
                <button onClick={handleVerify}
                    className="mt-4 rounded-xl bg-blue-600 px-6 py-3 text-xl font-bold text-white hover:bg-blue-700 transition"
                >
                    Verify
                </button>
            </div>
        </div>
    );
}

export default EmailVerification;
