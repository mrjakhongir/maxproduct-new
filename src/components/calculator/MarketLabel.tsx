import { SetStateAction } from "react";

type MarketLabelProps = {
  content: string;
  trigger?: React.Dispatch<SetStateAction<string>>;
  market?: string;
  src: string;
};

function MarketLabel({ content, src, market }: MarketLabelProps) {
  return (
    <div
      className={`flex-1 flex items-center justify-between text-white md:text-xl py-2 px-2 md:px-3 xl:px-4 transition-all cursor-pointer rounded-md hover:opacity-100 select-none ${
        content === "Foreign" ? "bg-[#E31E24]" : "bg-[#0066B0]"
      } ${market === content ? "opacity-100" : "opacity-60"}`}
    >
      <div className='flex items-center gap-1 md:gap-2'>
        <img src={src} alt='icon' width={24} height={24} />
        <span className='font-semibold'>
          {content === "Foreign" ? "Иностранный" : "Местный"}
        </span>
      </div>
    </div>
  );
}

export default MarketLabel;
