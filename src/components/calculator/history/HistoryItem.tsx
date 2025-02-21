import ItemInfo from "./ItemInfo";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { deleteForm } from "@/redux/slices/formSlice";
import { useRef } from "react";
import { RootState } from "@/redux/store";
import { useSearchParams } from "react-router-dom";
import { NewArea } from "@/types/area";

type HistoryItemProps = {
  item: NewArea;
};

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  const [searchParams] = useSearchParams();
  const { groupId } = useSelector((state: RootState) => state.form);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const itemRef = useRef<HTMLLIElement | null>(null);

  async function handleDelete(id: string) {
    itemRef.current?.classList.add("animate-slide-fade-out");
    setTimeout(() => {
      dispatch(deleteForm(id));
    }, 500);

    if (groupId) {
      const docRef = doc(db, "forms", groupId);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      const updatedForms = data?.forms.filter(
        (form: NewArea) => form.formId !== id
      );

      if (updatedForms.length === 0) {
        await setDoc(docRef, {
          userId: user?.uid,
          forms: [],
          market: searchParams.get("market") || "Местный",
        });
      } else {
        await updateDoc(docRef, {
          forms: updatedForms,
        });
      }
    }
  }
  return (
    <li
      ref={itemRef}
      className={`py-3 px-2 rounded-lg border animate-slide-fade-in shadow-md`}
    >
      <div className='flex flex-col md:flex-row justify-between'>
        <ul className='md:w-1/2 md:pr-2'>
          <ItemInfo label='Тип продукта:' value={item.type} />
          <ItemInfo label='Общий объём (м2):' value={String(item.area)} />
          <ItemInfo label='Скидка (%):' value={String(item.discount)} />
          <ItemInfo label='Цена:' value={String(item.price)} />
        </ul>
        <ul className='md:w-1/2 md:pl-2'>
          <ItemInfo label='Наполнитель:' value={item.filler} />
          <ItemInfo label='Толщина панели:' value={item.panelThickness} />
          <ItemInfo
            label='Толщина верхнего металла:'
            value={item.topThickness}
          />
          <ItemInfo
            label='Толщина нижнего металла:'
            value={item.bottomThickness}
          />
        </ul>
      </div>
      <div
        className={`flex justify-between items-center py-1 px-2 md:px-4 rounded-lg mt-4 gap-4 ${
          searchParams.get("market") === "Местный"
            ? "bg-[#0066B0]"
            : "bg-primary"
        }`}
      >
        <h3 className='flex-1 flex justify-between md:text-xl text-white'>
          <span>Общая стоимость:</span>
          <span>{item.totalSum}</span>
        </h3>
        <div className='md:flex-1 text-right'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='w-8 h-8 md:w-10 md:h-10 p-2 border transition-all hover:scale-110 hover:shadow-lg'
                  variant='link'
                  onClick={() => handleDelete(item.formId)}
                >
                  <img src='/trash.svg' alt='trash can' />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                sideOffset={5}
                className='py-1 px-3 rounded-md shadow-md bg-[#0066B0] text-white'
              >
                <p>Удалить</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </li>
  );
};

export default HistoryItem;
