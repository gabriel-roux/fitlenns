// components/GradientButton.tsx

"use client";

import React, { ButtonHTMLAttributes } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function GradientButton({ children, className, ...props }: GradientButtonProps) {
  return (
    <div className="w-full relative inline-block p-0.5 rounded-md group">
      {/* Camada de borda com gradiente azul */}
      <div
        className="w-full
          absolute inset-0 rounded-md bg-gradient-to-r from-azul-start to-azul-end
          opacity-70
          transition-opacity duration-300
          group-hover:opacity-100
          group-focus-within:opacity-100
          pointer-events-none
        "
      ></div>

      {/* Conteúdo do botão */}
      <button
        className={`
          relative z-10 px-6 w-full py-3 bg-white hover:bg-opacity-0 hover:text-white border border-transparent rounded-md
          text-azul-start font-semibold text-center
          focus:outline-none focus:ring-0
          transition-all duration-300
          ${className || ""}
        `}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
