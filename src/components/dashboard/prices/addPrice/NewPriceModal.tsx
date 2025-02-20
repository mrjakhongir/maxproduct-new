import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ModalForm from "./ModalForm";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Area } from "@/types/area";

type NewPriceModalProps = {
  setPrices: React.Dispatch<React.SetStateAction<Area[]>>;
};

const NewPriceModal: React.FC<NewPriceModalProps> = ({ setPrices }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button className='bg-[#0066B0]'>
          <PlusCircle />
          <span>Добавить</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[465px]'>
        <DialogHeader>
          <DialogTitle className='text-xl md:text-2xl'>
            Добавить цену
          </DialogTitle>
          <DialogDescription>
            Заполните поля для добавления новой цены
          </DialogDescription>
        </DialogHeader>
        <ModalForm setOpenModal={setOpenModal} setPrices={setPrices} />
      </DialogContent>
    </Dialog>
  );
};

export default NewPriceModal;
