/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import * as Radio from "@radix-ui/react-radio-group";
import { OptionCard } from "./option-card";

export const SliderWithWeightRuler = () => {
  const [value, setValue] = useState(71); // Valor inicial como número (kg)
  const [unit, setUnit] = useState("kg"); // Unidade inicial
  const MAX = 164; // Valor máximo (kg)
  const MIN = 55; // Valor mínimo (kg)
  const STEP = 1;

  const rulerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startValue = useRef(value);

  // Função para lidar com o início do arrasto
  const handleMouseDown = (e: any) => {
    isDragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX);
    startValue.current = value;
    // Evitar seleção de texto durante o arrasto
    e.preventDefault();
  };

  // Função para lidar com o movimento do mouse durante o arrasto
  const handleMouseMove = (e: any) => {
    if (!isDragging.current) return;

    const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
    const deltaX = clientX - startX.current;

    const rulerWidth = rulerRef?.current?.offsetWidth || 0;
    const totalSteps = MAX - MIN;
    const stepPerPixel = totalSteps / rulerWidth;

    let newValue = startValue.current + deltaX * stepPerPixel;
    newValue = Math.round(newValue / STEP) * STEP; // Ajustar para o STEP mais próximo

    // Garantir que o valor esteja dentro dos limites
    if (newValue < MIN) newValue = MIN;
    if (newValue > MAX) newValue = MAX;

    setValue(newValue);
  };

  // Função para lidar com o término do arrasto
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Adicionar event listeners para mouse e touch
  useEffect(() => {
    const handleMove = (e: any) => handleMouseMove(e);
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
  const convertValue = (val: number, toUnit: string): number => {
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
            backgroundColor: "#DCF5FC",
            position: "absolute",
            left: "50%",
            transform: `translateX(${relativePosition}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          {/* Linha do tick */}
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#DCF5FC",
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
    <div style={{ textAlign: "center", userSelect: "none" }}>
      {/* Seleção da unidade */}
      <Radio.Root
        value={unit}
        onValueChange={(val) => {
          setUnit(val);

          // Ajustar o valor para a nova unidade
          setValue((prev) => {
            if (val === "lb") {
              return Math.round(convertValue(prev, "lb"));
            } else {
              return Math.round(convertValue(prev, "kg"));
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
            width: "3px",
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
