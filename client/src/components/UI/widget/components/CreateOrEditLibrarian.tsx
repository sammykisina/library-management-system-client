import { librarianManagementSchemas } from "@/schemas";
import type { z } from "zod";
import { useUsers } from "@/hooks";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Error, SpinnerLoader, WidgetHeader } from "@/components";
import { librarianAtoms } from "@/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";

const CreateOrEditLibrarian = () => {
  const { librarianSchema } = librarianManagementSchemas;
  type LibrarianSchema = z.infer<typeof librarianSchema>;
  const {
    isStoringLibrarian,
    storeLibrarianMutateAsync,
    isUpdatingLibrarian,
    updateLibrarianMutateAsync,
  } = useUsers();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LibrarianSchema>({
    resolver: zodResolver(librarianSchema),
  });

  const {
    globalLibrarianState,
    isEditingLibrarianState,
    showCreateOrEditLibrarianState,
  } = librarianAtoms;
  const [globalLibrarian, setGlobalLibrarian] =
    useRecoilState(globalLibrarianState);
  const [isEditingLibrarian, setIsEditingLibrarian] = useRecoilState(
    isEditingLibrarianState
  );
  const setShowCreateOrEditLibrarian = useSetRecoilState(
    showCreateOrEditLibrarianState
  );

  /**
   * page functions
   */
  const onSubmit: SubmitHandler<LibrarianSchema> = async ({
    email,
    password,
    name,
  }) => {
    isEditingLibrarian
      ? updateLibrarianMutateAsync({
          librarianId: globalLibrarian?.id,
          librarianUpdateData: {
            email,
            name,
            password: password ? password : "admin",
          },
        })
      : storeLibrarianMutateAsync({
          email,
          password: password ? password : "admin",
          name,
        });
  };

  useEffect(() => {
    if (globalLibrarian && isEditingLibrarian) {
      reset({
        email: globalLibrarian?.attributes?.email,
        name: globalLibrarian?.attributes?.name,
      });
    }
  }, [isEditingLibrarian, globalLibrarian, reset]);

  return (
    <section>
      {/* header */}
      <WidgetHeader
        close={() => {
          setGlobalLibrarian(null);
          setIsEditingLibrarian(false);
          setShowCreateOrEditLibrarian(false);
          // clearForm();
        }}
        title={
          !isEditingLibrarian ? "Create A Librarian." : "Update A Librarian."
        }
      />

      {/* body */}
      <form
        className="flex flex-col gap-6 px-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="flex w-full flex-col gap-4 py-3">
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              <label className="inputLabel">Name</label>

              {errors["name"] && (
                <Error errorMessage={errors["name"].message} />
              )}
            </div>

            <div className="relative">
              <input
                type="email"
                {...register("email")}
                className="input peer"
                placeholder="Email"
              />
              <label className="inputLabel">Email</label>

              {errors["email"] && (
                <Error errorMessage={errors["email"].message} />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="password"
                {...register("password")}
                className="input peer"
                placeholder="Password"
              />
              <label className="inputLabel">Password</label>

              {errors["password"] && (
                <Error errorMessage={errors["password"].message} />
              )}
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Button
            title={
              isEditingLibrarian ? (
                isUpdatingLibrarian ? (
                  <SpinnerLoader color="fill-white" />
                ) : (
                  "Edit"
                )
              ) : isStoringLibrarian ? (
                <SpinnerLoader color="fill-white" />
              ) : (
                "Create"
              )
            }
            intent="primary"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default CreateOrEditLibrarian;
