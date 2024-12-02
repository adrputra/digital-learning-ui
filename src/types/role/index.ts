/* eslint-disable @typescript-eslint/no-unused-vars */
interface RoleMapping {
  id: string;
  menu_id: string;
  role_id: string;
  role_name: string;
  menu_name: string;
  menu_route: string;
  access_method: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

interface Menu {
  access_method: string;
  id: string;
  menu_name: string;
  menu_route: string;
  role_id: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

interface Role {
  id: string;
  role_name: string;
  role_desc: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  is_active: boolean;
}

interface RequestNewMenu {
  id: string;
  menu_name: string;
  menu_route: string;
}

interface RequestNewRoleMapping {
  role_id: string;
  menu_id: string;
  access_method: string;
}
