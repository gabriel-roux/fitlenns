export const flowRules: Record<string, Record<string, number>> = {
  "Alguma condição médica?": {
    'yes-4': 12, // Atualizado para a próxima pergunta após "Sim"
    'no-4': 13,  // Atualizado para a próxima pergunta após "Não"
  },
  "Alguma alergia alimentar?": {
    'yes-3': 10, // Atualizado para a próxima pergunta após "Sim"
    'no-3': 11,  // Atualizado para a próxima pergunta após "Não"
  }
};