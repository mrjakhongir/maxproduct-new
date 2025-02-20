import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FormItemProps } from "@/types/area";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFeature } from "@/lib/utils";

const SelectCoverThickness: React.FC<FormItemProps> = ({ control }) => {
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    getTypes();
  }, []);

  async function getTypes() {
    const data = await getFeature("coverThickness");
    setTypes(data);
  }

  return (
    <FormField
      control={control}
      name='coverThickness'
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel className='text-[12px] text-slate-600'>
            Толщина металла:
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className='min-w-[130px]'>
                  <SelectValue placeholder={field.value} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default SelectCoverThickness;
