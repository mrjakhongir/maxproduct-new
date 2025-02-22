import { formatTimestamp } from "@/lib/utils";
import { FormsResponse } from "@/types/area";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
import HistoryItem from "./HistoryItem";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearForms } from "@/redux/slices/formSlice";

type HistoryListProps = {
  data: FormsResponse[];
};
const HistoryList: React.FC<HistoryListProps> = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function printOrder(id: string) {
    navigate(`/preview?order=${id}`);
    dispatch(clearForms());
  }
  return (
    <div className='max-w-xl mx-auto'>
      <Accordion type='single' collapsible className='w-full'>
        {data.map((feature, index) => (
          <AccordionItem key={index} value={feature.id}>
            <AccordionTrigger className='group'>
              {feature.id} - {formatTimestamp(+feature.id)}
              <Button
                variant='outline'
                className='ml-auto mr-2 opacity-0 group-hover:opacity-100'
                onClick={() => printOrder(feature.id)}
              >
                Print
              </Button>
            </AccordionTrigger>
            {feature.forms.map((form) => (
              <HistoryItem key={form.formId} item={form} />
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default HistoryList;
