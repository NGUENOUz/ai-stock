"use cleint"
import { SpinnerLoader } from '@/components/loader';
import React from 'react';


export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-950 text-white"> {/* Ajuste le min-height selon ton header/footer */}
      <div className="flex flex-col items-center gap-4">
        <SpinnerLoader className="w-12 h-12 text-blue-500" />
        <p className="text-lg">Chargement de la page...</p>
      </div>
    </div>
  );
}