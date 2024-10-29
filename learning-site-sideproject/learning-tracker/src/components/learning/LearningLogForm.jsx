import React from "react";
import { useForm } from "react-hook-form";
import useStore from "../../store";

const LearningLogForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const addLearningLog = useStore((state) => state.addLearningLog);

  const onSubmit = async (data) => {
    await addLearningLog(data);
    reset();
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Log Your Learning</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("articleTitle", {
              required: "Article title is required",
            })}
            placeholder="Article Title"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.articleTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.articleTitle.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="number"
            {...register("studyTime", {
              required: "Study time is required",
              min: 1,
            })}
            placeholder="Study Time (minutes)"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.studyTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.studyTime.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            {...register("summary", { required: "Summary is required" })}
            placeholder="Summary of what you learned"
            rows={4}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.summary && (
            <p className="text-red-500 text-sm mt-1">
              {errors.summary.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Log Learning
        </button>
      </form>
    </div>
  );
};

export default LearningLogForm;
