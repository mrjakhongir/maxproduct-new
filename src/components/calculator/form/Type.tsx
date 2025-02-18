import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormItemProps, Types } from "@/types/area";
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

const Type: React.FC<FormItemProps> = ({ control }) => {
  const [types, setTypes] = useState<Types[]>([]);

  useEffect(() => {
    async function getTypes() {
      try {
        const querySnapshot = await getDocs(collection(db, "types"));
        const data = querySnapshot.docs
          .map((doc) => ({
            ...doc.data(),
          }))
          .sort((a, b) => a.id - b.id) as Types[];
        setTypes(data);
      } catch (err) {
        console.log(err);
      }
    }
    getTypes();
  }, []);
  return (
    <FormField
      control={control}
      name='type'
      render={({ field }) => (
        <FormItem className='flex items-center gap-4'>
          <FieldLabel content='Тип продукта:' />
          <div className='flex-1'>
            <FormControl>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className='md:text-lg'>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {types ? (
                    types.map((type) => (
                      <SelectItem
                        key={type.id}
                        value={type.name}
                        className='md:text-lg'
                      >
                        {type.name}
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

export default Type;
