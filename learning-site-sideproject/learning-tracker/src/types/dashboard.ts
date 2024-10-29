export interface DailyTask {
  id: string;
  title: string;
  category: "learning" | "coding" | "review";
  completed: boolean;
  userId: string;
  date: string;
  createdAt: string;
}

// 새 태스크 생성 시 사용할 타입 (id 제외)
export type NewDailyTask = Omit<DailyTask, "id" | "userId" | "createdAt">;

export interface DailyProgress {
  learning: number;
  coding: number;
  review: number;
}
