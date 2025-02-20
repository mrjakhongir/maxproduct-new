import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/config/firebase";
import { Area } from "@/types/area";
import { doc, updateDoc } from "firebase/firestore";
import { Edit2 } from "lucide-react";
import { useState } from "react";

type EditModalProps = {
  price: Area;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPrices: React.Dispatch<React.SetStateAction<Area[]>>;
};

const EditModal: React.FC<EditModalProps> = ({
  price,
  openModal,
  setOpenModal,
  setPrices,
}) => {
  const [newPrice, setNewPrice] = useState("");
  const [loading, setLoading] = useState(false);

  async function updatePrice() {
    try {
      setLoading(true);
      await updateDoc(doc(db, "prices", price.id), {
        price: newPrice,
      });
      setPrices((prev) =>
        prev.map((item) => {
          if (item.id === price.id) {
            return {
              ...item,
              price: newPrice,
            };
          }
          return item;
        })
      );
      setLoading(false);
      setOpenModal(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button className='rounded-tr-none rounded-br-none bg-[#F0AD4E] hover:bg-[#F0AD4E]/90'>
          <Edit2 />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Редактировать</DialogTitle>
          <DialogDescription>
            <span>
              После редактирования старая цена будет заменена на новую
            </span>
            <br />
            <strong>
              {price.type} / {price.panelThickness} / {price.coverThickness} /{" "}
              {price.filler}
            </strong>
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center gap-2'>
          <Label htmlFor='name' className='text-right flex-1'>
            Цена (USZ):
          </Label>
          <Input
            id='name'
            defaultValue={price.price}
            className='flex-[3]'
            type='number'
            required
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type='submit' onClick={updatePrice}>
            {loading ? "Загрузка..." : "Обновить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
