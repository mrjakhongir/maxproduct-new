import Filters from "@/components/calculator/Filters";
import { ProductForm } from "@/components/calculator/form/Form";
import History from "@/components/calculator/history/History";
import Container from "@/components/Container";
import { db } from "@/config/firebase";
import { initializeForms, setIsFetching } from "@/redux/slices/formSlice";
import { RootState } from "@/redux/store";
import { FormResponse } from "@/types/area";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Calculator = () => {
  const { groupId } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();

  useEffect(() => {
    getForms();
  }, []);

  async function getForms() {
    const formsRef = collection(db, "forms");
    if (groupId) {
      try {
        dispatch(setIsFetching(true));
        const q = query(
          formsRef,
          where("groupId", "==", groupId),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
            createdAt: doc.data().createdAt?.toMillis(),
          };
        }) as FormResponse[];
        dispatch(initializeForms(data));
        dispatch(setIsFetching(false));
      } catch (err) {
        console.log(err);
        dispatch(setIsFetching(false));
      } finally {
        dispatch(setIsFetching(false));
      }
    }
  }
  return (
    <Container className='py-10 max-w-3xl flex flex-col gap-10 lg:gap-5 lg:flex-row lg:h-[calc(100svh-80px)]'>
      <div className='flex-1'>
        <Filters />
        <ProductForm />
      </div>
      <History />
    </Container>
  );
};

export default Calculator;
