import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";

type PaginationProps = {
  totalPages: number;
};

const PricesPagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    setSearchParams({ page: page.toString() });
  }

  return (
    <Pagination className='mt-auto'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => goToPage(currentPage - 1)}
            isActive={currentPage !== 1}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={`?page=${i + 1}`}
              isActive={currentPage === i + 1}
              onClick={(e) => {
                e.preventDefault();
                goToPage(i + 1);
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => goToPage(currentPage + 1)}
            isActive={currentPage !== totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PricesPagination;
