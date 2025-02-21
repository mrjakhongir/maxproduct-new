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

const PanelThickness: React.FC<FormItemProps> = ({ control }) => {
  const [thickness, setThickness] = useState<string[]>([]);

  useEffect(() => {
    getTypes();
  }, []);

  async function getTypes() {
    const data = await getFeature("panelThickness");
    setThickness(data);
  }
  return (
    <FormField
      control={control}
      name='panelThickness'
      render={({ field }) => (
        <FormItem className='flex items-center gap-4'>
          <FieldLabel content='Толщина панели:' />
          <div className='flex-1'>
            <FormControl>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className='md:text-lg'>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {thickness ? (
                    thickness.map((thickness) => (
                      <SelectItem
                        key={thickness}
                        value={thickness}
                        className='md:text-lg'
                      >
                        {thickness}
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

export default PanelThickness;
