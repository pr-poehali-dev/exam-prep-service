import { Test } from "@/types/test";

export const mockTests: Test[] = [
  {
    id: "1",
    title: "Математика: Алгебра",
    description: "Основы алгебраических операций и уравнений",
    difficulty: "medium",
    duration: 10,
    questionsCount: 8,
    category: "Математика",
    questions: [
      {
        id: "1-1",
        text: "Решите уравнение: 2x + 5 = 13",
        options: ["x = 3", "x = 4", "x = 5", "x = 6"],
        correctAnswer: 1,
        explanation:
          "Вычитаем 5 из обеих частей: 2x = 8, затем делим на 2: x = 4",
      },
      {
        id: "1-2",
        text: "Упростите выражение: 3(x + 2) - 2x",
        options: ["x + 6", "5x + 6", "x + 2", "3x + 6"],
        correctAnswer: 0,
        explanation: "3(x + 2) - 2x = 3x + 6 - 2x = x + 6",
      },
    ],
  },
  {
    id: "2",
    title: "История: XX век",
    description: "Ключевые события двадцатого столетия",
    difficulty: "hard",
    duration: 15,
    questionsCount: 10,
    category: "История",
    questions: [
      {
        id: "2-1",
        text: "В каком году началась Первая мировая война?",
        options: ["1913", "1914", "1915", "1916"],
        correctAnswer: 1,
        explanation: "Первая мировая война началась 28 июля 1914 года",
      },
    ],
  },
  {
    id: "3",
    title: "Русский язык: Орфография",
    description: "Правописание сложных слов и выражений",
    difficulty: "easy",
    duration: 8,
    questionsCount: 6,
    category: "Русский язык",
    questions: [
      {
        id: "3-1",
        text: "Как правильно пишется слово?",
        options: ["привилегия", "привелегия", "приведегия", "преведегия"],
        correctAnswer: 0,
        explanation: "Правильно: привилегия (от лат. privilegium)",
      },
    ],
  },
];
