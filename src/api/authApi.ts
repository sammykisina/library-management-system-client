import type { LoginData, SignupData } from "src/types/typings.t";
import { API } from "./api";

const AuthAPI = {
  login: async (data: LoginData) => API.post("/auth/login", data),
  signup: async (data: SignupData) => API.post("/auth/register", data),
  profile: async (data: { email: string }) => API.post("/users/profile", data),
  updatePassword: async (data: { email: string; password: string }) =>
    API.post("/users/profile/password-reset", data),
};

export default AuthAPI;
