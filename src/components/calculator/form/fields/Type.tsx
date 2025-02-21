import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormItemProps } from "@/types/area";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FieldLabel from "../FieldLabel";
import { getFeature } from "@/lib/utils";

const Type: React.FC<FormItemProps> = ({ control }) => {
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    getTypes();
  }, []);

  async function getTypes() {
    const data = await getFeature("types");
    setTypes(data);
  }

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
                  {types.map((type) => (
                    <SelectItem key={type} value={type} className='md:text-lg'>
                      {type}
                    </SelectItem>
                  ))}
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
