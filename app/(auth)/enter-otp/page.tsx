"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import assets from "@/assets";
import CustomButton from "@/components/button/CustomButton";
import BusketBall from "@/components/shared/BusketBall";
import { verifyOTPMutationFn } from "@/lib/api";
import { Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EnterOtpPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const { mutate: verifyOTP, isPending } = useMutation({
    mutationFn: verifyOTPMutationFn,
    onSuccess: (response, variables) => {
      localStorage.setItem("otp", variables.otp);
      router.push("/reset-password");
    },
    onError: (error) => {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    },
  });

  const handleSubmit = () => {
    const finalOtp = otp.join("");
    const email = localStorage.getItem("email");

    if (!email) throw new Error("Please go back to login page and try again.");
    console.log("Entered OTP:", finalOtp);
    verifyOTP({ email: email, otp: finalOtp });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl flex overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white shadow-md m-4 rounded-2xl">
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
            Enter OTP
          </Typography>

          <Typography
            variant="body2"
            className="text-center text-gray-500"
            sx={{ mb: 4, px: 2 }}
          >
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum.
          </Typography>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-center rounded-full bg-[#f2fdf9] text-xl outline-none border border-transparent focus:border-green-400"
              />
            ))}
          </div>

          <CustomButton fullWidth onClick={handleSubmit} sx={{ mb: 4 }}>
            Next
          </CustomButton>

          <Typography
            variant="body2"
            color="#9e9e9e"
            sx={{ mb: 10, textAlign: "center" }}
          >
            Didn’t get OTP?{" "}
            <Link href="#" className="text-green-500 font-medium">
              Resend OTP
            </Link>
          </Typography>

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
        </div>

        {/* Right Side - Animated Image */}

        <BusketBall />
      </div>
    </div>
  );
};

export default EnterOtpPage;
