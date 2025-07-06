export type PaginationProps = {
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};
