import { useState } from "react";
import banner1 from "./assets/banner1.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        userName: "",
        passWord: "",
        rememberMe: false
    });
    const [isLoginFailed, setLoginFailed] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.userName, formData.passWord);
            navigate("/")
        } catch (error) {
            setLoginFailed(true)
            console.log(error)

        }
    };

    return (
        <div className="flex h-screen w-screen">
            <div className="flex w-[600px] flex-col items-center gap-3 scale-105 mt-13">
                <h2 className="mt-8 text-4xl font-bold text-blue-600">UTEX</h2>
                <h2 className="text-base">Login to your account</h2>
                <p className="text-xs font-light text-gray-400">Welcome to UTEX</p>

                <div className="flex gap-3">
                    <button type="button" className="cursor-pointer flex items-center gap-2 rounded-2xl border border-gray-300 px-5 py-2 text-xs hover:bg-gray-100">
                        <img className="h-5 w-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="" />
                        Google
                    </button>
                    <button type="button" className="cursor-pointer flex items-center gap-2 rounded-2xl border border-gray-300 px-5 py-2 text-xs hover:bg-gray-100">
                        <img className="h-5 w-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png" alt="" />
                        Facebook
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-[280px]">
                    <div className="relative w-full">
                        <img
                            src="https://png.pngtree.com/png-vector/20190927/ourmid/pngtree-email-icon-png-image_1757854.jpg"
                            className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform opacity-60"
                            alt="Email Icon"
                        />
                        <input
                            type="email"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-xs focus:outline-none"
                            required
                        />
                    </div>

                    <div className="relative w-full">
                        <img
                            src="https://icons.veryicon.com/png/o/miscellaneous/remitting-country-linear-icon/password-148.png"
                            className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform opacity-60"
                            alt="Password Icon"
                        />
                        <input
                            type="password"
                            name="passWord"
                            value={formData.passWord}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-xs focus:outline-none"
                            required
                            minLength={6}
                        />
                    </div>

                    {isLoginFailed && (
                        <p className="text-red-700 text-xs -ml-10">
                            Tên đăng nhập hoặc mật khẩu không hợp lệ
                        </p>
                    )}

                    <div className="flex flex-row items-center text-xs gap-12 mt-2 w-full">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="h-3.5 w-3.5"
                            />
                            <span className="text-gray-500 text-xs">Remember me</span>
                        </label>
                        <button
                            type="button"
                            className="ml-auto text-blue-600 cursor-pointer text-xs"
                        >
                            Forgot your password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer text-sm rounded-2xl bg-blue-600 px-30 py-2 text-white font-medium hover:bg-blue-700 transition active:bg-blue-800"
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/signup")}
                        className="w-full border border-solid cursor-pointer text-sm rounded-2xl bg-white px-30 py-2 text-blue-600 font-medium hover:bg-blue-700 hover:text-white transition active:bg-blue-800 active:text-white"
                    >
                        Signup
                    </button>
                </form>
            </div>

            <div className="flex-1 bg-blue-700">
                <img className="-mt-20" src={banner1} alt="" />
            </div>
        </div>
    );
};

export default Login;