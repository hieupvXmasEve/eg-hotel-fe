import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ListOrderPaginationProps {
  total_page: number;
  current_page: number;
}

export default function ListOrderPagination({
  total_page,
  current_page,
}: ListOrderPaginationProps) {
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (total_page <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= total_page; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current_page > 3) {
        pages.push(-1); // Represents ellipsis
      }

      // Show current page and surrounding pages
      for (
        let i = Math.max(2, current_page - 1);
        i <= Math.min(total_page - 1, current_page + 1);
        i++
      ) {
        pages.push(i);
      }

      if (current_page < total_page - 2) {
        pages.push(-1); // Represents ellipsis
      }

      // Always show last page
      if (total_page > 1) {
        pages.push(total_page);
      }
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${current_page > total_page ? current_page - 1 : 1}`}
          />
        </PaginationItem>
        {getPageNumbers().map((pageNum, index) => (
          <PaginationItem key={index}>
            {pageNum === -1 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={`?page=${pageNum}`}
                isActive={pageNum === current_page}
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={`?page=${
              current_page < total_page ? current_page + 1 : total_page
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
