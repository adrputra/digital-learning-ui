/* eslint-disable @typescript-eslint/no-unused-vars */
interface RequestNewParameter {
  key: string;
  value: string;
  description: string;
}

interface Parameter extends RequestNewParameter {
  updated_at: string;
  updated_by: string;
}
