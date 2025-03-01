const LoadingResources = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="relative">
                <span className="absolute inset-0 animate-ping rounded-full bg-blue-500 opacity-75 w-20 h-20"></span>
                <span className="relative flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full text-2xl font-bold">
                    ⏳
                </span>
            </div>
            <p className="text-3xl font-extrabold mt-4 tracking-widest animate-pulse">
                LOADING RESOURCES...
            </p>
        </div>
    );
};

export default LoadingResources;
