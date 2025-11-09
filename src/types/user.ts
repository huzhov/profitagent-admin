export interface User {
  businessId: string | null;
  email: string | null;
  id: string | null;
  name: string | null;
}

export interface UserStore {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}
