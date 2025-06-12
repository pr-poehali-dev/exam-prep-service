import { Test } from "@/types/test";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface TestCardProps {
  test: Test;
  onStartTest: (testId: string) => void;
}

const TestCard = ({ test, onStartTest }: TestCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Легкий";
      case "medium":
        return "Средний";
      case "hard":
        return "Сложный";
      default:
        return difficulty;
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-purple-100">
      <CardHeader className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getDifficultyColor(test.difficulty)}>
            {getDifficultyText(test.difficulty)}
          </Badge>
          <div className="text-sm text-purple-600 font-medium">
            {test.category}
          </div>
        </div>

        <CardTitle className="text-xl text-gray-900">{test.title}</CardTitle>

        <CardDescription className="text-gray-600 line-clamp-2">
          {test.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Icon name="HelpCircle" size={16} />
              <span>{test.questionsCount} вопросов</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={16} />
              <span>{test.duration} мин</span>
            </div>
          </div>

          <Button
            onClick={() => onStartTest(test.id)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Icon name="Play" size={16} className="mr-2" />
            Начать тест
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCard;
