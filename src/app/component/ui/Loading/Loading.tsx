import React from 'react';

const LoadingScreen = () => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin h-8 w-8 text-indigo-600 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l1.408-1.408A5.978 5.978 0 016 12H2c0 1.657.671 3.157 1.757 4.243L6 17.29z"
          ></path>
        </svg>
        <p className="text-lg text-indigo-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
