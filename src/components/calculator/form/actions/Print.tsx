import { Button } from "@/components/ui/button";

const Print = () => {
  return (
    <Button
      variant='outline'
      className='flex-1 md:text-xl font-semibold text-slate-800 space-x-1'
      size='lg'
    >
      <img src='/print.svg' alt='icon' width={20} height={20} />
      <span>Печать</span>
    </Button>
  );
};

export default Print;
