import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Globe } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, login, logout, API_URL, userInfo } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    async function handleLogOut() {
        await logout();
    }
    const nagivate = useNavigate()
    function handleLogin() {
        nagivate("/login")
    }
    function handleSignup() {
        nagivate("/signup")
    }
    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest("#dropdownContainer")) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const info_component = !isAuthenticated ? (
        <>
            <button onClick={handleLogin} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                Log in
            </button>
            <button onClick={handleSignup} className="px-4 py-2 text-sm text-white bg-blue-500 rounded">
                Sign up
            </button>
        </>
    ) : (
        <div className="relative" id="dropdownContainer">
            <button
                onClick={toggleDropdown}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
            >
                {userInfo.fullName}{" "}
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Info
                            </a>
                        </li>
                        <li onClick={handleLogOut} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Sign out
                        </li>

                    </ul>
                </div>
            )}
        </div>
    );
    function loadHomePage() {
        nagivate("/")
    }
    return (
        <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
            <div className="flex items-center gap-4">
                <div onClick={loadHomePage} className="cursor-pointer text-2xl font-bold">UTEX</div>
                <button className="text-sm text-gray-600 hover:text-gray-900">Explore</button>
            </div>

            <div className="flex-1 max-w-3xl mx-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for anything"
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-gray-400"
                    />
                    <Search className="absolute right-4 top-2.5 text-gray-400 w-5 h-5" />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-sm text-gray-600 hover:text-gray-900 whitespace-nowrap">
                    Home
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                    <ShoppingCart className="w-5 h-5" />
                </button>
                {info_component}
                <button className="text-gray-600 hover:text-gray-900">
                    <Globe className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};

export default Header;
