import { API } from "./api";

const UserAPI = {
  getUsers: async () => API.get("/admin/users?filter[role.slug]=user"),
};

export default UserAPI;
