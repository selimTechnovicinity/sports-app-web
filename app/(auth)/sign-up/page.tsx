"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import assets from "@/assets";
import CustomButton from "@/components/button/CustomButton";
import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import BusketBall from "@/components/shared/BusketBall";
import { registerMutationFn } from "@/lib/api";
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

const RegisterValidationSchema = z.object({
  email: z.string().min(1, "email is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const CreateAccountPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { showToast } = useToast();

  const { mutate: register, isPending } = useMutation({
    mutationFn: registerMutationFn,
    onSuccess: (response) => {
      showToast("Registration successful", "success", "Success");
      router.push("/login");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred during registration.";
      setError(errorMessage);
      showToast(errorMessage, "error", "Registration Error");
    },
  });

  const handleRegister = (values: FieldValues) => {
    register(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl flex overflow-hidden">
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
            className="text-center text-green-500"
            sx={{ mb: 1 }}
          >
            Create Account
          </Typography>

          <Typography
            variant="body2"
            className="text-center text-gray-500"
            sx={{ mb: 4 }}
          >
            Lorem ipsum dolor sit amet consectetur
          </Typography>

          <CustomForm
            onSubmit={handleRegister}
            resolver={zodResolver(RegisterValidationSchema)}
            defaultValues={{
              email: "",
              first_name: "",
              last_name: "",
              password: "",
            }}
          >
            <div className="space-y-4">
              <CustomInput
                name="first_name"
                placeholder="First Name"
                fullWidth
                sx={{ mb: 2 }}
              />
              <CustomInput
                name="last_name"
                placeholder="Last Name"
                fullWidth
                sx={{ mb: 2 }}
              />
              <CustomInput
                name="email"
                placeholder="Enter Email"
                fullWidth
                sx={{ mb: 2 }}
              />
              <CustomInput
                name="password"
                placeholder="Choose Password"
                type="password"
                fullWidth
                sx={{ mb: 1 }}
              />
            </div>

            {error && (
              <Typography variant="body2" color="error" mb={2}>
                {error}
              </Typography>
            )}

            <CustomButton type="submit" fullWidth sx={{ mt: 2, mb: 4 }}>
              Next
            </CustomButton>
            <div className="text-center text-sm mb-4">
              <span>Already have an account?</span>
              <Link href="/login" className="text-green-500 font-medium">
                {" "}
                Login
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

export default CreateAccountPage;
