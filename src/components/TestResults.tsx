import { Test, TestResult } from "@/types/test";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface TestResultsProps {
  test: Test;
  result: TestResult;
  onReturnToDashboard: () => void;
  onRetakeTest: () => void;
}

const TestResults = ({
  test,
  result,
  onReturnToDashboard,
  onRetakeTest,
}: TestResultsProps) => {
  const percentage = Math.round(
    (result.correctAnswers / result.totalQuestions) * 100,
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80)
      return { text: "Отлично!", color: "bg-green-100 text-green-800" };
    if (score >= 60)
      return { text: "Хорошо", color: "bg-yellow-100 text-yellow-800" };
    return { text: "Нужно подтянуть", color: "bg-red-100 text-red-800" };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const badge = getScoreBadge(percentage);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Результаты теста</h1>
          <p className="text-gray-600 mt-1">{test.title}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Основной результат */}
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div
                  className={`text-6xl font-bold ${getScoreColor(percentage)}`}
                >
                  {percentage}%
                </div>
              </div>
              <CardTitle className="text-2xl">
                <Badge className={badge.color}>{badge.text}</Badge>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {result.correctAnswers}
                  </div>
                  <div className="text-sm text-gray-600">
                    Правильных ответов
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-bold text-gray-600">
                    {result.totalQuestions}
                  </div>
                  <div className="text-sm text-gray-600">Всего вопросов</div>
                </div>

                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatTime(result.timeSpent)}
                  </div>
                  <div className="text-sm text-gray-600">Время</div>
                </div>

                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {result.score}
                  </div>
                  <div className="text-sm text-gray-600">Баллов</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Разбор ответов */}
          <Card>
            <CardHeader>
              <CardTitle>Разбор ответов</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {test.questions.map((question, index) => {
                const userAnswer = result.answers.find(
                  (a) => a.questionId === question.id,
                );
                const isCorrect = userAnswer?.isCorrect ?? false;

                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isCorrect ? "✓" : "✗"}
                      </div>

                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Вопрос {index + 1}: {question.text}
                        </h4>

                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Ваш ответ: </span>
                            <span
                              className={
                                isCorrect ? "text-green-600" : "text-red-600"
                              }
                            >
                              {userAnswer
                                ? question.options[userAnswer.selectedAnswer]
                                : "Не отвечено"}
                            </span>
                          </div>

                          {!isCorrect && (
                            <div>
                              <span className="text-gray-600">
                                Правильный ответ:{" "}
                              </span>
                              <span className="text-green-600">
                                {question.options[question.correctAnswer]}
                              </span>
                            </div>
                          )}

                          {question.explanation && (
                            <div className="bg-blue-50 p-3 rounded mt-2">
                              <span className="text-blue-800 text-xs font-semibold">
                                ОБЪЯСНЕНИЕ:
                              </span>
                              <p className="text-blue-700 mt-1">
                                {question.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Действия */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onRetakeTest}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Icon name="RotateCcw" size={16} />
              Пройти еще раз
            </Button>

            <Button
              onClick={onReturnToDashboard}
              className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
            >
              <Icon name="Home" size={16} />
              Вернуться к тестам
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestResults;
