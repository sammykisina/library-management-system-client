import { authSchemas } from "@/schemas";
import { useRouter } from "next/router";
import type { z } from "zod";
import { useAuth } from "@/hooks";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Error,
  Logo,
  NavLink,
  SpinnerLoader,
  Title,
} from "@/components";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import { Lib } from "@/assets";

const Signup = () => {
  const { signupSchema } = authSchemas;
  const router = useRouter();
  type SignupSchema = z.infer<typeof signupSchema>;
  const { user, isSigningUp, signupMutateAsync } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  /**
   * page functions
   */
  const onSubmit: SubmitHandler<SignupSchema> = async ({
    email,
    password,
    name,
    phone,
  }) => {
    await signupMutateAsync({ email, password, name, phone });
  };

  //if there is a user then redirect to home
  if (user) router.push("/");

  return (
    <section className="mx-auto flex h-full w-full max-w-[1100px] flex-col justify-center  sm:px-[24px]">
      {/* into */}
      <div className="mt-10 flex flex-col items-center ">
        <Logo logoStyles="text-[3rem]" dotStyles="w-2 h-2 bg-primary" />

        <div className="text-c_yellow text-lg">Join Us.Lets Learn.</div>
      </div>

      {/* body */}
      <div className="flex items-center">
        <div className="flex flex-1 flex-col items-center justify-center ">
          <div className="mt-5 w-full px-6 ">
            <Title title="Register" titleStyles="text-lg" />

            {/* the login details */}
            <div className="mt-3">
              <form
                className="space-y-1 py-2"
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
                        type="number"
                        {...register("phone")}
                        className="input peer"
                        placeholder="Phone"
                      />
                      <label className="inputLabel">Phone</label>

                      {errors["phone"] && (
                        <Error errorMessage={errors["phone"].message} />
                      )}
                    </div>
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
                        {...register("password_confirm")}
                        className="input peer"
                        placeholder="Confirm Password"
                      />
                      <label className="inputLabel">Confirm Password</label>

                      {errors["password_confirm"] && (
                        <Error
                          errorMessage={errors["password_confirm"].message}
                        />
                      )}
                    </div>
                  </div>
                </section>

                <div className="flex justify-end">
                  <Button
                    title={
                      isSigningUp ? (
                        <SpinnerLoader color="fill-white" />
                      ) : (
                        "Sign Up"
                      )
                    }
                    intent="primary"
                    type="submit"
                  />
                </div>
              </form>
            </div>

            <div className="mt-2 flex flex-col items-center">
              <div className="flex items-center">
                <span>Already have an account?</span>
                <NavLink
                  route={{ to: "/auth/login", name: "Login" }}
                  type="link"
                  fullWidth={false}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-[20rem] xmd:w-[25rem]">
          <Image src={Lib} alt="" className="hidden md:block" />
        </div>
      </div>

      {/* the Toaster */}
      <Toaster />
    </section>
  );
};

export default Signup;
