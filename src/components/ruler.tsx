import * as Radio from "@radix-ui/react-radio-group";
import { useEffect, useRef, useState } from "react";
import { OptionCard } from "./option-card";

export const SliderWithRuler = () => {
  const [value, setValue] = useState(164);
  const [unit, setUnit] = useState("cm");
  const MAX = 300;
  const MIN = 1;
  const STEP = 1;

  const rulerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startValue = useRef(value);

  const damping = 0.15;

  const handleMouseDown = (e: any) => {
    isDragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX);
    startValue.current = value;
    e.preventDefault();
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging.current) return;

    const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
    const deltaX = startX.current - clientX;

    const rulerWidth = rulerRef?.current?.offsetWidth || 0;
    const totalSteps = MAX - MIN;
    const stepPerPixel = totalSteps / rulerWidth;

    const smoothDelta = deltaX * damping;
    let newValue = startValue.current + smoothDelta * stepPerPixel;
    newValue = Math.round(newValue / STEP) * STEP;

    if (newValue < MIN) newValue = MIN;
    if (newValue > MAX) newValue = MAX;

    window.requestAnimationFrame(() => {
      setValue(newValue);
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

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

  const renderTicks = () => {
    const ticks = [];
    const visibleRange = 10;
    const start = value - visibleRange;
    const end = value + visibleRange;

    for (let i = start; i <= end; i += STEP) {
      const positionInCycle = (i - MIN) % 7;
      const isMajor = positionInCycle === 2 || positionInCycle === 6;
      const isLabeled = isMajor;

      const relativePosition = (i - value) * 25;

      ticks.push(
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "3.16px",
            height: isMajor ? "87px" : "44px",
            borderRadius: "4px",
            backgroundColor: "#DCF5FC",
            position: "absolute",
            left: "50%",
            transform: `translateX(${relativePosition}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#DCF5FC",
            }}
          />
          {isLabeled && (
            <span
              style={{
                position: "absolute",
                bottom: "-48px",
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
      <Radio.Root
        value={unit}
        onValueChange={(val) => {
          setUnit(val);

          setValue((prev) => {
            if (val === "cm") {
              return Math.round((prev - 22) * 2.54);
            }
            return Math.round(prev / 2.54) + 22;
          });
        }}
        className="flex justify-center gap-4 items-center scale-75 mb-6"
      >
        <OptionCard option="cm" value="cm" selected={unit === "cm"} />
        <OptionCard option="pol" value="pol" selected={unit === "pol"} />
      </Radio.Root>

      <h3 className="text-4xl font-montserrat font-semibold text-black mb-8">
        <span
          style={{
            transition: "all 0.2s ease-out", // Suaviza a transição do valor
          }}
        >
          {value}
        </span>
        <span className="uppercase text-xl font-montserrat text-[#D1D1D1]">
          {unit}
        </span>
      </h3>

      <div
        ref={rulerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        style={{
          position: "relative",
          width: "100%",
          height: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          cursor: "grab",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "max-content",
            transform: "translateX(0)",
          }}
        >
          {renderTicks()}
        </div>

        <div
          style={{
            position: "absolute",
            top: "25px",
            left: "50%",
            transform: "translateX(-1.5px)",
            width: "3px",
            height: "100px",
            zIndex: 10,
          }}
          className="bg-gradient-to-b from-azul-start to-azul-end rounded-md w-1 shadow-sm shadow-azul-start"
        />
      </div>

      <p className="mt-10 text-[#03C5F090] font-montserrat font-semibold text-sm">
        Arraste para ajustar
      </p>
    </div>
  );
};