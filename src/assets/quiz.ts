export const quiz = [
  {
    title: "Qual é o seu objetivo hoje?",
    description:
      "Queremos ajudá-lo a <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>alcançar seus objetivos</span> de forma eficiente.",
    question: "Escolha a opção que melhor se adapta a você:",
    options: [
      {
        label:
          "Quero calcular minhas calorias para ganhar peso de maneira saudável e estratégica.",
        value: "gain-weight",
      },
      {
        label:
          "Quero calcular minhas calorias para perder peso e alcançar o corpo que desejo.",
        value: "lose-weight",
      },
      {
        label:
          "Quero calcular minhas calorias para manter a consistência e progredir na academia.",
        value: "maintain-weight",
      },
      {
        label:
          "Só quero saber quantas calorias consumo por refeição, sem complicações.",
        value: "improve-health",
      },
    ],
  },
  {
    title: "Sua dieta, organizada e eficiente, sem esforço",
    description:
      "Ótimo! Para deixar sua experiencia com o <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>FitLens</span> ainda mais unica, precisamos entender mais sobre sua rotina.",
    question: "Selecione a opção que melhor descreve sua rotina diária:",
    options: [
      {
        label: "Tenho horários fixos para as refeições todos os dias.",
        value: "fixed-schedule",
      },
      {
        label: "Costumo comer em horários similares todos os dias.",
        value: "similar-schedule",
      },
      {
        label: "Como sempre que tenho oportunidade.",
        value: "opportunity-schedule",
      },
      {
        label: "Não sigo nenhum horário específico para as refeições.",
        value: "no-schedule",
      },
    ],
  },
  {
    title: "Seu tipo de dieta",
    description:
      "Seu gênero nos ajuda a determinar sua <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>ingestão calórica</span> e peso ideal.",
    question: "Selecione uma opção abaixo:",
    options: [
      {
        label: "💪️ Dieta para homem",
        value: "men-diet",
      },
      {
        label: "👗 Dieta para mulher",
        value: "girl-diet",
      },
    ],
  },
  {
    title:
      "Você já consultou um nutricionista para criar seu plano alimentar antes?",
    description:
      "Muitas pessoas gastam milhares de dólares com profissionais que <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>não conseguem ajudá-las</span> a perder peso.",
    question: "Selecione uma opção abaixo:",
    options: [
      {
        label: "👍 Sim",
        value: "yes",
      },
      {
        label: "👎 Não",
        value: "no",
      },
    ],
  },
  {
    title: "A melhor parte?",
    description:
      "Alem de custar <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>95% a menos</span> do que um nutricionista, foi comprovado que o <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>FitLens é 90 vezes mais preciso</span> na análise, personalização e acompanhamento da sua dieta.",
  },
  {
    title: "Você acha difícil manter uma rotina alimentar consistente?",
    description:
      "Fazer lanches fora das refeições regulares é comum e <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>pode te impedir de alcançar</span> seus objetivos.",
    question: "Selecione uma opção abaixo:",
    options: [
      {
        label: "👍 Sim",
        value: "yes",
      },
      {
        label: "👎 Não",
        value: "no",
      },
    ],
  },
  {
    title: "Defina sua dieta",
    description:
      "Saber o tipo da sua dieta nos ajuda a <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>personalizar um plano com base nas suas necessidades</span> e preferências alimentares.",
  },
  {
    title: "Você acha difícil manter uma rotina alimentar consistente?",
    description:
      "Fazer lanches fora das refeições regulares é comum e <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>pode te impedir de alcançar</span> seus objetivos.",
    question: "Selecione uma opção abaixo:",
    options: [
      {
        label: "🧆 Como de tudo",
        value: "eat-everything",
      },
      {
        label: "🥗 Vegetariano",
        value: "vegetarian",
      },
      {
        label: "🌱 Vegano",
        value: "vegan",
      },
    ],
  },
  {
    title: "Alguma alergia alimentar?",
    description:
      "Ao compartilhar suas alergias alimentares, podemos <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>adaptar seu plano nutricional</span> de acordo.",
    question: "Selecione uma opção abaixo:",
    options: [
      {
        label: "👍 Sim",
        value: "yes",
      },
      {
        label: "👎 Não",
        value: "no",
      },
    ],
  },
  {
    title: "Selecione suas alergias",
    description:
      "Não se preocupe, <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>removeremos qualquer alimento</span> ao qual você seja alérgico da sua dieta.",
    question: "Selecione:",
    isGrid: true,
    select: [
      {
        label: "🥛 Lactose",
        value: "lactose",
      },
      {
        label: "🌰 Nozes",
        value: "nozes",
      },
      {
        label: "🐟 Peixe",
        value: "peixe",
      },
      {
        label: "🫛 Soja",
        value: "soja",
      },
      {
        label: "🥚 Ovos",
        value: "ovos",
      },
      {
        label: "🍞 Glúten",
        value: "gluten",
      },
      {
        label: "🍤 Frutos do mar",
        value: "frutos-do-mar",
      },
      {
        label: "🍊 Frutas Cítricas",
        value: "frutas-citricas",
      },
    ],
    options: [
      {
        label: "💬 Outros",
        value: "others",
      },
    ],
  },
  {
    title: "Alguma condição médica?",
    description:
      "Se você tiver alguma condição médica, <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>adaptaremos seu plano alimentar</span> de acordo.",
    question: "Selecione uma opção abaixo:",
    options: [
      {
        label: "👍 Sim",
        value: "yes",
      },
      {
        label: "👎 Não",
        value: "no",
      },
    ],
  },
  {
    title: "Selecione suas condições médicas",
    description: "Uma maçã por dia mantém o médico longe.",
    question: "Selecione:",
    select: [
      {
        label: "Diabetes ou pré-diabetes",
        value: "diabetes",
      },
      {
        label: "Pressão alta",
        value: "pressao-alta",
      },
      {
        label: "Doenças cardíacas",
        value: "cardiacas",
      },
      {
        label: "Colesterol alto",
        value: "colesterol",
      },
      {
        label: "Gastrite",
        value: "gastrite",
      },
      {
        label: "Síndrome do intestino irritável",
        value: "intestino-irritavel",
      },
      {
        label: "Doença renal crônica",
        value: "renal",
      },
      {
        label: "Doença do refluxo gastroesofágico",
        value: "refluxo",
      },
      {
        label: "Anemia",
        value: "anemia",
      },
      {
        label: "Hipotireoidismo",
        value: "hipotireoidismo",
      },
    ],
  },
  {
    title:
      "Seguir um plano pode ser desafiador, mas com o Fit Lens, é muito mais fácil!",
  },
  {
    title: "Número preferido de refeições por dia",
    description:
      "O <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>Fit Lens</span> utiliza inteligência artificial para <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>calcular o número ideal</span> de refeições personalizado para você!",
    question: "Selecione uma opção abaixo:",
    isGrid: true,
    options: [
      {
        label: "2 refeições",
        value: "2-eats",
      },
      {
        label: "3 ref. e 2 lanches",
        value: "3ref-2-eats",
      },
      {
        label: "3 ref. e 1 lanche",
        value: "3ref-1-eat",
      },
      {
        label: "5 ref. e 2 lanches",
        value: "5ref-2eats",
      },
    ],
  },
  {
    title: "Confira isso!",
    description:
      "O Fit Lens <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>calcula e organiza</span> todas as calorias e nutrientes que você consome <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>ao longo do dia!</span>",
  },
  {
    title: "Qual é o seu nível de atividade física?",
    description:
      "Seu plano será <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>ajustado</span> com base no seu nível de atividade física.",
    question: "Selecione uma opção abaixo:",
    options: [
      {
        label: "🛌 Nenhuma atividade",
        value: "nothing",
      },
      {
        label: "🚶‍♂️ Moderadamente ativo (1-2 vezes por semana)",
        value: "moderative",
      },
      {
        label: "🏃‍♂️‍ Muito ativo (3-4 vezes por semana)",
        value: "performance",
      },
    ],
  },
  {
    title: "Com que frequência você poderia se exercitar?",
    description:
      "O exercício é <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>opcional</span>, e mesmo sem ele, seu plano será ajustado para o <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>seu sucesso.</span>",
    question: "Selecione uma opção abaixo:",
    options: [
      {
        label: "🚫 Não posso me exercitar",
        value: "cant-practice-sports",
      },
      {
        label: "🚀 1-2 vezes por semana",
        value: "moderative",
      },
      {
        label: "🔥 3-4 vezes por semana",
        value: "performance",
      },
    ],
  },
  {
    title:
      "Com que frequência você gostaria de receber sugestões personalizadas de refeições?",
    question: "Selecione uma opção abaixo:",
    options: [
      {
        label: "Diariamente, para facilitar minha rotina.",
        value: "everyday",
      },
      {
        label: "Apenas em ocasiões específicas.",
        value: "moderative",
      },
      {
        label: "Não preciso de sugestões, prefiro autonomia.",
        value: "performance",
      },
    ],
  },
  {
    title:
      "Você gostaria que o aplicativo alertasse se você estiver consumindo calorias em excesso?",
    question: "Selecione uma opção abaixo:",
    options: [
      {
        label: "👍 Sim, isso seria muito útil.",
        value: "yes",
      },
      {
        label: "😐 Talvez, dependendo de como o alerta é feito.",
        value: "some-times",
      },
      {
        label: "👎 Não, prefiro controlar isso sozinho.",
        value: "no",
      },
    ],
  },
  {
    title:
      "Com o Fit Lens, você pode acompanhar seu progresso com gráficos e relatórios.",
  },
  {
    title: "Qual é a sua idade?",
    description:
      "Sua idade nos permite <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>calcular o metabolismo</span> e sugerir as atividades mais adequadas.",
    isGrid: true,
    options: [
      {
        label: "15 - 21",
        value: "15-21",
      },
      {
        label: "21 - 30",
        value: "21-30",
      },
      {
        label: "31 - 45",
        value: "31-45",
      },
      {
        label: "46 - 59",
        value: "46-59",
      },
      {
        label: "60+",
        value: "60+",
      },
    ],
  },
  {
    title: "Qual é a sua altura?",
    description:
      "Saber sua altura nos ajuda a <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>calcular seu IMC</span>.",
    useRuler: true,
  },
  {
    title: "Qual o seu peso atual?",
    description:
      "Saber seu peso nos ajuda a <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>calcular seu IMC</span>.",
    useWeightRuler: true,
  },
  {
    title: "Qual é o seu objetivo?",
    description:
      "Nós <span class='bg-gradient-to-r from-azul-start to-azul-end bg-clip-text text-transparent font-semibold'>personalizaremos seu plano nutricional</span> para guiá-lo em direção aos seus objetivos!",
    useWeightRuler: true,
  },
];
