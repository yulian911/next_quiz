'use client';
import useQuizStore from '@/app/store';
import React from 'react';

const Button = () => {
  const addStatus = useQuizStore((state: any) => state.addStatus);

  return (
    <button
      type="button"
      onClick={() => addStatus('start')}
      className="w-1/2 p-5 m-auto text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
      Start Quiz Now
    </button>
  );
};

export default Button;
