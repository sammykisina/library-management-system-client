import { number, object, string } from "zod";

const APIUser = object({
  id: number(),
  type: string(),
  attributes: object({
    name: string(),
    email: string(),
  }),
});

const APITypes = {
  APIUser,
};

export default APITypes;
