import type { LoginData, SignupData } from "src/types/typings.t";
import { API } from "./api";

const AuthAPI = {
  login: async (data: LoginData) => API.post("/auth/login", data),

  signup: async (data: SignupData) => API.post("/auth/register", data),

  profile: async (userId: number) => API.get(`/users/${userId}/profile}`),

  updatePassword: async (data: { email: string; password: string }) =>
    API.post("/users/users/password-reset", data),
};

export default AuthAPI;
