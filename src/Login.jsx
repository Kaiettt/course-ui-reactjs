import { useState } from "react";
import banner1 from "./assets/banner1.jpg"
import axios from "axios";
import Header from "./Header";
import Content from "./Content";
const Login = ({ onLoginSuccess }) => {
    const [userName, setUserName] = useState("")
    const [passWord, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true)
    const loginFail = (!isLogin) ? (<><p className="text-red-700 text-xs -ml-10">Tên đăng nhập hoặc mật khẩu không hợp lệ</p></>) : (null);
    const getUserName = (event) => {
        setUserName(event.target.value);
    }

    const getPassword = (event) => {
        setPassword(event.target.value);
    }

    function sendRequest() {
        axios.post("http://localhost:8080/api/v1/auth/login", {
            username: userName,
            password: passWord
        })
            .then(response => {
                console.log("login successfully ", response.data)
                const token = response.data.data.accessToken;
                if (token) {
                    localStorage.setItem("accessToken", token);
                    setIsLogin(true)
                    onLoginSuccess();
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setIsLogin(false);
                }
            });
    }

    return (
        <>
            <div className="flex h-screen w-screen">
                <div className="flex w-[600px] flex-col items-center gap-3 scale-105 mt-18">
                    <h2 className="mt-8 text-4xl font-bold text-blue-600">UTEX</h2>
                    <h2 className="text-base">Login to your account</h2>
                    <p className="text-xs font-light text-gray-400">Welcome to UTEX</p>

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

                    <div className="relative w-[280px]">
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/remitting-country-linear-icon/password-148.png" className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform opacity-60" alt="Password Icon" />
                        <input onChange={getPassword} type="password" placeholder="Enter your password" className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-xs focus:outline-none" />
                    </div>
                    {loginFail}
                    <div className="flex flex-row items-center text-xs gap-12 mt-2">
                        <input type="checkbox" className="h-3.5 w-3.5" />
                        <p className="text-gray-500 -ml-10 text-xs">Remember me</p>
                        <p className="ml-auto text-blue-600 cursor-pointer text-xs">Forgot your password?</p>
                    </div>

                    <button onClick={sendRequest} className=" cursor-pointer text-sm rounded-2xl bg-blue-600 px-30 py-2  text-white font-medium hover:bg-blue-700 transition active:bg-blue-800">
                        Login
                    </button>
                </div>

                <div className="flex-1 bg-blue-700">
                    <img className="-mt-20" src={banner1} alt="" />
                </div>
            </div>
        </>
    );
}

export default Login