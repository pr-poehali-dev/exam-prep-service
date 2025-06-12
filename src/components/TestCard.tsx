import { Test } from "@/types/test";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
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
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {test.title}
          </CardTitle>
          <Badge className={getDifficultyColor(test.difficulty)}>
            {getDifficultyText(test.difficulty)}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mt-2">{test.description}</p>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={16} />
            <span>{test.duration} мин</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="HelpCircle" size={16} />
            <span>{test.questionsCount} вопросов</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="BookOpen" size={16} />
            <span>{test.category}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => onStartTest(test.id)}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          Начать тест
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestCard;
