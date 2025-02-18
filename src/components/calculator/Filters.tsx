import MarketLabel from "./MarketLabel";

const Filters = () => {
  return (
    <div className='flex gap-2 md:gap-4'>
      <MarketLabel content='Local' src='/pin.svg' />
      <MarketLabel content='Foreign' src='/globe.svg' />
    </div>
  );
};

export default Filters;
