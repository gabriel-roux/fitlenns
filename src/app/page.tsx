"use client";

import { Fragment, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { quiz } from "@/assets/quiz";
import FitLenns from "@/assets/fitlens-logo.svg";
import { OptionCard } from "@/components/option-card";
import { CheckboxCard } from "@/components/select-card"; // Atualizado para CheckboxCard
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBack from "@/assets/arrow-back.svg";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { GradientButton } from "@/components/button";
import { SliderWithRuler } from "@/components/ruler";
import { SliderWithWeightRuler } from "@/components/weight-ruler";
import { ImageCard } from "@/components/image";
import { VideoCard } from "@/components/video";

interface Answer {
  [key: string]: string[]; // Todas as respostas são arrays para suportar múltiplas seleções
}

export default function Quiz() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer>({});
  const totalSteps = quiz.length;
  const currentQuiz = quiz[currentStep];

  // Função para avançar para a próxima etapa com debounce de 500ms
  const handleNext = useCallback(() => {
    // Validação: Verifica se pelo menos uma opção foi selecionada
    if (currentQuiz.title) {
      if (currentQuiz.select) {
        // Múltiplas seleções
        if (
          !answers[currentQuiz.title] ||
          answers[currentQuiz.title].length === 0
        ) {
          alert(
            "Por favor, selecione pelo menos uma opção antes de continuar."
          );
          return;
        }
      } else if (currentQuiz.options) {
        // Seleção única
        if (
          !answers[currentQuiz.title] ||
          answers[currentQuiz.title].length === 0
        ) {
          alert("Por favor, selecione uma opção antes de continuar.");
          return;
        }
      }
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finalizar o quiz e navegar para a página de resultados
      localStorage.setItem("quizAnswers", JSON.stringify(answers));
      router.push("/results");
    }
  }, [
    currentStep,
    totalSteps,
    answers,
    currentQuiz.title,
    currentQuiz.select,
    currentQuiz.options,
    router,
  ]);

  const handleOptionChange = (value: string) => {
    setAnswers({
      ...answers,
      [String(currentQuiz.title)]: [value],
    });

    // Se 'options' existir, avançar automaticamente após 500ms
    if (currentQuiz.options) {
      setTimeout(() => {
        if (value !== "others") setCurrentStep(currentStep + 1);
      }, 200);
    }
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const title = currentQuiz.title;
    const currentAnswers = answers[title!] || [];

    if (checked) {
      setAnswers({
        ...answers,
        [title!]: [...currentAnswers, value],
      });
    } else {
      setAnswers({
        ...answers,
        [title!]: currentAnswers.filter((item) => item !== value),
      });
    }
  };

  const handleManualNext = () => {
    handleNext();
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  // Definição das variantes de animação
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // Determinar se o GradientButton deve ser exibido
  const shouldShowButton =
    currentQuiz.select || (!currentQuiz.select && !currentQuiz.options);

  return (
    <div className="max-w-[595px] mx-auto py-4 px-4">
      {/* Barra de Progresso */}
      <div className="w-full h-4 rounded-full bg-[#03C5F010] relative">
        <div
          className="h-full rounded-full bg-azulGradient transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {/* Texto de Progresso */}
      <div className="w-full flex justify-start mt-2">
        <button
          className={`flex items-center gap-1 text-base md:text-lg font-semibold text-secondary font-montserrat ${
            currentStep === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-80"
          }`}
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <Image
            src={ArrowBack}
            alt="Voltar"
            width={24}
            height={24}
            className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]"
          />
          Voltar
        </button>
      </div>
  
      <div className="flex flex-col items-center justify-center gap-6 mt-3">
        <Image
          src={FitLenns}
          alt="FitLenns"
          width={72}
          height={72}
          className="w-[56px] h-[56px] md:w-[72px] md:h-[72px]"
        />
        <div className="flex flex-col items-center gap-4 w-full min-h-[100px]">
          {/* Conteúdo Dinâmico com Animação */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              className="flex flex-col items-center gap-4 w-full"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              {/* Título */}
              <h1 className="text-xl md:text-2xl lg:text-[28px] font-semibold text-center font-montserrat">
                {currentQuiz.title}
              </h1>
              {/* Descrição */}
              {currentQuiz.description && (
                <p
                  className="text-sm md:text-base lg:text-xl text-center font-light font-montserrat"
                  dangerouslySetInnerHTML={{ __html: currentQuiz.description }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
  
        {/* Pergunta e Opções com Animação */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            className="w-full"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            {currentQuiz.image && (
              <div className="w-full flex justify-center">
                {currentQuiz.isFeedback ? (
                  <Image
                    src={currentQuiz.image.src}
                    alt="Feedback"
                    width={615}
                    height={540}
                    quality={100}
                    className="w-full max-h-[360px] md:max-h-[480px] mb-8"
                  />
                ) : (
                  <ImageCard background={currentQuiz.image.src} />
                )}
              </div>
            )}
  
            {currentQuiz.video && (
              <div className="w-full flex justify-center">
                <VideoCard background={currentQuiz.video.src} />
              </div>
            )}
            <p className="text-sm md:text-lg font-montserrat font-medium mb-4">
              {currentQuiz.question}
            </p>
  
            {currentQuiz.useRuler && <SliderWithRuler />}
  
            {currentQuiz.useWeightRuler && <SliderWithWeightRuler />}
  
            {/* Opções de Checkbox */}
            {currentQuiz.select && (
              <div
                className={`flex mb-4
                ${
                  currentQuiz.isGrid
                    ? "grid grid-cols-2 gap-4"
                    : "flex-col gap-4"
                }
              `}
              >
                {currentQuiz.select.map((option) => (
                  <CheckboxCard
                    key={option.value}
                    value={option.value}
                    option={option.label}
                    selected={
                      Array.isArray(answers[currentQuiz.title!])
                        ? answers[currentQuiz.title!].includes(option.value)
                        : false
                    }
                    onChange={handleCheckboxChange}
                  />
                ))}
              </div>
            )}
  
            {/* Opções de Radio */}
            {currentQuiz.options && (
              <RadioGroup.Root
                value={answers[currentQuiz.title!]?.[0] || ""}
                onValueChange={handleOptionChange}
                className={`flex ${
                  currentQuiz.isGrid && !currentQuiz.select
                    ? "grid grid-cols-2 gap-4"
                    : "flex-col gap-4"
                }`}
              >
                {currentQuiz.options.map(
                  (option: { value: string; label: string }) => (
                    <Fragment key={option.value}>
                      <OptionCard
                        value={option.value}
                        option={option.label}
                        selected={
                          answers[currentQuiz.title!]
                            ? answers[currentQuiz.title!][0] === option.value
                            : false
                        }
                      />
                    </Fragment>
                  )
                )}
              </RadioGroup.Root>
            )}
          </motion.div>
        </AnimatePresence>
  
        {/* Botão Próximo Condicional */}
        {shouldShowButton && (
          <GradientButton onClick={handleManualNext}>
            {currentStep < totalSteps - 1
              ? currentQuiz.startQuiz
                ? "Ir para o Quizz"
                : "Continuar"
              : "Finalizar"}
          </GradientButton>
        )}
      </div>
    </div>
  );
}
