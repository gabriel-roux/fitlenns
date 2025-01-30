"use client";

import ArrowBack from "@/assets/arrow-back.svg";
import FitLenns from "@/assets/fitlens-logo-letters.svg";
import { quiz } from "@/assets/quiz";
import { flowRules } from "@/assets/rules";
import { ProgressBar } from "@/components/ProgressBar";
import { GradientButton } from "@/components/button";
import { EvolutionGraph } from "@/components/evolution-graph";
import { ImageCard } from "@/components/image";
import { NutrientChart } from "@/components/nutrients-charts";
import { OptionCard } from "@/components/option-card";
import { SliderWithRuler } from "@/components/ruler";
import { CheckboxCard } from "@/components/select-card"; // Atualizado para CheckboxCard
import { VideoCard } from "@/components/video";
import { SliderWithWeightRuler } from "@/components/weight-ruler";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useState } from "react";

interface Answer {
	[key: string]: string[]; // Todas as respostas são arrays para suportar múltiplas seleções
}

export default function Quiz() {
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState(0);
	const [answers, setAnswers] = useState<Answer>({});
	const [history, setHistory] = useState<number[]>([]); // Histórico de passos
	const totalSteps = quiz.length;
	const currentQuiz = quiz[currentStep];

	// Dentro do componente Quiz
	const determineNextStep = useCallback(
		(value?: string) => {
			if (currentQuiz.title && flowRules[currentQuiz.title]) {
				if (value) {
					const mappedNextStep = flowRules[currentQuiz.title][value];
					if (mappedNextStep !== undefined) {
						return mappedNextStep;
					}
				} else {
					const userAnswer = answers[currentQuiz.title]?.[0];
					if (
						userAnswer &&
						flowRules[currentQuiz.title][userAnswer] !== undefined
					) {
						return flowRules[currentQuiz.title][userAnswer];
					}
				}
			}
			return currentStep + 1;
		},
		[currentStep, currentQuiz.title, answers],
	);

	// Função para avançar para a próxima etapa com lógica de fluxo
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
						"Por favor, selecione pelo menos uma opção antes de continuar.",
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
			const nextStep = determineNextStep();

			// Atualizar o histórico de forma funcional para evitar bugs
			setHistory((prevHistory) => [...prevHistory, currentStep]);

			setCurrentStep(nextStep);
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
		determineNextStep,
		router,
	]);

	// Função para lidar com mudanças em opções de radio
	const handleOptionChange = (value: string) => {
		setAnswers((prevAnswers) => ({
			...prevAnswers,
			[String(currentQuiz.title)]: [value],
		}));

		// Determinar o próximo passo com base no valor selecionado
		const nextStep = determineNextStep(value);

		// Atualizar o histórico de forma funcional para evitar bugs
		setHistory((prevHistory) => [...prevHistory, currentStep]);

		setTimeout(() => {
			setCurrentStep(nextStep);
		}, 200);
	};

	// Função para lidar com mudanças em opções de checkbox
	const handleCheckboxChange = (value: string, checked: boolean) => {
		const title = currentQuiz.title;
		setAnswers((prevAnswers) => {
			const currentAnswers = prevAnswers[title!] || [];
			if (checked) {
				return {
					...prevAnswers,
					[title!]: [...currentAnswers, value],
				};
			}
			return {
				...prevAnswers,
				[title!]: currentAnswers.filter((item) => item !== value),
			};
		});
	};

	// Função para avançar manualmente (botão "Próximo")
	const handleManualNext = () => {
		handleNext();
	};

	// Função para voltar ao passo anterior
	const handleBack = () => {
		if (history.length > 0) {
			const previousStep = history[history.length - 1];
			setHistory((prevHistory) => prevHistory.slice(0, -1));
			setCurrentStep(previousStep);
		}
	};

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
		<div className="">
			{/* Texto de Progresso */}
			<div className="w-full flex justify-start  max-w-[595px] mx-auto py-4 px-4">
				<button
					type="button"
					className={`flex items-center gap-1 text-base md:text-lg font-semibold text-secondary font-montserrat ${
						history.length === 0
							? "opacity-50 cursor-not-allowed"
							: "hover:opacity-80"
					}`}
					onClick={handleBack}
					disabled={history.length === 0}
				>
					<Image
						src={ArrowBack}
						alt="Voltar"
						className="w-[24px] h-[24px] md:w-[40px] md:h-[40px]"
					/>
				</button>
				{/* Barra de Progresso */}
				{!currentQuiz.startQuiz &&
					!currentQuiz.loadQuiz &&
					currentQuiz.title !== "startQuiz" &&
					currentQuiz.title !== "loadQuiz" && (
						<ProgressBar
							currentStep={currentStep - 2}
							totalSteps={totalSteps - 2}
						/>
					)}
			</div>

			<div className="flex flex-col items-center justify-center gap-6 max-w-[595px] mx-auto py-4 px-4">
				<Image src={FitLenns} alt="FitLenns" className="w-32 h-16" />
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
								{currentQuiz.startQuiz ? (
									<VideoCard
										background={currentQuiz.video.src}
										startQuiz={true}
									/>
								) : (
									<VideoCard background={currentQuiz.video.src} />
								)}
							</div>
						)}
						{currentQuiz.question && (
							<p className="text-sm md:text-lg font-montserrat font-medium mb-4">
								{currentQuiz.question}
							</p>
						)}

						{currentQuiz.useRuler && <SliderWithRuler />}

						{currentQuiz.useWeightRuler && (
							<SliderWithWeightRuler
								lastValue={Number(answers[quiz[currentStep - 1].title!])}
								onValueChange={(value) => {
									setAnswers((prevAnswers) => ({
										...prevAnswers,
										[currentQuiz.title!]: value as unknown as string[],
									}));
								}}
							/>
						)}

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
									),
								)}
							</RadioGroup.Root>
						)}
					</motion.div>
				</AnimatePresence>
			</div>

			{currentQuiz.isConfiraBg && (
				<motion.div
					key={currentStep}
					variants={variants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.5 }}
				>
					<NutrientChart />
				</motion.div>
			)}

			{currentQuiz.isChartBg && (
				<motion.div
					key={currentStep}
					variants={variants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					<EvolutionGraph />
				</motion.div>
			)}

			{/* Botão Próximo Condicional */}
			<div className="w-full max-w-[595px] mx-auto py-4 px-4">
				{shouldShowButton && (
					<GradientButton id={currentQuiz.title} onClick={handleManualNext}>
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
