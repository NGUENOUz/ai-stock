"use client"
import React from 'react';
import { cn } from '@/lib/utils'; // Assurez-vous que le chemin est correct

interface SpinnerLoaderProps {
  className?: string;
}

export const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        className
      )}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};