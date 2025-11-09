export interface Business {
  id: string;
  name: string;
  vertical: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  businessId?: string;
  role?: string;
  [key: string]: any;
}
