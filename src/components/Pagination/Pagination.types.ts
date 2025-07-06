export type PaginationProps = {
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  maxPageButtons?: number; // Optional prop to limit the number of page buttons shown
};
