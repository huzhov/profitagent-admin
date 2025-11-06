import axios from "axios";

export type User = {
  id: string;
  email: string;
  name: string;
  businessId: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

const TOKEN_KEY = "auth_token";

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/* Hardcoded login */
export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    if (email === "profitagent@gmail.com" && password === "123456")
      setToken("email");
    else throw "Incorrect Email/Password";

    return {
      token: "token",
      user: {
        id: "1",
        email: "profitagent@gmail.com",
        name: "profitagent",
        businessId: "1",
      },
    };
  } catch (error: any) {
    let msg = "Login failed";
    throw new Error(`${msg} (${error || ""})`);
  }
}

/* Login with Endpoint */
// export async function login(
//   email: string,
//   password: string
// ): Promise<LoginResponse> {

//   try {
//     const { data } = await axios.post<{
//       token: string;
//       user: User;
//     }>(`${import.meta.env.VITE_BACKEND_URL}/login`, {
//       email,
//       password,
//     });

//     if (!data?.token) throw new Error("Invalid login response: missing token");
//     setToken(data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));
//     return data;
//   } catch (error: any) {
//     let msg = "Login failed";
//     if (axios.isAxiosError(error)) {
//       const errData = error.response?.data;
//       msg =
//         errData?.message ||
//         errData?.error?.message ||
//         errData?.error ||
//         errData?.detail ||
//         errData?.title ||
//         error.message ||
//         msg;
//       throw new Error(`${msg} (${error.response?.status || ""})`);
//     }
//     throw error;
//   }
// }

export async function signup({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}): Promise<LoginResponse> {
  try {
    const { data } = await axios.post<{
      token: string;
      user: User;
    }>(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
      email,
      name,
      password,
    });
    if (!data?.token) throw new Error("Invalid login response: missing token");
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  } catch (error: any) {
    let msg = "Login failed";
    if (axios.isAxiosError(error)) {
      const errData = error.response?.data;
      msg =
        errData?.message ||
        errData?.error?.message ||
        errData?.error ||
        errData?.detail ||
        errData?.title ||
        error.message ||
        msg;
      throw new Error(`${msg} (${error.response?.status || ""})`);
    }
    throw error;
  }
}
