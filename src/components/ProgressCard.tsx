import { UserProgress } from "@/types/test";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface ProgressCardProps {
  progress: UserProgress;
}

const ProgressCard = ({ progress }: ProgressCardProps) => {
  const weeklyProgress =
    (progress.completedThisWeek / progress.weeklyGoal) * 100;

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="TrendingUp" size={20} className="text-purple-600" />
          Ваш прогресс
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {progress.totalTestsTaken}
            </div>
            <div className="text-sm text-gray-600">Тестов пройдено</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {progress.averageScore}%
            </div>
            <div className="text-sm text-gray-600">Средний балл</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {progress.streak}
            </div>
            <div className="text-sm text-gray-600">Дней подряд</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {progress.completedThisWeek}/{progress.weeklyGoal}
            </div>
            <div className="text-sm text-gray-600">На этой неделе</div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Недельная цель</span>
            <span className="text-sm text-gray-600">
              {Math.round(weeklyProgress)}%
            </span>
          </div>
          <Progress value={weeklyProgress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
