import Title from "@/components/dashboard/Title";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PricesTable from "@/components/dashboard/prices/pricesTable/PricesTable";
import NewPriceModal from "@/components/dashboard/prices/addPrice/NewPriceModal";
import { useState } from "react";
import PriceFilter from "@/components/dashboard/prices/priceFilter/PriceFilter";
import { Area } from "@/types/area";

const Prices = () => {
  const [allPrices, setAllPrices] = useState<Area[]>([]);
  const [prices, setPrices] = useState<Area[]>([]);

  return (
    <section className='h-full overflow-y-scroll flex flex-col'>
      <div className='flex justify-between pb-5'>
        <Link
          to='..'
          className='inline-flex items-center justify-start gap-2 px-3 py-1 group border border-transparent hover:border-slate-400 rounded-md'
        >
          <MoveLeft
            color='#333'
            size={22}
            className='transition-transform group-hover:-translate-x-1'
          />
          <Title content='Прайсы' />
        </Link>
        <NewPriceModal setPrices={setPrices} />
      </div>
      <PriceFilter setAllPrices={setAllPrices} />
      <PricesTable
        prices={prices}
        setPrices={setPrices}
        setAllPrices={setAllPrices}
        allPrices={allPrices}
      />
    </section>
  );
};

export default Prices;
