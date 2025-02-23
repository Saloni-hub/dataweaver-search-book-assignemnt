"use client";

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`
      bg-white dark:bg-gray-800 
      rounded-xl shadow-lg 
      p-6 
      transition-all duration-200 
      hover:shadow-xl
      dark:border dark:border-gray-700
      ${className}
    `}>
      {children}
    </div>
  );
}