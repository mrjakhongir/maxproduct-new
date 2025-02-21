import { db } from "@/config/firebase";
import { clsx, type ClassValue } from "clsx";
import { doc, getDoc } from "firebase/firestore";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getFeature(feature: string) {
  try {
    const docRef = doc(db, "features", feature);
    const querySnapshot = await getDoc(docRef);
    const res = querySnapshot.data();
    if (res) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
}

export function formatString(price: number, market: string) {
  const marketCurrency = market === "Местный" ? "UZS" : "USD";
  const fraction = market === "Местный" ? 0 : 2;
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: marketCurrency,
    minimumFractionDigits: fraction,
  }).format(price);

  return formattedPrice;
}

export async function getExchangeRate() {
  try {
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/40a0d00e41ff37fb9e17b47f/latest/USD"
    );
    const data = await response.json();
    return data.conversion_rates.UZS;
  } catch (err) {
    console.log(err);
  }
}

export function calculatePrice(
  upPrice: number,
  lowPrice: number,
  discount: number,
  area: number,
  market: string,
  exchangeRate: number
) {
  const price = ((upPrice + lowPrice) / 2) * (1 - Number(discount) / 100);
  const endPrice = market === "Местный" ? price : price / 1.12 / exchangeRate;
  const totalPrice = Number(area) * endPrice;
  const totalPriceWithDiscount = totalPrice * (1 - Number(discount) / 100);
  const formattedEndPrice = formatString(endPrice, market);
  const formattedTotalPriceWithDiscount = formatString(
    totalPriceWithDiscount,
    market
  );
  return { formattedEndPrice, formattedTotalPriceWithDiscount };
}
