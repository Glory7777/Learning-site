import React, { useEffect } from "react";
import useStore from "../../store";
import { format } from "date-fns";

const LearningLogList = () => {
  const learningLogs = useStore((state) => state.learningLogs);
  const fetchLearningLogs = useStore((state) => state.fetchLearningLogs);

  useEffect(() => {
    const unsubscribe = fetchLearningLogs();
    return () => unsubscribe();
  }, [fetchLearningLogs]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Learning Logs</h2>
      <div className="space-y-4">
        {learningLogs.map((log) => (
          <div key={log.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold">{log.articleTitle}</h3>
            <p className="text-sm text-gray-500">
              Study time: {log.studyTime} minutes | Date:{" "}
              {format(log.createdAt.toDate(), "PPpp")}
            </p>
            <p className="mt-2">{log.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningLogList;
