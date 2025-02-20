import { Area } from "@/types/area";
import { useState } from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

type PriceActionsProps = {
  price: Area;
  setPrices: React.Dispatch<React.SetStateAction<Area[]>>;
};

const PriceActions: React.FC<PriceActionsProps> = ({ price, setPrices }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className='flex justify-end'>
      <EditModal
        price={price}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setPrices={setPrices}
      />
      <DeleteModal priceId={price.id} setPrices={setPrices} />
    </div>
  );
};

export default PriceActions;
