import {
  Button,
  Error,
  Notifications,
  SpinnerLoader,
  TabTitle,
  Title,
} from "@/components";
import { useAuth, useProfile } from "@/hooks";
import { appUtils } from "@/utils";
import React from "react";
import type { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchemas } from "@/schemas";

const Profile = () => {
  /**
   * page states
   */
  const { profile, isFetchingProfile } = useProfile();
  const { generateAvatar } = appUtils;
  const { isUpdatingPassword, updatePasswordMutateAsync, user } = useAuth();

  const { passwordUpdateSchema } = authSchemas;
  type PasswordUpdatedSchema = z.infer<typeof passwordUpdateSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordUpdatedSchema>({
    resolver: zodResolver(passwordUpdateSchema),
  });

  /**
   * page functions
   */
  const onSubmit: SubmitHandler<PasswordUpdatedSchema> = async ({
    password,
  }) => {
    if (password === "") {
      Notifications.errorNotification("Enter the new password.");
      return;
    }

    await updatePasswordMutateAsync({
      email: user?.email || "",
      password: password,
    });
  };

  return (
    <section className="h-full">
      {isFetchingProfile ? (
        <div className="themeBorder flex h-full justify-center border">
          <SpinnerLoader color="fill-primary" />
        </div>
      ) : (
        <div className="h-full divide-y divide-primary">
          <div className="py-4">
            <TabTitle titleStyles="text-secondary" title="YOUR INFORMATION." />

            {/* info */}
            <div className="mt-10 flex  justify-center gap-4 ">
              <img
                src={generateAvatar(user?.email || "")}
                className="h-[5rem] w-[5rem] rounded-full"
              />

              <div className="flex flex-col gap-2">
                <span className="w-fit rounded-full bg-[#170140]/10 px-3 py-1 text-sm capitalize leading-loose text-[#170140] shadow-sm">
                  {user?.name}
                </span>
                <span>{user?.email}</span>
              </div>
            </div>
          </div>

          {/* update password */}
          <div>
            <div className="mt-6 flex justify-center ">
              <form
                className="w-full space-y-1 rounded-[2rem] p-6 sm:w-3/4 lg:w-1/2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Title title="UPDATE YOUR PASSWORD" titleStyles="text-lg" />
                <section className="flex w-full flex-col gap-4 py-3">
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

                  <div className="relative">
                    <input
                      type="password"
                      {...register("confirm")}
                      className="input peer"
                      placeholder="Confirm Password"
                    />
                    <label className="inputLabel">Confirm Password</label>

                    {errors["confirm"] && (
                      <Error errorMessage={errors["confirm"].message} />
                    )}
                  </div>
                </section>

                <div className="flex justify-end">
                  <Button
                    title={
                      isUpdatingPassword ? (
                        <SpinnerLoader color="fill-white" />
                      ) : (
                        "Update"
                      )
                    }
                    type="submit"
                    intent="primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
