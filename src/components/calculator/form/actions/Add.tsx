import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Add = () => {
  const { isLoading } = useSelector((state: RootState) => state.form);
  return (
    <Button
      variant='outline'
      className='flex-1 md:text-xl font-semibold text-slate-800 space-x-1'
      size='lg'
      type='submit'
      disabled={isLoading}
    >
      <img src='/plus.svg' alt='icon' width={18} height={18} />
      <span>{isLoading ? "Загрузка..." : "Добавить"}</span>
    </Button>
  );
};

export default Add;
