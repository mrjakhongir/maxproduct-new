import { NewArea } from "@/types/area";
import { AccordionContent } from "../ui/accordion";

type HistoryItemProps = {
  item: NewArea;
};

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  return (
    <AccordionContent key={item.formId}>
      <ul className='flex flex-col gap-1'>
        <li className='flex justify-between'>
          <span>Тип продукта:</span>
          <span className='font-semibold'>{item.type}</span>
        </li>
        <li className='flex justify-between'>
          <span>Толщина панели:</span>
          <span className='font-semibold'>{item.panelThickness}</span>
        </li>
        <li className='flex justify-between'>
          <span>Толщина верхнего металла:</span>
          <span className='font-semibold'>{item.topThickness}</span>
        </li>
        <li className='flex justify-between'>
          <span>Толщина нижнего металла:</span>
          <span className='font-semibold'>{item.bottomThickness}</span>
        </li>
        <li className='flex justify-between'>
          <span>Наполнитель:</span>
          <span className='font-semibold'>{item.filler}</span>
        </li>
        <li className='flex items-center justify-between bg-[#0066B0] text-white p-2 rounded-md'>
          <span>Цена:</span>
          <span className='font-semibold'>{item.price}</span>
        </li>
      </ul>
    </AccordionContent>
  );
};

export default HistoryItem;
