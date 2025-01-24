 
import React, { useState, useRef, useEffect } from "react";
import * as Radio from "@radix-ui/react-radio-group";
import { OptionCard } from "./option-card";

interface SliderWithWeightRulerProps {
  lastValue: number;
  onValueChange: (value: number) => void;
}

export const SliderWithWeightRuler = ({ lastValue, onValueChange }: SliderWithWeightRulerProps) => {
  const [value, setValue] = useState(71); // Valor inicial como número (kg)
  const [unit, setUnit] = useState("kg"); // Unidade inicial
  const MAX = 300; // Valor máximo (kg)
  const MIN = 0; // Valor mínimo (kg)
  const STEP = 1;

  const rulerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startValue = useRef(value);

  // Função para lidar com o início do arrasto
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    startX.current = clientX;
    startValue.current = value;
    // Evitar seleção de texto durante o arrasto
    e.preventDefault();
  };

  // Função para lidar com o movimento do mouse durante o arrasto
  const handleMouseMove = (clientX: number) => {
    if (!isDragging.current) return;

    const deltaX = clientX - startX.current;

    const rulerWidth = rulerRef.current?.offsetWidth || 0;
    const totalSteps = MAX - MIN;
    const stepPerPixel = totalSteps / rulerWidth;

    let newValue = startValue.current + deltaX * stepPerPixel;
    newValue = Math.round(newValue / STEP) * STEP; // Ajustar para o STEP mais próximo

    // Garantir que o valor esteja dentro dos limites
    if (newValue < MIN) newValue = MIN;
    if (newValue > MAX) newValue = MAX;

    setValue(newValue);
    onValueChange(newValue); // Notificar o componente pai
  };

  // Função para lidar com o término do arrasto
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Adicionar event listeners para mouse e touch
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      handleMouseMove(clientX);
    };
    const handleUp = () => handleMouseUp();

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [value]);

  // Função para converter entre kg e lb
  const convertValue = (val: number, toUnit: "kg" | "lb"): number => {
    if (toUnit === "lb") {
      return parseFloat((val * 2.20462).toFixed(1)); // kg para lb
    } else {
      return parseFloat((val / 2.20462).toFixed(1)); // lb para kg
    }
  };

  // Função para renderizar os ticks com base no valor atual
  const renderTicks = () => {
    const ticks = [];
    const visibleRange = 10; // Quantos ticks mostrar de cada lado
    const start = Math.max(MIN, value - visibleRange);
    const end = Math.min(MAX, value + visibleRange);

    for (let i = start; i <= end; i += STEP) {
      const positionInCycle = (i - MIN) % 7;
      const isMajor = positionInCycle === 2 || positionInCycle === 6; // 3º e 7º ticks são maiores
      const isLabeled = isMajor; // Somente os ticks maiores recebem legenda

      // Calcula a posição relativa do tick em relação ao valor atual
      const relativePosition = (i - value) * 25; // Ajuste o multiplicador conforme necessário

      // DEFINE A COR DOS TICKS BASEADO NA POSIÇÃO RELATIVA AO OBJETIVO E ao lastValue
      let tickColor = "#DCF5FC"; // Cor padrão

      if (lastValue < value) { // Ganho de peso: colorir de verde da posição do lastValue até o objetivo
        if (i >= lastValue && i <= value) {
          tickColor = "#0fe082"; // Verde
        }
      } else if (lastValue > value) { // Perda de peso: colorir de vermelho da posição do lastValue até o objetivo
        if (i <= lastValue && i >= value) {
          tickColor = "#ff1d1d"; // Vermelho
        }
      }

      ticks.push(
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "3.16px",
            height: isMajor ? "87px" : "44px", // Traço grande ou pequeno
            borderRadius: "4px",
            backgroundColor: tickColor, // COR DOS TICKS
            position: "absolute",
            left: "50%",
            transform: `translateX(${relativePosition}px)`,
            transition: "transform 0.1s linear, background-color 0.3s",
          }}
        >
          {/* Linha do tick */}
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: tickColor, // COR DA LINHA
            }}
          ></div>
          {/* Legenda do tick */}
          {isLabeled && (
            <span
              style={{
                position: "absolute",
                bottom: "-48px", // Posição da legenda
                fontSize: "12px",
                color: "#D1D1D1",
              }}
            >
              {i} {unit}
            </span>
          )}
        </div>
      );
    }
    return ticks;
  };

  return (
    <div style={{ textAlign: "center", userSelect: "none", position: "relative" }}>
      {/* Seleção da unidade */}
      <Radio.Root
        value={unit}
        onValueChange={(val) => {
          setUnit(val as "kg" | "lb");

          // Ajustar o valor para a nova unidade
          setValue((prev) => {
            if (val === "lb") {
              const converted = Math.round(convertValue(prev, "lb"));
              onValueChange(converted);
              return converted;
            } else {
              const converted = Math.round(convertValue(prev, "kg"));
              onValueChange(converted);
              return converted;
            }
          });
        }}
        className="flex justify-center gap-4 items-center scale-75 mb-6"
      >
        <OptionCard option="kg" value="kg" selected={unit === "kg"} />
        <OptionCard option="lb" value="lb" selected={unit === "lb"} />
      </Radio.Root>

      {/* Exibição do valor atual */}
      <h3 className="text-4xl font-montserrat font-semibold text-black mb-8">
        {value}
        <span className="uppercase text-xl font-montserrat text-[#D1D1D1]">
          {unit}
        </span>
      </h3>

      {/* Ruler com ticks */}
      <div
        ref={rulerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        style={{
          position: "relative",
          width: "100%",
          height: "150px", // Ajuste conforme necessário
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          cursor: "grab",
          overflow: "hidden",
        }}
      >
        {/* Container dos ticks */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "max-content",
            transform: "translateX(0)", // Inicialmente centralizado
          }}
        >
          {renderTicks()}
        </div>

        {/* Tick central fixo */}
        <div
          style={{
            position: "absolute",
            top: "25px",
            left: "50%",
            transform: "translateX(-1.5px)", // Metade da largura do tick
            width: "5px",
            height: "100px",
            zIndex: 10,
          }}
          className="bg-gradient-to-b from-azul-start to-azul-end rounded-md w-1 shadow-sm shadow-azul-start"
        />
      </div>

      {/* Instrução para o usuário */}
      <p className="mt-10 text-[#03C5F090] font-montserrat font-semibold text-sm">
        Arraste para ajustar
      </p>
    </div>
  );
};
