import React from "react";
import { CircularProgress } from "../common/CircularProgress";
import { DailyProgress as ProgressType } from "../../types/dashboard";

interface DailyProgressProps {
  progress: ProgressType;
}

export const DailyProgress: React.FC<DailyProgressProps> = ({ progress }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Today's Progress</h2>
      <div className="grid grid-cols-3 gap-4">
        <CircularProgress
          value={progress.learning}
          label="Learning"
          color="blue"
        />
        <CircularProgress
          value={progress.coding}
          label="Coding"
          color="green"
        />
        <CircularProgress
          value={progress.review}
          label="Review"
          color="purple"
        />
      </div>
    </div>
  );
};
