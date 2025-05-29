"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import assets from "@/assets";
import CustomButton from "@/components/button/CustomButton";
import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import BusketBall from "@/components/shared/BusketBall";
import { forgotPasswordMutationFn } from "@/lib/api";
import { useToast } from "@/lib/Providers/ToastContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

const ForgotPasswordValidationSchema = z.object({
  email: z.string().min(1, "Email or mobile number is required"),
});

const ForgetPasswordPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgotPasswordMutationFn,
    onSuccess: (response, variables) => {
      localStorage.setItem("email", variables.email);
      showToast("Password reset email sent", "success", "Success");
      router.push("/enter-otp");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred during password reset.";
      setError(errorMessage);
      showToast(errorMessage, "error", "Error");
    },
  });

  const handleForgot = (values: FieldValues) => {
    forgotPassword(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl flex overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
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
            Forget Password
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
            onSubmit={handleForgot}
            resolver={zodResolver(ForgotPasswordValidationSchema)}
            defaultValues={{ email: "" }}
          >
            <div className="space-y-4">
              <CustomInput
                name="email"
                placeholder="Email ID/ Mobile Number"
                fullWidth
              />
            </div>

            {error && (
              <Typography variant="body2" color="error" mt={2}>
                {error}
              </Typography>
            )}

            <CustomButton type="submit" fullWidth sx={{ mt: 4, mb: 4 }}>
              Next
            </CustomButton>

            <Typography variant="caption" className="text-center text-gray-500">
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

export default ForgetPasswordPage;
