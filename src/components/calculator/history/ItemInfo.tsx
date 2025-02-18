type ItemInfoProps = {
  label: string;
  value: string;
};

const ItemInfo: React.FC<ItemInfoProps> = ({ label, value }) => {
  return (
    <li className='flex justify-between py-1 whitespace-nowrap'>
      <span className='text-slate-700 whitespace-nowrap'>{label}</span>
      <span className='font-semibold whitespace-nowrap'>{value}</span>
    </li>
  );
};

export default ItemInfo;
