import { create } from "zustand";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./services/firebase";

const useStore = create((set) => ({
  learningLogs: [],
  addLearningLog: async (log) => {
    try {
      await addDoc(collection(db, "learningLogs"), {
        ...log,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  },
  fetchLearningLogs: () => {
    const q = query(
      collection(db, "learningLogs"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const logs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ learningLogs: logs });
    });
    return unsubscribe;
  },
}));

export default useStore;
