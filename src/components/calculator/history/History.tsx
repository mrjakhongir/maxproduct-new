import { Loader } from "lucide-react";
import HistoryItem from "./HistoryItem";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const History = () => {
  const { forms, isFetching, isLoading } = useSelector(
    (state: RootState) => state.form
  );
  return (
    <section className='flex-[1.5] overflow-y-scroll'>
      {isFetching ? (
        <div className='flex items-center justify-center h-full'>
          <Loader className='animate-spin mb-[250px]' size={40} />
        </div>
      ) : forms.length > 0 ? (
        <ul className={`flex flex-col gap-5 ${isLoading && "animate-pulse"}`}>
          {forms.map((form) => (
            <HistoryItem key={form.id} data={form} />
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
