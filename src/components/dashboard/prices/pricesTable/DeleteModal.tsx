import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase";
import { Area } from "@/types/area";
import { deleteDoc, doc } from "firebase/firestore";
import { Trash2 } from "lucide-react";

type DeleteModalProps = {
  priceId: string;
  setPrices: React.Dispatch<React.SetStateAction<Area[]>>;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ priceId, setPrices }) => {
  async function deletePrice(priceId: string) {
    try {
      await deleteDoc(doc(db, "prices", priceId));
      setPrices((prev) => prev.filter((price) => price.id !== priceId));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='rounded-tl-none rounded-bl-none'>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы действительно хотите удалить эту цену?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Это действие необратимо.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction onClick={() => deletePrice(priceId)}>
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
