// src/components/dashboard/TaskList.tsx
import React from "react";
import { DailyTask } from "../../types/dashboard";

interface TaskListProps {
  tasks: DailyTask[];
  onUpdateTask: (taskId: string, updates: Partial<DailyTask>) => void;
  onDeleteTask: (taskId: string) => void;
  loading: boolean;
  error: string | null;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onUpdateTask,
  onDeleteTask,
  loading,
  error,
}) => {
  if (loading) return <div className="text-center">Loading tasks...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (tasks.length === 0) return <div>오늘의 태스크가 없습니다.</div>;

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) =>
                onUpdateTask(task.id, { completed: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex flex-col">
              <span
                className={`${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </span>
              <span className="text-sm text-gray-500 capitalize">
                {task.category} •{" "}
                {new Date(task.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="text-red-500 hover:text-red-700 p-2"
            aria-label="Delete task"
          >
            {/* <TrashIcon className="h-5 w-5" /> */}
          </button>
        </div>
      ))}
    </div>
  );
};
