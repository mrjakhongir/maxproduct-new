import MarketLabel from "./MarketLabel";

const Markets = () => {
  return (
    <div className='flex gap-2 md:gap-4'>
      <MarketLabel src='/pin.svg' market='Местный' />
      <MarketLabel src='/globe.svg' market='Иностранный' />
    </div>
  );
};

export default Markets;
