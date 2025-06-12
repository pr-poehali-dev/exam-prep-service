import { useState, useEffect } from "react";
import { Test, Question } from "@/types/test";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface TestInterfaceProps {
  test: Test;
  onTestComplete: (
    answers: { questionId: string; selectedAnswer: number }[],
  ) => void;
  onExit: () => void;
}

const TestInterface = ({
  test,
  onTestComplete,
  onExit,
}: TestInterfaceProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<
    { questionId: string; selectedAnswer: number }[]
  >([]);
  const [timeLeft, setTimeLeft] = useState(test.duration * 60); // в секундах

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTestComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      const newAnswers = [
        ...answers,
        {
          questionId: currentQuestion.id,
          selectedAnswer: parseInt(selectedAnswer),
        },
      ];
      setAnswers(newAnswers);

      if (currentQuestionIndex < test.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer("");
      } else {
        onTestComplete(newAnswers);
      }
    }
  };

  const handleTestComplete = () => {
    const finalAnswers = selectedAnswer
      ? [
          ...answers,
          {
            questionId: currentQuestion.id,
            selectedAnswer: parseInt(selectedAnswer),
          },
        ]
      : answers;
    onTestComplete(finalAnswers);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onExit}>
                <Icon name="X" size={20} />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">
                {test.title}
              </h1>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-orange-600">
                <Icon name="Clock" size={18} />
                <span className="font-mono font-semibold">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {currentQuestionIndex + 1} из {test.questions.length}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-lg">
              Вопрос {currentQuestionIndex + 1}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-lg text-gray-900 leading-relaxed">
              {currentQuestion.text}
            </div>

            <RadioGroup
              value={selectedAnswer}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="text-sm cursor-pointer flex-1 py-2"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {currentQuestionIndex < test.questions.length - 1
                  ? "Следующий вопрос"
                  : "Завершить тест"}
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TestInterface;
