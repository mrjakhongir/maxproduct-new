import Container from "@/components/Container";
import FeatureSkeleton from "@/components/dashboard/features/FeatureSkeleton";
import HistoryList from "@/components/history/HistoryList";
import MarketFilter from "@/components/history/MarketFilter";
import { db } from "@/config/firebase";
import { RootState } from "@/redux/store";
import { HistoryI } from "@/types/history";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const History = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [history, setHistory] = useState<HistoryI[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const market = searchParams.get("market");
  async function getHistories() {
    try {
      const q = query(
        collection(db, "forms"),
        where("userId", "==", user?.uid),
        where("market", "==", market)
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
    if (market == null) {
      setSearchParams({ market: "Местный" });
    }
  }, [market]);
  return (
    <Container className='py-2'>
      <MarketFilter />
      {history.length > 0 ? (
        <HistoryList data={history} />
      ) : (
        <FeatureSkeleton />
      )}
    </Container>
  );
};

export default History;
