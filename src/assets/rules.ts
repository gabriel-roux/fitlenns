// flowRules.ts
export const flowRules: Record<string, Record<string, number>> = {
  "Alguma condição médica?": {
    yes: 15,
    no: 16,
  },
  "Alguma alergia alimentar?": {
    yes: 13, // Índice da próxima pergunta
    no: 14, // Pula "Selecione suas condições médicas"
  },
};
