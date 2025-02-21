import { calculatePrice } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

type PriceProps = {
  topPrice: number;
  bottomPrice: number;
  area: number;
  discount: number;
};

const Price: React.FC<PriceProps> = ({
  topPrice,
  bottomPrice,
  area,
  discount,
}) => {
  const [searchParams] = useSearchParams();
  const market = searchParams.get("market") || "Местный";
  const { exchangeRate } = useSelector(
    (state: RootState) => state.exchangeRate
  );
  const { formattedEndPrice, formattedTotalPriceWithDiscount } = calculatePrice(
    topPrice,
    bottomPrice,
    discount,
    area,
    market,
    exchangeRate
  );
  return (
    <div
      className={`${
        searchParams.get("market") === "Местный" ? "bg-[#0066B0]" : "bg-primary"
      } rounded-lg`}
    >
      <ul className='flex flex-col justify-between p-2 text-white'>
        <li className='flex justify-between'>
          <span>Цена:</span>
          <span>{formattedEndPrice}</span>
        </li>
        <li className='flex justify-between'>
          <span>Общая стоимость:</span>
          <span>{formattedTotalPriceWithDiscount}</span>
        </li>
      </ul>
    </div>
  );
};

export default Price;
