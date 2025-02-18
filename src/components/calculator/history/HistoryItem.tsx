import { FormResponse } from "@/types/area";
import ItemInfo from "./ItemInfo";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useDispatch } from "react-redux";
import { deleteForm } from "@/redux/slices/formSlice";
import { useRef } from "react";

type HistoryItemProps = {
  data: FormResponse;
};

const HistoryItem: React.FC<HistoryItemProps> = ({ data }) => {
  const dispatch = useDispatch();
  const itemRef = useRef<HTMLLIElement | null>(null);
  async function handleDelete(id: string) {
    itemRef.current?.classList.add("animate-slide-fade-out");
    setTimeout(() => {
      dispatch(deleteForm(id));
    }, 500);
    await deleteDoc(doc(db, "forms", id));
  }
  return (
    <li
      ref={itemRef}
      className={`py-3 px-2 rounded-lg border animate-slide-fade-in shadow-md`}
    >
      <div className='flex flex-col md:flex-row justify-between'>
        <ul className='md:w-1/2 md:pr-2'>
          <ItemInfo label='Тип продукта:' value={data.type} />
          <ItemInfo label='Общий объём (м2):' value={String(data.area)} />
          <ItemInfo label='Скидка (%):' value={String(data.discount)} />
          <ItemInfo label='Цена:' value={String(data.discount)} />
        </ul>
        <ul className='md:w-1/2 md:pl-2'>
          <ItemInfo label='Наполнитель:' value={data.filler} />
          <ItemInfo label='Толщина панели:' value={data.panelThickness} />
          <ItemInfo
            label='Толщина верхнего металла:'
            value={data.topThickness}
          />
          <ItemInfo
            label='Толщина нижнего металла:'
            value={data.bottomThickness}
          />
        </ul>
      </div>
      <div className='flex justify-between items-center bg-[#0066B0] py-1 px-2 md:px-4 rounded-lg mt-4 gap-4'>
        <h3 className='flex-1 flex justify-between md:text-xl text-white'>
          <span>Общая стоимость:</span>
          <span>USZ 0</span>
        </h3>
        <div className='md:flex-1 text-right'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='w-8 h-8 md:w-10 md:h-10 p-2 border transition-all hover:scale-110 hover:shadow-lg'
                  variant='link'
                  onClick={() => handleDelete(data.id)}
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
