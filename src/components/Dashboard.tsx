import { useState } from "react";
import { mockTests } from "@/data/mockTests";
import { UserProgress } from "@/types/test";
import TestCard from "./TestCard";
import ProgressCard from "./ProgressCard";
import Icon from "@/components/ui/icon";

interface DashboardProps {
  onStartTest: (testId: string) => void;
}

const Dashboard = ({ onStartTest }: DashboardProps) => {
  const [userProgress] = useState<UserProgress>({
    totalTestsTaken: 24,
    averageScore: 78,
    streak: 5,
    weeklyGoal: 10,
    completedThisWeek: 6,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Тренировочные тесты
              </h1>
              <p className="text-gray-600 mt-1">
                Поддерживайте знания в отличной форме
              </p>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <Icon name="Zap" size={20} />
              <span className="font-semibold">
                Серия: {userProgress.streak} дней
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <ProgressCard progress={userProgress} />

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Доступные тесты
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockTests.map((test) => (
                <TestCard key={test.id} test={test} onStartTest={onStartTest} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
