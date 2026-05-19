import type { ImageSourcePropType } from 'react-native';

import type { Question, QuizLevel } from './quiz-data';

export const quizImplantFile = [
  {
    caso: "001",
    perguntas: [
      {
        nivel: "easy",
        pergunta:
          "Qual característica macrogeométrica melhor descreve este implante?",
        alternativas: {
          A: "Implante ultracônico agressivo",
          B: "Implante híbrido expansivo",
          C: "Implante cilíndrico com paredes paralelas",
          D: "Implante de dupla conicidade cervical",
        },
        resposta: "C",
      },
      {
        nivel: "medium",
        pergunta: "Qual conexão protética é mais compatível com este implante?",
        alternativas: {
          A: "Hexágono externo",
          B: "Cone Morse",
          C: "Hexágono interno",
          D: "Trichannel interno",
        },
        resposta: "C",
      },
      {
        nivel: "hard",
        pergunta:
          "Considerando a proposta de carga imediata deste implante, qual característica da rosca mais favorece estabilidade primária elevada?",
        alternativas: {
          A: "Rosca cervical rasa",
          B: "Rosca progressiva condensante",
          C: "Rosca quadrada passiva",
          D: "Ausência de autotarraxamento",
        },
        resposta: "B",
      },
      {
        nivel: "expert",
        pergunta:
          "A utilização de plataforma switching neste implante tem como principal objetivo:",
        alternativas: {
          A: "Aumentar o comprimento funcional do implante",
          B: "Reduzir forças mastigatórias apicais",
          C: "Preservar tecido ósseo cervical peri-implantar",
          D: "Eliminar micromovimentações protéticas",
        },
        resposta: "C",
      },
    ],
  },
  {
    caso: "002",
    perguntas: [
      {
        nivel: "easy",
        pergunta:
          "Qual característica macrogeométrica melhor descreve este implante?",
        alternativas: {
          A: "Implante cilíndrico paralelo",
          B: "Implante cônico",
          C: "Implante híbrido expansivo",
          D: "Implante de parede lisa cervical",
        },
        resposta: "B",
      },
      {
        nivel: "medium",
        pergunta: "Qual conexão protética é mais compatível com este implante?",
        alternativas: {
          A: "Hexágono externo",
          B: "Hexágono interno",
          C: "Cone Morse",
          D: "Conexão trilobe",
        },
        resposta: "C",
      },
      {
        nivel: "hard",
        pergunta:
          "Qual característica da rosca deste implante favorece maior estabilidade em osso tipo III e IV?",
        alternativas: {
          A: "Rosca quadrada rasa",
          B: "Rosca trapezoidal",
          C: "Rosca passiva uniforme",
          D: "Rosca cervical lisa",
        },
        resposta: "B",
      },
      {
        nivel: "expert",
        pergunta:
          "Qual principal benefício biomecânico está associado à combinação entre conexão Cone Morse e plataforma switching neste implante?",
        alternativas: {
          A: "Aumento da largura óssea vestibular",
          B: "Melhor distribuição de cargas ao implante",
          C: "Eliminação completa do microgap protético",
          D: "Redução do comprimento funcional da prótese",
        },
        resposta: "B",
      },
    ],
  },
  {
    caso: "003",
    perguntas: [
      {
        nivel: "easy",
        pergunta:
          "Qual característica macrogeométrica melhor descreve este implante?",
        alternativas: {
          A: "Implante cônico agressivo",
          B: "Implante cilíndrico com ápice cônico",
          C: "Implante híbrido expansivo",
          D: "Implante de parede lisa cervical",
        },
        resposta: "B",
      },
      {
        nivel: "medium",
        pergunta: "Qual conexão protética é mais compatível com este implante?",
        alternativas: {
          A: "Cone Morse",
          B: "Hexágono interno",
          C: "Hexágono externo",
          D: "Conexão trilobular",
        },
        resposta: "C",
      },
      {
        nivel: "hard",
        pergunta:
          "Qual característica da rosca deste implante favorece maior avanço durante a instalação cirúrgica?",
        alternativas: {
          A: "Rosca quadrada passiva",
          B: "Rosca dupla",
          C: "Rosca cervical lisa",
          D: "Rosca trapezoidal única",
        },
        resposta: "B",
      },
      {
        nivel: "expert",
        pergunta:
          "A utilização da técnica switching neste implante tem como principal objetivo:",
        alternativas: {
          A: "Aumentar a estabilidade do parafuso protético",
          B: "Melhorar a dissipação de cargas cervicais",
          C: "Reduzir o torque de instalação",
          D: "Aumentar o comprimento funcional do implante",
        },
        resposta: "B",
      },
    ],
  },
  {
    caso: "004",
    perguntas: [
      {
        nivel: "easy",
        pergunta:
          "Qual característica macrogeométrica melhor descreve este implante?",
        alternativas: {
          A: "Implante cilíndrico paralelo",
          B: "Implante cônico",
          C: "Implante híbrido expansivo",
          D: "Implante de dupla parede cervical",
        },
        resposta: "B",
      },
      {
        nivel: "medium",
        pergunta: "Qual conexão protética é mais compatível com este implante?",
        alternativas: {
          A: "Hexágono externo",
          B: "Hexágono interno",
          C: "Cone Morse",
          D: "Conexão trilobe",
        },
        resposta: "C",
      },
      {
        nivel: "hard",
        pergunta:
          "Qual característica das roscas deste implante favorece estabilidade em diferentes densidades ósseas?",
        alternativas: {
          A: "Roscas lisas cervicais",
          B: "Roscas trapezoidais",
          C: "Roscas quadradas passivas",
          D: "Roscas de passo único reduzido",
        },
        resposta: "B",
      },
      {
        nivel: "expert",
        pergunta:
          "Qual principal vantagem clínica este implante oferece para protocolos de reabilitação imediata?",
        alternativas: {
          A: "Redução da profundidade cirúrgica",
          B: "Maior estabilidade primária",
          C: "Eliminação do microgap protético",
          D: "Menor necessidade de torque cirúrgico",
        },
        resposta: "B",
      },
    ],
  },
  {
    caso: "005",
    perguntas: [
      {
        nivel: "easy",
        pergunta:
          "Qual característica macrogeométrica melhor descreve este implante?",
        alternativas: {
          A: "Implante cilíndrico paralelo",
          B: "Implante totalmente cônico com contorno híbrido",
          C: "Implante de dupla parede cervical",
          D: "Implante expansivo apical",
        },
        resposta: "B",
      },
      {
        nivel: "medium",
        pergunta: "Qual conexão protética é mais compatível com este implante?",
        alternativas: {
          A: "Cone Morse",
          B: "Hexágono interno",
          C: "Hexágono externo",
          D: "Conexão trilobular",
        },
        resposta: "C",
      },
      {
        nivel: "hard",
        pergunta:
          "Qual característica das roscas deste implante favorece maior estabilidade primária na região apical?",
        alternativas: {
          A: "Roscas trapezoidais compressivas",
          B: "Roscas quadradas passivas",
          C: "Roscas triangulares autocortantes",
          D: "Roscas cervicais lisas",
        },
        resposta: "C",
      },
      {
        nivel: "expert",
        pergunta:
          "Qual principal benefício biomecânico está relacionado ao contorno híbrido deste implante?",
        alternativas: {
          A: "Redução da necessidade de irrigação cirúrgica",
          B: "Melhor equilíbrio entre estabilidade e distribuição de cargas",
          C: "Eliminação do microgap protético",
          D: "Aumento do comprimento funcional da prótese",
        },
        resposta: "B",
      },
    ],
  },
];

const CASO_IMAGES: Record<string, ImageSourcePropType> = {
  '001': require('@/assets/niveis/caso-001.jpg'),
  '002': require('@/assets/niveis/caso-002.jpg'),
  '003': require('@/assets/niveis/caso-003.jpg'),
  '004': require('@/assets/niveis/caso-004.jpg'),
  '005': require('@/assets/niveis/caso-005.jpg'),
};

export const quizImplantQuestions: Question[] = quizImplantFile.flatMap((caso) =>
  caso.perguntas.map((p) => ({
    id: `caso-${caso.caso}-${p.nivel}`,
    prompt: p.pergunta,
    options: (Object.entries(p.alternativas) as [string, string][]).map(
      ([letter, text]) => ({ id: letter, text }),
    ),
    correctOptionId: p.resposta,
    image: CASO_IMAGES[caso.caso],
    caseId: caso.caso,
    level: p.nivel as QuizLevel,
  })),
);
