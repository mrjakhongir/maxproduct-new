import { ProductForm } from "@/components/calculator/form/Form";
import History from "@/components/calculator/history/History";
import Markets from "@/components/calculator/marketFilter/Markets";
import Container from "@/components/Container";
import { db } from "@/config/firebase";
import { getExchangeRate } from "@/lib/utils";
import { setExchangeRate } from "@/redux/slices/exchangeRateSlice";
import { initializeForms, setIsFetching } from "@/redux/slices/formSlice";
import { RootState } from "@/redux/store";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Calculator = () => {
  const { groupId } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getForms();
    async function fetchExchangeRate() {
      const rate = await getExchangeRate();
      dispatch(setExchangeRate(rate));
    }
    fetchExchangeRate();
    const intervalId = setInterval(fetchExchangeRate, 2 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  async function getForms() {
    if (groupId) {
      try {
        dispatch(setIsFetching(true));
        const docRef = doc(db, "forms", groupId);
        const docSnap = await getDoc(docRef);
        const data = await docSnap.data()?.forms;
        if (data) {
          dispatch(initializeForms(data));
          setSearchParams({ market: docSnap.data()?.market });
        }

        dispatch(setIsFetching(false));
      } catch (err) {
        console.log(err);
        dispatch(setIsFetching(false));
      } finally {
        dispatch(setIsFetching(false));
      }
    }
    if (!searchParams.get("market")) {
      setSearchParams({ market: "Местный" });
    }
  }

  return (
    <Container className='py-6 max-w-3xl flex flex-col gap-10 lg:gap-5 lg:flex-row lg:h-[calc(100svh-100px)]'>
      <div className='flex-1'>
        <Markets />
        <ProductForm />
      </div>
      <History />
    </Container>
  );
};

export default Calculator;
