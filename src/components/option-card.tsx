import * as RadioGroup from "@radix-ui/react-radio-group";
import { useRef } from "react";

interface OptionCardProps {
  option: string;
  value: string;
  selected?: boolean;
}

export function OptionCard({
  selected,
  value,
  option,
}: OptionCardProps) {
  const radioItemRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = () => {
    radioItemRef.current?.click();
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
          ${selected ? " bg-white/90" : "bg-white"} 
          rounded-lg 
          p-4 
          flex 
          items-center 
          gap-4 
          border-2 
          border-transparent
          transition-all duration-300
        `}
        id={value}
      >
        <RadioGroup.Item
          ref={radioItemRef}
          value={value}
          id={value}
          className={`
            relative
            w-5 h-5 sm:w-6 sm:h-6
            cursor-pointer
            rounded-full
            bg-gradient-to-r from-azul-start to-azul-end 
            p-[1px]
            flex
            items-center
            justify-center
            flex-shrink-0
            border-2 border-transparent 
            hover:bg-azul-start/20
            transition-all duration-300
          `}
        >
          {/* Camada interna para simular o fundo branco */}
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <RadioGroup.Indicator
              className={`
                w-2.5 h-2.5 sm:w-3 sm:h-3
                rounded-full
                bg-gradient-to-b from-azul-start to-azul-end
              `}
            />
          </div>
        </RadioGroup.Item>
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