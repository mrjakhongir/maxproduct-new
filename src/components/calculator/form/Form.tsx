import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Area } from "@/types/area";
import Type from "./Type";
import PanelThickness from "./PanelThickness";
import UpperCoverThickness from "./UpperCoverThickness";
import LowerCoverThickness from "./LowerCoverThickness";
import Filler from "./Filler";
import { Card } from "@/components/ui/card";
import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import Actions from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addForm, setLoading } from "@/redux/slices/formSlice";
import FieldLabel from "./FieldLabel";

export function ProductForm() {
  const { groupId } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  const form = useForm<Area>({
    defaultValues: {
      type: "Стеновые",
      panelThickness: "50 MM",
      topThickness: "0.35 MM",
      bottomThickness: "0.35 MM",
      filler: "Базальт",
      area: 300,
      discount: 0,
    },
  });

  async function onSubmit(data: Area) {
    try {
      dispatch(setLoading(true));
      const docRef = collection(db, "forms");
      await addDoc(docRef, {
        groupId,
        ...data,
        createdAt: new Date(),
      });
      dispatch(addForm({ ...data, id: docRef.id }));
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error adding form", error);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
    localStorage.setItem("groupId", groupId);
  }

  return (
    <Card className='px-3 py-5 mt-3 shadow-lg'>
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <Type control={form.control} />
          <PanelThickness control={form.control} />
          <UpperCoverThickness control={form.control} />
          <LowerCoverThickness control={form.control} />
          <Filler control={form.control} />

          <FormField
            control={form.control}
            name='area'
            render={({ field }) => (
              <FormItem className='flex items-center gap-4'>
                <FieldLabel content='Общий объём (м2):' />
                <div className='flex-1'>
                  <FormControl>
                    <Input {...field} className='md:!text-lg' type='number' />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='discount'
            render={({ field }) => (
              <FormItem className='flex items-center gap-4'>
                <FieldLabel content='Скидка (%):' />
                <div className='flex-1'>
                  <FormControl>
                    <Input
                      {...field}
                      className='md:!text-lg'
                      type='number'
                      value={field.value || "Введите скидку..."}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <Actions />
        </form>
      </Form>
    </Card>
  );
}
