import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { CoverThickness, FormItemProps } from "@/types/area";
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

const UpperCoverThickness: React.FC<FormItemProps> = ({ control }) => {
  const [thickness, setThickness] = useState<CoverThickness[]>([]);

  useEffect(() => {
    async function getThickness() {
      try {
        const querySnapshot = await getDocs(
          collection(db, "upperCoverThickness")
        );
        const data = querySnapshot.docs
          .map((doc) => ({
            ...doc.data(),
          }))
          .sort((a, b) => a.id - b.id) as CoverThickness[];
        setThickness(data);
      } catch (err) {
        console.log(err);
      }
    }
    getThickness();
  }, []);
  return (
    <FormField
      control={control}
      name='topThickness'
      render={({ field }) => (
        <FormItem className='flex items-center gap-4'>
          <FieldLabel content='Толщина верхнего металла:' />
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
                        key={thickness.id}
                        value={thickness.value}
                        className='md:text-lg'
                      >
                        {thickness.value}
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

export default UpperCoverThickness;
