import React, { useState } from "react";
import { DailyTask } from "../../types/dashboard";

interface AddTaskFormProps {
  onAddTask: (task: Omit<DailyTask, "id">) => Promise<void>;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<DailyTask["category"]>("learning");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onAddTask({
      title,
      category,
      completed: false,
      date: new Date().toISOString().split("T")[0],
    });

    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
          className="w-full px-4 py-2 rounded border border-gray-300"
        />
      </div>
      <div className="flex space-x-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as DailyTask["category"])}
          className="px-4 py-2 rounded border border-gray-300"
        >
          <option value="learning">Learning</option>
          <option value="coding">Coding</option>
          <option value="review">Review</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};
