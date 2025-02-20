import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { db } from "@/config/firebase";
import { Area } from "@/types/area";

import { useState } from "react";
import { useForm } from "react-hook-form";
import SelectType from "./SelectType";
import SelectThickness from "./SelectThickness";
import SelectCoverThickness from "./SelectCoverThickness";
import SelectFiller from "./SelectFiller";
import { Search } from "lucide-react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

type PriceFilterProps = {
  setAllPrices: React.Dispatch<React.SetStateAction<Area[]>>;
};
const PriceFilter: React.FC<PriceFilterProps> = ({ setAllPrices }) => {
  const [loading, setLoading] = useState(false);
  const [showResetBtn, setShowResetBtn] = useState(false);
  const navigate = useNavigate();

  const form = useForm<Area>({
    defaultValues: {
      type: "Стеновые",
      panelThickness: "50 MM",
      coverThickness: "0.35 MM",
      filler: "Базальт",
    },
  });

  async function onSubmit(values: Area) {
    try {
      setLoading(true);
      const q = query(
        collection(db, "prices"),
        orderBy("type"),
        where("type", "==", values.type),
        where("panelThickness", "==", values.panelThickness),
        where("coverThickness", "==", values.coverThickness),
        where("filler", "==", values.filler)
      );
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      }) as Area[];
      setAllPrices(docs);
      setLoading(false);
      setShowResetBtn(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  function resetFiler() {
    navigate(".");
    setAllPrices([]);
    setShowResetBtn(false);
  }

  return (
    <div className='mb-5 p-2 bg-[#F2F3F6] rounded-lg'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex items-end justify-between'
        >
          <div className='flex gap-4'>
            <SelectType control={form.control} />
            <SelectThickness control={form.control} />
            <SelectCoverThickness control={form.control} />
            <SelectFiller control={form.control} />
          </div>
          <div className='flex'>
            {showResetBtn && (
              <Button
                className='w-[130px] text-blue-600'
                variant='link'
                onClick={resetFiler}
              >
                Сбросить
              </Button>
            )}
            <Button
              type='submit'
              className='w-[130px] bg-[#f4a261] hover:bg-[#f4a261]/90 hover:text-white text-white'
              variant='outline'
            >
              <Search />
              {loading ? "Загрузка..." : "Поиск"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PriceFilter;
