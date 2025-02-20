import PricesPagination from "@/components/dashboard/prices/pricesTable/Paginatino";
import RowSkeleton from "@/components/dashboard/prices/pricesTable/RowSkeleton";
import PriceActions from "@/components/dashboard/prices/pricesTable/PriceActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useState } from "react";
import { Area } from "@/types/area";
import { useSearchParams } from "react-router-dom";

type PricesTableProps = {
  prices: Area[];
  setPrices: React.Dispatch<React.SetStateAction<Area[]>>;
  allPrices: Area[];
  setAllPrices: React.Dispatch<React.SetStateAction<Area[]>>;
};

const PricesTable: React.FC<PricesTableProps> = ({
  prices,
  setPrices,
  allPrices,
  setAllPrices,
}) => {
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    setTotalPages(Math.ceil(allPrices.length / 10));
    setPrices(allPrices.slice(start, end));
  }, [currentPage, allPrices]);

  async function getPrices() {
    try {
      const q = query(collection(db, "prices"), orderBy("type"));
      const res = await getDocs(q);

      const data = res.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      }) as Area[];
      setAllPrices(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (allPrices.length === 0) {
      getPrices();
    }
  }, [allPrices]);

  return (
    <div className='flex-1 flex flex-col'>
      {prices.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=''>Тип продукта</TableHead>
              <TableHead>Толщина панели</TableHead>
              <TableHead>Толщина металла</TableHead>
              <TableHead>Наполнитель</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead className='text-right'>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices.map((price) => (
              <TableRow key={price.id} className='group'>
                <TableCell className='py-1'>{price.type}</TableCell>
                <TableCell className='py-1'>{price.panelThickness}</TableCell>
                <TableCell className='py-1'>{price.coverThickness}</TableCell>
                <TableCell className='py-1'>{price.filler}</TableCell>
                <TableCell className='py-1'>{price.price}</TableCell>
                <TableCell className='opacity-0 group-hover:opacity-100 transition-all py-1'>
                  <PriceActions price={price} setPrices={setPrices} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <RowSkeleton />
      )}
      <PricesPagination totalPages={totalPages} />
    </div>
  );
};

export default PricesTable;
