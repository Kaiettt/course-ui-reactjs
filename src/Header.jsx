import React, { useState } from 'react';
import { Search, ShoppingCart, Globe } from 'lucide-react';

const Header = () => {
    const [isLogin, setLogin] = useState(true);
    const info_component = !isLogin ? (
        <>
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                Log in
            </button>
            <button className="px-4 py-2 text-sm text-white bg-blue-500 bg-blue-500 rounded">
                Sign up
            </button></>
    ) : (<div className="bg-blue-500 text-white px-4 py-2 rounded-2xl text-l font-semibold">
        ANH KIET
    </div>)


    return (
        <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
            <div className="flex items-center gap-4">
                <div className="text-2xl font-bold">
                    UTEX
                </div>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                    Explore
                </button>
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