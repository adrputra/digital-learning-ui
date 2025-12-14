/**
 * Pagination response structure from backend API
 */
export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

/**
 * Standard API response structure with pagination
 */
export interface PaginatedResponse<T> {
  code: number;
  message: string;
  data: T[];
  pagination: PaginationResponse;
}

/**
 * Pagination state interface for stores
 */
export interface PaginationState {
  page: number;
  limit: number;
  total: number; // total pages
  totalRecords: number; // total records
}

/**
 * Default pagination state values
 */
export const DEFAULT_PAGINATION: PaginationState = {
  page: 1,
  limit: 10,
  total: 1,
  totalRecords: 0,
};

/**
 * Reset pagination state to default values
 */
export const resetPagination = (): PaginationState => ({
  ...DEFAULT_PAGINATION,
});

/**
 * Extract pagination state from API response
 */
export const extractPagination = (
  pagination?: PaginationResponse,
  fallbackPage?: number,
  fallbackLimit?: number
): PaginationState => {
  return {
    page: pagination?.page || fallbackPage || DEFAULT_PAGINATION.page,
    limit: pagination?.limit || fallbackLimit || DEFAULT_PAGINATION.limit,
    total: pagination?.total_pages || DEFAULT_PAGINATION.total,
    totalRecords: pagination?.total || DEFAULT_PAGINATION.totalRecords,
  };
};

