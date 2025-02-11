"use client";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

interface CheckboxCardProps {
  option: string;
  value: string;
  onChange?: (value: string, checked: boolean) => void;
  selected?: boolean;
}

export function CheckboxCard({
  selected = false,
  value,
  option,
  onChange,
}: CheckboxCardProps) {
  const checkboxRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = (e: React.MouseEvent) => {
    // Prevenir toggle duplo se o clique foi no próprio checkbox
    if (checkboxRef.current?.contains(e.target as Node)) return;
    onChange?.(value, !selected);
  };

  return (
    <button
      id={value}
      type="button"
      className="relative p-[2px] rounded-lg w-full"
      onClick={handleButtonClick}
    >
      {/* Camada de borda gradient */}
      <div
        className={`
          absolute inset-0 rounded-lg bg-gradient-to-b from-azul-start to-azul-end transition-all duration-300
          ${selected ? "opacity-100" : "opacity-20"}
          pointer-events-none
        `}
      />

      {/* Conteúdo interno */}
      <div
        className={`
          relative 
          ${selected ? "bg-white/90" : "bg-white"} 
          rounded-lg 
          p-4 
          flex 
          items-center 
          gap-4 
          border-2 
          border-transparent
          transition-all duration-300
        `}
      >
        <Checkbox.Root
          ref={checkboxRef}
          id={value}
          checked={selected}
          onCheckedChange={(checked) => onChange?.(value, checked as boolean)}
          className={`
            relative
            w-5 h-5 sm:w-6 sm:h-6
            cursor-pointer
            rounded-md
            bg-gradient-to-r from-azul-start to-azul-end 
            p-[1px]
            flex
            flex-shrink-0
            items-center
            justify-center
            border-2 border-transparent 
            hover:bg-azul-start/20
            transition-all duration-300
          `}
        >
          {/* Camada interna para simular o fundo branco */}
          <div className="w-full h-full bg-white rounded-sm flex items-center justify-center">
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="
                    w-3 h-3 sm:w-4 sm:h-4
                    bg-gradient-to-b from-azul-start to-azul-end
                    flex items-center justify-center
                  "
                >
                  <CheckIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Checkbox.Root>
        <p
          className={`
            text-base sm:text-lg lg:text-xl
            font-montserrat font-semibold 
            leading-6 sm:leading-8
            ${
              selected
                ? "bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent"
                : "text-secondary"
            }
          `}
        >
          {option}
        </p>
      </div>
    </button>
  );
}