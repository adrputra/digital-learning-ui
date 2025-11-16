/* eslint-disable @typescript-eslint/no-unused-vars */
interface Institution {
  id: string;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

interface RequestNewInstitution extends Pick<Institution, 'name' | 'address' | 'phone_number' | 'email'> {}

interface RequestEditInstitution extends Pick<Institution, 'id' | 'name' | 'address' | 'phone_number' | 'email'> {}