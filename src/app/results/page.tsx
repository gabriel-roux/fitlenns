"use client";

import FitLenns from "@/assets/fitlens-logo.svg";
import Frigideira from "@/assets/frigideira.gif";
import Video1 from "@/assets/videos/video1.gif";
import { GradientButton } from "@/components/button";
import { Card } from "@/components/card";
import { VideoCard } from "@/components/video";
import { items } from "@/utils/animated-list-items";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function ResultPage() {
  const [gotoPitch, setGotoPitch] = useState(false);
  const [gotoCheckout, setGotoCheckout] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 1500); 
  
      return () => clearInterval(interval);
    }, [items.length]);

  useEffect(() => {
    setTimeout(() => {
      const quizAnswers = localStorage.getItem("quizAnswers")
        ? JSON.parse(localStorage.getItem("quizAnswers")!)
        : null;

      if (!quizAnswers) {
        router.push("/");
      }

      setGotoPitch(true);
    }, 6000);
  }, []);

  // Definição das variantes de animação
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="max-w-[595px] mx-auto py-4 px-4">
      {gotoPitch && (
        <div className="w-full h-4 rounded-full bg-[#03C5F010] relative">
          <div className="w-full h-full rounded-full bg-azulGradient transition-all duration-300" />
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-6 mt-3">
        <Image
          src={FitLenns}
          alt="FitLenns"
          width={72}
          height={72}
          className="w-[72px] h-[72px]"
        />
      </div>

      {!gotoPitch ? (
        <div className="flex flex-col items-center justify-center gap-6 mt-16">
          <Image
            src={Frigideira}
            alt="Frigideira"
            className="w-[120px] h-[150px]"
          />

          <h1 className="text-[22px] font-montserrat font-semibold text-[#DDE0E7] text-center">
            Processando seus resultados...
          </h1>

          <div className="flex flex-col items-center justify-center gap-4 list-none">
            <AnimatePresence mode="wait">
              <motion.li
                key={items[currentIndex]}
                className="flex items-center gap-2 text-secondary text-lg"
                initial={{ opacity: 0 }}    
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                  <ClipLoader
                    color="#27CDC0"
                    size={18} 
                    aria-label="Carregando..."
                    data-testid="loader"
                  />
                {items[currentIndex]}
              </motion.li>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full min-h-[100px]">
          {/* Conteúdo Dinâmico com Animação */}
          <AnimatePresence mode="wait" initial={false}>
            {!gotoCheckout ? (
              <motion.div
                className="flex flex-col items-center gap-4 w-full"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                {/* Título */}
                <h1 className="text-2xl text-[28px] font-semibold text-center font-montserrat">
                  <span className="bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold">
                    Parabéns!
                  </span>{" "}
                  Seu plano alimentar personalizado está pronto!
                </h1>
                {/* Descrição */}
                <p className="text-xl text-center font-light font-montserrat">
                  Com o Fit Lens, você pode acompanhar suas refeições e receber
                  um plano de dieta personalizado adaptado à sua rotina. Deixe o
                  resto com a gente!
                </p>

                <div className="flex flex-col items-center gap-4 w-full">
                  <Card
                    title="O que você faz:"
                    values={[
                      "📸 Digitalize suas refeições com uma única foto.",
                      "📊 Acompanhe calorias e nutrientes instantaneamente.",
                      "📅 Monitore seus hábitos alimentares diários com facilidade.",
                    ]}
                  />
                  <Card
                    title="O que fazemos por você:"
                    values={[
                      "👩‍⚕️ Um nutricionista virtual no seu bolso.",
                      "📈 Atualizações diárias de dieta alimentadas por IA.",
                      "🚀 Acelere e otimize o seu progresso.",
                    ]}
                    transparentBackground
                  />
                </div>

                <div className="mt-4 w-full">
                  <GradientButton
                    id='final-1'
                    onClick={() => {
                      setGotoCheckout(true);
                    }}
                  >
                    Começar Agora
                  </GradientButton>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col items-center gap-4 w-full"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                {/* Título */}
                <h1 className="text-2xl text-[28px] font-semibold text-center font-montserrat">
                  Queremos que você experimente o FitLens{" "}
                  <span className="bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold">
                    gratuitamente!
                  </span>
                </h1>

                <VideoCard background={Video1.src} />

                <p className="text-2xl text-center font-light font-montserrat">
                  ✅ Nenhum pagamento necessário agora
                </p>

                <div className="mt-4 w-full">
                  <GradientButton
                    id="final-2"
                    onClick={() => {
                      window.location.href = "https://pay.venuzpay.com/checkout/cm6imxyvy006kda6wf9il7not?offer=V5IFTDM"
                    }}
                  >Teste Grátis</GradientButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
