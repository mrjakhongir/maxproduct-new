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
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import Actions from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addForm, setLoading } from "@/redux/slices/formSlice";
import FieldLabel from "./FieldLabel";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export function ProductForm() {
  const [searchParams] = useSearchParams();
  const { groupId, forms } = useSelector((state: RootState) => state.form);
  const { user } = useSelector((state: RootState) => state.auth);
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
    const hasDoc = forms.length > 0;
    const newForm = {
      formId: uuidv4(),
      ...data,
    };
    try {
      dispatch(setLoading(true));
      const docRef = doc(db, "forms", groupId);

      if (hasDoc) {
        await updateDoc(docRef, {
          forms: arrayUnion(newForm),
        });
      } else {
        await setDoc(docRef, {
          userId: user?.uid,
          forms: [newForm],
          market: searchParams.get("market") || "Местный",
        });
      }
      dispatch(addForm(newForm));
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error adding form", error);
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
