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
import { Loader } from "lucide-react";
import FieldLabel from "../FieldLabel";
import { getFeature } from "@/lib/utils";

const Filler: React.FC<FormItemProps> = ({ control }) => {
  const [filler, setFiller] = useState<string[]>([]);

  useEffect(() => {
    getFiller();
  }, []);
  async function getFiller() {
    const data = await getFeature("fillers");
    setFiller(data);
  }
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
                  {filler.length > 0 ? (
                    filler.map((filler) => (
                      <SelectItem
                        key={filler}
                        value={filler}
                        className='md:text-lg'
                      >
                        {filler}
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
