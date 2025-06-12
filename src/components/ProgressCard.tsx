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
    <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Icon name="TrendingUp" size={24} />
          Ваш прогресс
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {progress.totalTestsTaken}
            </div>
            <div className="text-purple-100 text-sm">Всего тестов</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {progress.averageScore}%
            </div>
            <div className="text-purple-100 text-sm">Средний балл</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold mb-1 flex items-center justify-center gap-1">
              <Icon name="Flame" size={28} className="text-orange-300" />
              {progress.streak}
            </div>
            <div className="text-purple-100 text-sm">Дней подряд</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {progress.completedThisWeek}/{progress.weeklyGoal}
            </div>
            <div className="text-purple-100 text-sm">За неделю</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Недельная цель</span>
            <span>{Math.round(weeklyProgress)}%</span>
          </div>
          <Progress value={weeklyProgress} className="h-3 bg-purple-400/30" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
