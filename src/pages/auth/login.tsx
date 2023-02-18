import {
  Logo,
  Title,
  Error,
  Button,
  SpinnerLoader,
  NavLink,
} from "@/components";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchemas } from "@/schemas";
import { type z } from "zod";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";

const Login = () => {
  // page states
  const { loginSchema } = authSchemas;
  const router = useRouter();
  type LoginSchema = z.infer<typeof loginSchema>;
  const { loginMutateAsync, isLogging, user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // page functions
  const onSubmit: SubmitHandler<LoginSchema> = async ({ email, password }) => {
    await loginMutateAsync({ email, password });
  };

  // if there is a user then redirect to home
  if (user) router.push("/");

  return (
    <section className="mx-auto flex h-full w-full max-w-[1100px] flex-col items-center justify-center  sm:px-[24px]">
      {/* pos name */}
      <div className="mb-5 flex flex-col items-center">
        <Logo logoStyles="text-[3rem]" dotStyles="w-2 h-2 bg-c_dark" />

        <div className="text-c_yellow text-lg">Checker. Its All You.</div>
      </div>

      {/* the Into section */}
      <div className="mt-5 w-full px-6  sm:w-3/4 lg:w-1/2">
        <Title title="Login" titleStyles="text-lg" />

        {/* the login details */}
        <div className="mt-3">
          <form className="space-y-1 py-2" onSubmit={handleSubmit(onSubmit)}>
            <section className="flex w-full flex-col gap-4 py-3">
              <div className="relative">
                <input
                  type="email"
                  {...register("email")}
                  className="input peer"
                  placeholder="Email"
                />
                <label className="input_label">Email</label>

                {errors["email"] && (
                  <Error errorMessage={errors["email"].message} />
                )}
              </div>

              <div className="relative">
                <input
                  type="password"
                  {...register("password")}
                  className="input peer"
                  placeholder="Password"
                />
                <label className="input_label">Password</label>

                {errors["password"] && (
                  <Error errorMessage={errors["password"].message} />
                )}
              </div>
            </section>

            <div className="flex justify-end">
              <Button
                title={
                  isLogging ? <SpinnerLoader color="fill-white" /> : "Login"
                }
                intent="primary"
                type="submit"
              />
            </div>
          </form>
        </div>

        <div className="mt-2 flex flex-col items-center">
          <NavLink
            route={{ to: "/forgot-password", name: "Forgot Password?" }}
            // type="text_only"
            fullWidth={false}
          />

          <div className="flex ">
            <span>Don&lsquo;t have an account yet?</span>
            <NavLink
              route={{ to: "/signup", name: "Sign Up" }}
              // type="text_only"
              fullWidth={false}
            />
          </div>
        </div>
      </div>

      {/* the Toaster */}
      <Toaster />
    </section>
  );
};

export default Login;
