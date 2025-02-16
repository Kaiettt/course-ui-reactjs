
import banner1 from "./assets/banner1.jpg"
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailVerification from "./EmailVerification";
import axios from "axios";

const UserContext = createContext(null);
const Signup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState("")
    const [passWord, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastname] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")



    const getUserName = (event) => {
        setUserName(event.target.value);
    }

    const getConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const getLastName = (event) => {
        setLastname(event.target.value);
    }
    const getPassword = (event) => {
        setPassword(event.target.value);
    }
    const getFirstName = (event) => {
        setFirstName(event.target.value);
    }
    function sendRequest() {
        axios.post("http://localhost:8080/api/v1/auth/signup", {
            email: userName,
            firstName: firstName,
            lastName: lastName,
            password: passWord,
            confirmPassword: confirmPassword,
            facultyId: null
        })
            .then(responce => {
                if (responce) {

                }
            })
            .catch(error => {
                console.log(error);
            });
        setIsOpen(true);
    }


    return (
        <>
            <div className="flex h-screen w-screen">
                <div className="flex w-[600px] flex-col items-center gap-3 scale-105">
                    <h2 className="mt-8 text-4xl font-bold text-blue-600">UTEX</h2>
                    <h2 className="text-base">Signup to your UTEX</h2>
                    <div className="flex gap-3">
                        <button className="cursor-pointer flex items-center gap-2 rounded-2xl border border-gray-300 px-5 py-2 text-xs hover:bg-gray-100">
                            <img className="h-5 w-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="" />
                            Google
                        </button>
                        <button className="cursor-pointer flex items-center gap-2 rounded-2xl border border-gray-300 px-5 py-2 text-xs hover:bg-gray-100">
                            <img className="h-5 w-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png" alt="" />
                            Facebook
                        </button>
                    </div>

                    <div className="relative w-[280px]">
                        <img src="https://png.pngtree.com/png-vector/20190927/ourmid/pngtree-email-icon-png-image_1757854.jpg" className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform opacity-60" alt="Email Icon" />
                        <input onChange={getUserName} type="text" placeholder="Enter your email" className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-xs  focus:outline-none" />
                    </div>

                    <div className="flex flex-row gap-2">
                        <div className="relative w-[135px]">
                            <img src="https://w7.pngwing.com/pngs/930/532/png-transparent-computer-icons-personal-web-page-user-name-icon-monochrome-user-tag.png" className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform opacity-60" alt="Password Icon" />
                            <input onChange={getFirstName} type="text" placeholder="First Name" className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-2 text-xs focus:outline-none" />
                        </div>
                        <div className="relative w-[135px]">
                            <img src="https://w7.pngwing.com/pngs/930/532/png-transparent-computer-icons-personal-web-page-user-name-icon-monochrome-user-tag.png" className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform opacity-60" alt="Password Icon" />
                            <input onChange={getLastName} type="text" placeholder="Last Name" className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-xs focus:outline-none" />
                        </div>
                    </div>

                    <div className="relative w-[280px]">
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/remitting-country-linear-icon/password-148.png" className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform opacity-60" alt="Password Icon" />
                        <input onChange={getPassword} type="password" placeholder="Enter your password" className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-xs focus:outline-none" />
                    </div>
                    <div className="relative w-[280px]">
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/remitting-country-linear-icon/password-148.png" className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform opacity-60" alt="Password Icon" />
                        <input onChange={getConfirmPassword} type="text" placeholder="Confirm your password" className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-xs focus:outline-none" />
                    </div>
                    <div className="flex flex-row items-center text-xs gap-1 mt-2 -ml-4">
                        <input type="checkbox" className="h-3.5 w-3.5" />
                        <p className="text-gray-500 text-xs">Remember me</p>
                        <p className=" text-blue-600 cursor-pointer text-xs ml-8">Already have an account?</p>
                    </div>

                    <button onClick={sendRequest} className=" cursor-pointer text-sm rounded-2xl bg-blue-600 px-30 py-2  text-white font-medium hover:bg-blue-700 transition active:bg-blue-800">
                        Create
                    </button>


                </div>
                <UserContext.Provider value={userName}>
                    <EmailVerification isOpen={isOpen}></EmailVerification>
                </UserContext.Provider>
                <div className="flex-1 bg-blue-700">
                    <img className="-mt-20" src={banner1} alt="" />
                </div>
            </div>
        </>
    );
}

export default Signup

export { UserContext }