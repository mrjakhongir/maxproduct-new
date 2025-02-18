import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { ProductFiller, FormItemProps } from "@/types/area";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
import FieldLabel from "./FieldLabel";

const Filler: React.FC<FormItemProps> = ({ control }) => {
  const [filler, setFiller] = useState<ProductFiller[]>([]);

  useEffect(() => {
    async function getFiller() {
      try {
        const querySnapshot = await getDocs(collection(db, "filler"));
        const data = querySnapshot.docs
          .map((doc) => ({
            ...doc.data(),
          }))
          .sort((a, b) => a.id - b.id) as ProductFiller[];
        setFiller(data);
      } catch (err) {
        console.log(err);
      }
    }
    getFiller();
  }, []);
  return (
    <FormField
      control={control}
      name='filler'
      render={({ field }) => (
        <FormItem className='flex items-center gap-4'>
          <FieldLabel content='Наполнитель:' />
          <div className='flex-1'>
            <FormControl>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className='md:text-lg'>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filler ? (
                    filler.map((filler) => (
                      <SelectItem
                        key={filler.id}
                        value={filler.name}
                        className='md:text-lg'
                      >
                        {filler.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className='h-10 flex items-center justify-center'>
                      <Loader className='animate-spin' size={20} />
                    </div>
                  )}
                </SelectContent>
              </Select>
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
};

export default Filler;
