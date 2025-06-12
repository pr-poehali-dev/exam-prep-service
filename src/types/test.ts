export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  duration: number; // в минутах
  questionsCount: number;
  questions: Question[];
  category: string;
}

export interface TestResult {
  testId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // в секундах
  answers: {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
  }[];
  completedAt: Date;
}

export interface UserProgress {
  totalTestsTaken: number;
  averageScore: number;
  streak: number; // дней подряд
  weeklyGoal: number;
  completedThisWeek: number;
}
