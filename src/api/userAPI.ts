import { API } from "./api";

const UserAPI = {
  getUsers: async () =>
    API.get("/admin/users?include=bookBorrows&filter[role.slug]=user"),

  getLibrarians: async () => API.get("/admin/users?filter[role.slug]=admin"),

  createLibrarian: async (data: {
    name: string;
    email: string;
    password: string;
  }) => API.post("/admin/librarians", data),

  updateLibrarian: async (data: {
    librarianId: number;
    librarianUpdateData: {
      name: string;
      email: string;
      password: string;
    };
  }) =>
    API.patch(
      `/admin/librarians/${data.librarianId}`,
      data.librarianUpdateData
    ),

  deleteLibrarian: (librarianId: number) =>
    API.delete(`/admin/librarians/${librarianId}`),
};

export default UserAPI;
