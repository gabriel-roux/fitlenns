"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons"; // Importação opcional para ícone de check
import { motion, AnimatePresence } from "framer-motion";

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
  return (
    <div className="relative p-[2px] rounded-lg">
      {/* Camada de borda gradient */}
      <div
        className={`
          absolute inset-0 rounded-lg bg-gradient-to-b from-azul-start to-azul-end transition-all duration-300
          ${selected ? "opacity-100" : "opacity-20"}
          pointer-events-none
        `}
      ></div>

      {/* Conteúdo interno */}
      <div
        className={`
          relative 
          ${selected ? "bg-white/90" : "bg-white"} 
          rounded-md 
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
          id={value}
          checked={selected}
          onCheckedChange={(checked) => {
            if (onChange) {
              onChange(value, checked as boolean);
            }
          }}
          className="
            relative
            w-6 h-6
            cursor-pointer
            rounded-md
            bg-gradient-to-r from-azul-start to-azul-end 
            p-[1px]
            flex
            items-center
            flex-shrink-0
            justify-center
            border-2 border-transparent 
            hover:bg-azul-start/20
            transition-all duration-300
          "
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
                    size-full
                    bg-gradient-to-b from-azul-start to-azul-end
                    flex items-center justify-center
                  "
                >
                  <CheckIcon className="w-8 h-8 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Checkbox.Root>
        <label
          htmlFor={value}
          className={`text-lg font-montserrat font-semibold leading-8 ${
            selected
              ? "bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent"
              : "text-secondary"
          }`}
        >
          {option}
        </label>
      </div>
    </div>
  );
}
