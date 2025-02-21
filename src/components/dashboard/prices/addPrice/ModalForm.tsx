import CoverThickness from "@/components/calculator/form/fields/CoverThickness";
import FieldLabel from "@/components/calculator/form/FieldLabel";
import Filler from "@/components/calculator/form/fields/Filler";
import PanelThickness from "@/components/calculator/form/fields/PanelThickness";
import Type from "@/components/calculator/form/fields/Type";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { db } from "@/config/firebase";
import { Area } from "@/types/area";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ModalFormProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPrices: React.Dispatch<React.SetStateAction<Area[]>>;
};

const ModalForm: React.FC<ModalFormProps> = ({ setOpenModal, setPrices }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<Area>({
    defaultValues: {
      type: "Стеновые",
      panelThickness: "50 MM",
      coverThickness: "0.35 MM",
      filler: "Базальт",
      price: "",
    },
  });

  async function onSubmit(values: Area) {
    setLoading(true);
    try {
      await addDoc(collection(db, "prices"), values);
      setPrices((prev) => [...prev, values]);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    setOpenModal(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <Type control={form.control} />
        <PanelThickness control={form.control} />
        <CoverThickness control={form.control} />
        <Filler control={form.control} />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FieldLabel content='Цена (USZ):' />
              <div className='flex-1'>
                <FormControl>
                  <Input
                    {...field}
                    className='md:!text-lg'
                    type='number'
                    required
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <hr />
        <div className='flex gap-4'>
          <Button
            type='button'
            className='w-full'
            variant='outline'
            onClick={() => setOpenModal(false)}
          >
            Отменить
          </Button>
          <Button type='submit' className='w-full'>
            {loading ? "Загрузка..." : "Добавить"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ModalForm;
