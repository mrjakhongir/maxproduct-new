import { formatTimestamp } from "@/lib/utils";
import { FormsResponse } from "@/types/area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type HistoryListProps = {
  data: FormsResponse[];
};
const HistoryList: React.FC<HistoryListProps> = ({ data }) => {
  return (
    <div className='max-w-xl mx-auto'>
      <Accordion type='single' collapsible className='w-full'>
        {data.map((feature, index) => (
          <AccordionItem key={index} value={feature.id}>
            <AccordionTrigger>
              {feature.id} - {formatTimestamp(+feature.id)}
            </AccordionTrigger>
            {feature.forms.map((form) => (
              <AccordionContent key={form.formId}>
                <ul className='flex flex-col gap-1'>
                  <li className='flex justify-between'>
                    <span>Тип продукта:</span>
                    <span className='font-semibold'>{form.type}</span>
                  </li>
                  <li className='flex justify-between'>
                    <span>Толщина панели:</span>
                    <span className='font-semibold'>{form.panelThickness}</span>
                  </li>
                  <li className='flex justify-between'>
                    <span>Толщина верхнего металла:</span>
                    <span className='font-semibold'>{form.topThickness}</span>
                  </li>
                  <li className='flex justify-between'>
                    <span>Толщина нижнего металла:</span>
                    <span className='font-semibold'>
                      {form.bottomThickness}
                    </span>
                  </li>
                  <li className='flex justify-between'>
                    <span>Наполнитель:</span>
                    <span className='font-semibold'>{form.filler}</span>
                  </li>
                  <li className='flex items-center justify-between bg-[#0066B0] text-white p-2 rounded-md'>
                    <span>Цена:</span>
                    <span className='font-semibold'>{form.price}</span>
                  </li>
                </ul>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default HistoryList;
