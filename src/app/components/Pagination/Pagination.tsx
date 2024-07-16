import ReactPaginate from "react-paginate";
import type { PaginationProps } from "@/app/components/Pagination/Pagination.props";

export default function Pagination({ setPage, pageQty, page }: PaginationProps) {
    return (
        <ReactPaginate
            className="pagination"
            forcePage={page}
            breakLabel="..."
            previousLabel="←"
            nextLabel="→"
            onPageChange={(e) => {
                setPage(e.selected);
            }}
            pageRangeDisplayed={3}
            pageCount={pageQty}
        />
    );
}
