import HistoryItem from "./HistoryItem";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import ItemSkeleton from "../form/ItemSkeleton";

const History = () => {
  const { forms, isFetching, isLoading } = useSelector(
    (state: RootState) => state.form
  );
  return (
    <section className='flex-[1.5] overflow-y-scroll'>
      {isFetching ? (
        <>
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
        </>
      ) : forms.length > 0 ? (
        <ul className={`flex flex-col gap-5 ${isLoading && "animate-pulse"}`}>
          {forms.map((form) => (
            <HistoryItem key={form.formId} item={form} />
          ))}
        </ul>
      ) : (
        <h2 className='text-center text-2xl text-slate-800 font-semibold'>
          No data found
        </h2>
      )}
    </section>
  );
};

export default History;
