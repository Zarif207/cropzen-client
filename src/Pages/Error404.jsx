import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

const Error404 = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4">
            <div className="max-w-4xl w-full text-center">
                {/* Animated 404 with Farm Elements */}
                <div className="relative mb-8">
                    <h1 className="text-[150px] md:text-[200px] font-bold text-green-800/20 leading-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl md:text-8xl animate-bounce">
                            🌾
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-3xl md:text-5xl font-bold text-green-800 mb-2">
                    Oops! Field Not Found
                </h2>
                <p className="text-2xl md:text-3xl font-bold text-green-600 mb-4">
                    404
                </p>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Looks like this crop hasn't been planted yet. The page you're looking for seems to have been harvested or never existed.
                </p>

                {/* Decorative Farm Icons */}
                <div className="flex justify-center gap-6 mb-12 text-5xl">
                    <span className="animate-pulse">🥕</span>
                    <span className="animate-pulse delay-100">🌽</span>
                    <span className="animate-pulse delay-200">🍅</span>
                    <span className="animate-pulse delay-300">🥔</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="group flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <Home size={20} />
                        <span>Back to Farm</span>
                    </button>
                    
                    <button className="group flex items-center gap-2 bg-white hover:bg-gray-50 text-green-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-600 transform hover:-translate-y-1">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                        <span>Go Back</span>
                    </button>
                </div>

                {/* Decorative Bottom Elements */}
                <div className="mt-16 flex justify-center gap-8 text-gray-400">
                    <div className="text-center">
                        <div className="text-3xl mb-2">🌱</div>
                        <p className="text-sm">Fresh Crops</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl mb-2">👨‍🌾</div>
                        <p className="text-sm">Local Farmers</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl mb-2">🚜</div>
                        <p className="text-sm">Farm Direct</p>
                    </div>
                </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute top-10 left-10 text-6xl opacity-20 animate-pulse">
                🌻
            </div>
            <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-pulse delay-500">
                🍃
            </div>
            <div className="absolute top-1/3 right-20 text-4xl opacity-20 animate-bounce">
                🦋
            </div>
        </div>
    );
};

export default Error404;