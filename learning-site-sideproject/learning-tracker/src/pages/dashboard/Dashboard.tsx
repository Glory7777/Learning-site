import React from "react";
import { DailyProgress } from "../../components/dashboard/DailyProgress";
import { TaskList } from "../../components/dashboard/TaskList";
import { AddTaskForm } from "../../components/dashboard/AddTaskForm";
import { useDashboard } from "../../hooks/useDashboard";

const Dashboard: React.FC = () => {
  const { tasks, loading, addTask, updateTask, deleteTask } = useDashboard();

  const calculateProgress = () => {
    const totalByCategory = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const completedByCategory = tasks.reduce((acc, task) => {
      if (task.completed) {
        acc[task.category] = (acc[task.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      learning:
        ((completedByCategory.learning || 0) /
          (totalByCategory.learning || 1)) *
        100,
      coding:
        ((completedByCategory.coding || 0) / (totalByCategory.coding || 1)) *
        100,
      review:
        ((completedByCategory.review || 0) / (totalByCategory.review || 1)) *
        100,
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <DailyProgress progress={calculateProgress()} />

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
        <AddTaskForm onAddTask={addTask} />
        <div className="mt-6">
          <TaskList
            tasks={tasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
