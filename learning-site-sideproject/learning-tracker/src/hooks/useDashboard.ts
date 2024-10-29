// src/hooks/useDashboard.ts
import { useState, useEffect } from "react";
import { db, auth } from "../services/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { DailyTask, NewDailyTask } from "../types/dashboard";

export const useDashboard = () => {
  // 태스크 목록과 로딩 상태 관리
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 오늘 날짜를 YYYY-MM-DD 형식으로 가져오는 유틸리티 함수
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // 태스크 목록을 실시간으로 가져오는 함수
  useEffect(() => {
    if (!auth.currentUser) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    const tasksRef = collection(db, "tasks");
    const q = query(
      tasksRef,
      where("userId", "==", auth.currentUser.uid),
      where("date", "==", getTodayDate())
    );

    // Firestore 실시간 구독 설정
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedTasks = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as DailyTask)
        );
        setTasks(fetchedTasks);
        setLoading(false);
      },
      (error) => {
        setError("태스크를 불러오는데 실패했습니다.");
        setLoading(false);
        console.error("Error fetching tasks:", error);
      }
    );

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, []);

  // 새로운 태스크 추가
  const addTask = async (taskData: NewDailyTask) => {
    try {
      if (!auth.currentUser) throw new Error("로그인이 필요합니다.");

      const tasksRef = collection(db, "tasks");
      await addDoc(tasksRef, {
        ...taskData,
        userId: auth.currentUser.uid,
        date: getTodayDate(),
        createdAt: new Date().toISOString(),
        completed: false,
      });
    } catch (error) {
      setError("태스크 추가에 실패했습니다.");
      console.error("Error adding task:", error);
    }
  };

  // 태스크 업데이트
  const updateTask = async (id: string, updates: Partial<DailyTask>) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      setError("태스크 업데이트에 실패했습니다.");
      console.error("Error updating task:", error);
    }
  };

  // 태스크 삭제
  const deleteTask = async (id: string) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await deleteDoc(taskRef);
    } catch (error) {
      setError("태스크 삭제에 실패했습니다.");
      console.error("Error deleting task:", error);
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
  };
};
