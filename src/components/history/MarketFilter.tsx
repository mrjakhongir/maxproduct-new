import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";

const MarketFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className='flex mb-5'>
      <Button
        variant='link'
        className={`text-[#006bb0] text-lg ${
          searchParams.get("market") === "Местный" && "underline"
        }`}
        onClick={() => setSearchParams({ market: "Местный" })}
      >
        Местный
      </Button>
      <Button
        variant='link'
        className={`text-lg ${
          searchParams.get("market") === "Иностранный" && "underline"
        }`}
        onClick={() => setSearchParams({ market: "Иностранный" })}
      >
        Иностранный
      </Button>
    </div>
  );
};

export default MarketFilter;
