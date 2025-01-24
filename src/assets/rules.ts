// flowRules.ts
export const flowRules: Record<string, Record<string, number>> = {
  "Alguma condição médica?": {
    'yes-4': 15,
    'no-4': 16,
  },
  "Alguma alergia alimentar?": {
    'yes-3': 13, // Índice da próxima pergunta
    'no-3': 14, // Pula "Selecione suas condições médicas"
  },
};
