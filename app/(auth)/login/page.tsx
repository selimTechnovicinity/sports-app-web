"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import assets from "@/assets";
import CustomButton from "@/components/button/CustomButton";
import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import BusketBall from "@/components/shared/BusketBall";
import { loginMutationFn } from "@/lib/api";
import { useToast } from "@/lib/Providers/ToastContext";
import { minutesToDays } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

const LoginValidationSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
  password: z.string().min(8, "Password must be at least 8 characters!"),
});

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { showToast } = useToast();
  console.log(
    "Access Token Ecpires: ",
    Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES)
  );

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginMutationFn,
    onSuccess: (response) => {
      Cookies.set("accessToken", response?.data?.data.accessToken, {
        expires: minutesToDays(
          Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES)
        ),
      });
      Cookies.set("refreshToken", response?.data?.data?.refreshToken, {
        expires: minutesToDays(
          Number(process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES)
        ),
      });
      showToast("Login successful", "success", "Success");
      router.push("/dashboard");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error?.response?.data?.message || "An error occurred during login.";
      setError(errorMessage);
      showToast(errorMessage, "error", "Error");
    },
  });

  const handleLogin = (values: FieldValues) => {
    login(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white rounded-2xl  w-full max-w-4xl flex overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col rounded-2xl shadow-md justify-center m-4">
          <div className="flex justify-center mb-4">
            <Image
              src={assets?.images?.logo}
              alt="Logo"
              width={80}
              height={80}
            />
          </div>

          <Typography
            variant="h5"
            fontWeight={600}
            className="text-center"
            color="primary"
            sx={{ mb: 1 }}
          >
            Welcome to Game Changer
          </Typography>
          <Typography
            variant="body2"
            className="text-center text-gray-500"
            sx={{ mb: 4 }}
          >
            Please enter your email and password to continue.
          </Typography>

          <CustomForm
            onSubmit={handleLogin}
            resolver={zodResolver(LoginValidationSchema)}
            defaultValues={{ email: "", password: "" }}
          >
            <div className="space-y-4">
              <CustomInput
                name="email"
                placeholder="Enter Email"
                type="email"
                fullWidth
                sx={{ mb: 2 }}
              />
              <CustomInput
                name="password"
                placeholder="Enter Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
              />
            </div>

            {error && (
              <Typography variant="body2" color="error" mb={2}>
                {error}
              </Typography>
            )}

            <div className="text-center text-sm mb-4">
              <Link
                href="/forget-password"
                className="text-green-500 font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <CustomButton type="submit" fullWidth sx={{ mb: 4 }}>
              Login
            </CustomButton>

            <div className="text-center text-sm mb-4">
              <span>Don&apos;t have an account?</span>
              <Link href="/sign-up" className="text-green-500 font-medium">
                {" "}
                Sign Up
              </Link>
            </div>

            <Typography
              variant="caption"
              className="text-center mt-4 text-gray-500"
            >
              By continuing you agree to the{" "}
              <Link href="#" className="text-green-500 font-medium">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-green-500 font-medium">
                Terms of Use
              </Link>
              . Children under 13 years old may not create an account.
            </Typography>
          </CustomForm>
        </div>

        {/* Right Side - Animated Image */}
        <BusketBall />
      </div>
    </div>
  );
};

export default LoginPage;
