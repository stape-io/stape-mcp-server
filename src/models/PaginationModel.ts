export interface PaginationModel<T> {
  items: T[];
  page: number;
  perPage: number;
  total: number;
}
