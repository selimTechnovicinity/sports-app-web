"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import assets from "@/assets";
import CustomButton from "@/components/button/CustomButton";
import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import BusketBall from "@/components/shared/BusketBall";
import { setPasswordMutationFn } from "@/lib/api";
import { useToast } from "@/lib/Providers/ToastContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPasswordPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: setPasswordMutationFn,
    onSuccess: (response) => {
      setError(null);
      showToast("Password reset successful", "success", "Success");
      router.push("/login");
    },
    onError: (error: any) => {
      setError(error?.response?.data?.message || "An error occurred");
      showToast(
        error?.response?.data?.message || "An error occurred",
        "error",
        "Error"
      );
    },
  });

  const handleReset = (values: FieldValues) => {
    const email = localStorage.getItem("email");
    const otp = localStorage.getItem("otp");
    resetPassword({
      email: email,
      otp: otp,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white  w-full max-w-4xl flex overflow-hidden ">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col rounded-2xl justify-center bg-white shadow-md m-4">
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
            className="text-center text-green-500"
            sx={{ mb: 1 }}
          >
            Reset Password
          </Typography>

          <Typography
            variant="body2"
            className="text-center text-gray-500"
            sx={{ mb: 4, px: 2 }}
          >
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum.
          </Typography>

          <CustomForm
            onSubmit={handleReset}
            resolver={zodResolver(ResetPasswordSchema)}
            defaultValues={{
              password: "",
              confirmPassword: "",
            }}
          >
            <div className="space-y-4">
              <CustomInput
                name="password"
                placeholder="New Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
              />
              <CustomInput
                name="confirmPassword"
                placeholder="Retype Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
              />
            </div>

            {error && (
              <Typography variant="body2" color="error" mt={2}>
                {error}
              </Typography>
            )}

            <CustomButton type="submit" fullWidth sx={{ mb: 8 }}>
              Submit
            </CustomButton>

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

export default ResetPasswordPage;
