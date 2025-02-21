import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Area } from "@/types/area";
import { Card } from "@/components/ui/card";
import { db } from "@/config/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import Actions from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addForm, setGroupId, setLoading } from "@/redux/slices/formSlice";
import FieldLabel from "./FieldLabel";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import PanelThickness from "./fields/PanelThickness";
import UpperCoverThickness from "./fields/UpperCoverThickness";
import LowerCoverThickness from "./fields/LowerCoverThickness";
import Filler from "./fields/Filler";
import Type from "./fields/Type";
import Price from "./Price";

export function ProductForm() {
  const [searchParams] = useSearchParams();
  const [topPrice, setTopPrice] = useState(0);
  const [bottomPrice, setBottomPrice] = useState(0);
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
      price: `${(topPrice + bottomPrice) / 2}`,
    };

    let newGroupId = "";
    if (groupId) {
      newGroupId = groupId;
    } else {
      newGroupId = Date.now().toString();
      dispatch(setGroupId(newGroupId));
    }

    try {
      dispatch(setLoading(true));
      const docRef = doc(db, "forms", newGroupId);

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
  }

  // watch every field
  const type = form.watch("type");
  const panelThickness = form.watch("panelThickness");
  const topThickness = form.watch("topThickness");
  const bottomThickness = form.watch("bottomThickness");
  const filler = form.watch("filler");
  const area = form.watch("area");
  const discount = form.watch("discount");

  useEffect(() => {
    getPrice();
  }, [type, panelThickness, topThickness, bottomThickness, filler]);

  async function getPrice() {
    const topThicknessQuery = query(
      collection(db, "prices"),
      where("type", "==", type),
      where("panelThickness", "==", panelThickness),
      where("coverThickness", "==", topThickness),
      where("filler", "==", filler)
    );
    const topSnapshot = await getDocs(topThicknessQuery);
    const topPrice = Number(topSnapshot.docs[0]?.data().price);

    const bottomThicknessQuery = query(
      collection(db, "prices"),
      where("type", "==", type),
      where("panelThickness", "==", panelThickness),
      where("coverThickness", "==", bottomThickness),
      where("filler", "==", filler)
    );
    const bottomSnapshot = await getDocs(bottomThicknessQuery);
    const bottomPrice = Number(bottomSnapshot.docs[0]?.data().price);

    setTopPrice(topPrice);
    setBottomPrice(bottomPrice);
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
                    <Input
                      {...field}
                      className='md:!text-lg'
                      type='number'
                      min={1}
                    />
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
                      min={0}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <Price
            topPrice={topPrice}
            bottomPrice={bottomPrice}
            area={area}
            discount={discount}
          />
          <Actions />
        </form>
      </Form>
    </Card>
  );
}
