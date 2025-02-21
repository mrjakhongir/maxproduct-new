import Container from "@/components/Container";
import { db } from "@/config/firebase";
import { RootState } from "@/redux/store";
import { HistoryI } from "@/types/history";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const History = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [history, setHistory] = useState<HistoryI[]>([]);
  async function getHistories() {
    try {
      const q = query(
        collection(db, "forms"),
        where("userId", "==", user?.uid)
      );
      const res = await getDocs(q);
      const data = res.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      }) as HistoryI[];

      setHistory(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getHistories();
  }, []);
  console.log(history);
  return <Container>History</Container>;
};

export default History;
