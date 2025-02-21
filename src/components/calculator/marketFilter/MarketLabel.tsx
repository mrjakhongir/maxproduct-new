import { db } from "@/config/firebase";
import { clearForms } from "@/redux/slices/formSlice";
import { RootState } from "@/redux/store";
import { deleteDoc, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

type MarketLabelProps = {
  src: string;
  market: string;
};

function MarketLabel({ src, market }: MarketLabelProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { groupId } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  async function changeMarket() {
    setSearchParams({ market });
    dispatch(clearForms());
    if (groupId) {
      const docRef = doc(db, "forms", groupId);
      await deleteDoc(docRef);
    }
  }
  return (
    <button
      className={`flex-1 flex items-center justify-between text-white md:text-xl py-2 px-2 md:px-3 xl:px-4 transition-all rounded-md select-none ${
        market === "Местный" ? "bg-[#006bb0]" : "bg-primary"
      } ${
        searchParams.get("market") === market
          ? "opacity-100 shadow-xl cursor-default"
          : "opacity-70 shadow-sm cursor-pointer hover:opacity-90 "
      }`}
      onClick={changeMarket}
    >
      <div className='flex items-center gap-1 md:gap-2'>
        <img src={src} alt='icon' width={24} height={24} />
        <span className='font-semibold'>{market}</span>
      </div>
    </button>
  );
}

export default MarketLabel;
