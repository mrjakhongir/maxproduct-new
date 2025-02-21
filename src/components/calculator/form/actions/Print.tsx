import { Button } from "@/components/ui/button";
import { clearForms } from "@/redux/slices/formSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Print = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Button
      variant='outline'
      className='flex-1 md:text-xl font-semibold text-slate-800 space-x-1'
      size='lg'
      onClick={() => {
        navigate("/preview");
        dispatch(clearForms());
      }}
    >
      <img src='/print.svg' alt='icon' width={20} height={20} />
      <span>Печать</span>
    </Button>
  );
};

export default Print;
