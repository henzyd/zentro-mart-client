"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "~/components/forms/fields/form-field";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";

// import { useLogin } from "~/lib/hooks/auth";

interface Props {
  origin?: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginForm({ origin }: Props) {
  const router = useRouter();

  // const { mutateAsync: login } = useLogin();

  async function handleGoogleSignIn() {
    const result = await signIn("google", {
      callbackUrl: "/dashboard-mini",
      // redirect: true,
    });
    console.log(result, "handle Google sign in");
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        rememberMe: false,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        // await login(
        //   { ...values },
        //   {
        //     onSuccess: () => {
        //       resetForm();
        //       router.push(origin ? decodeURIComponent(origin) : "/about");
        //     },
        //   },
        // );
      }}
      validateOnBlur={false}
    >
      {({ handleSubmit, setFieldValue, isSubmitting, values }) => (
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="flex w-full flex-col gap-5"
        >
          <div className="flex flex-col gap-4">
            <FormField
              name="email"
              label="Email Address"
              type="email"
              required
              placeholder="sample@gmail.com"
            />
            <FormField
              label="Password"
              type={"password"}
              required
              placeholder="****************"
              name="password"
            />
            <div className="flex items-center justify-between gap-4">
              <div className="mediumMobile:self-start flex items-center gap-2">
                <Checkbox
                  onChange={() => {
                    setFieldValue("rememberMe", !values.rememberMe);
                  }}
                  checked={values.rememberMe}
                  name="rememberMe"
                />
                <small className="text-zinc-600">Remember me</small>
              </div>
              <Link href={"/forgot-password"} className="hover:underline">
                <small className="text-zinc-600">Forgot Password</small>
              </Link>
            </div>
          </div>
          <Button type="submit" size="lg" loading={isSubmitting}>
            Login
          </Button>
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-full rounded-full bg-black/20" />
            <small>Or</small>
            <span className="h-[1px] w-full rounded-full bg-black/20" />
          </div>
          <Button
            type="button"
            size="lg"
            variant={"outline"}
            onClick={handleGoogleSignIn}
          >
            Login with Google
          </Button>
        </form>
      )}
    </Formik>
  );
}
