import { useState } from "react";
import { mockTests } from "@/data/mockTests";
import { Test, TestResult } from "@/types/test";
import Dashboard from "@/components/Dashboard";
import TestInterface from "@/components/TestInterface";
import TestResults from "@/components/TestResults";

type AppState = "dashboard" | "test" | "results";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("dashboard");
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const handleStartTest = (testId: string) => {
    const test = mockTests.find((t) => t.id === testId);
    if (test) {
      setSelectedTest(test);
      setCurrentState("test");
    }
  };

  const handleTestComplete = (
    answers: { questionId: string; selectedAnswer: number }[],
  ) => {
    if (!selectedTest) return;

    // Вычисляем результат
    let correctAnswers = 0;
    const detailedAnswers = answers.map((answer) => {
      const question = selectedTest.questions.find(
        (q) => q.id === answer.questionId,
      );
      const isCorrect = question
        ? question.correctAnswer === answer.selectedAnswer
        : false;
      if (isCorrect) correctAnswers++;

      return {
        questionId: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
      };
    });

    const result: TestResult = {
      testId: selectedTest.id,
      score: Math.round((correctAnswers / selectedTest.questions.length) * 100),
      totalQuestions: selectedTest.questions.length,
      correctAnswers,
      timeSpent: selectedTest.duration * 60 - 120, // Mock время
      answers: detailedAnswers,
      completedAt: new Date(),
    };

    setTestResult(result);
    setCurrentState("results");
  };

  const handleReturnToDashboard = () => {
    setCurrentState("dashboard");
    setSelectedTest(null);
    setTestResult(null);
  };

  const handleRetakeTest = () => {
    if (selectedTest) {
      setCurrentState("test");
      setTestResult(null);
    }
  };

  if (currentState === "test" && selectedTest) {
    return (
      <TestInterface
        test={selectedTest}
        onTestComplete={handleTestComplete}
        onExit={handleReturnToDashboard}
      />
    );
  }

  if (currentState === "results" && selectedTest && testResult) {
    return (
      <TestResults
        test={selectedTest}
        result={testResult}
        onReturnToDashboard={handleReturnToDashboard}
        onRetakeTest={handleRetakeTest}
      />
    );
  }

  return <Dashboard onStartTest={handleStartTest} />;
};

export default Index;
