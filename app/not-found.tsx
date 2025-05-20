"use client";
import not_found from "@/assets/pic/404-error-img.png";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-white">
      <Image
        src={not_found}
        alt="Not Found"
        className="w-full max-w-md h-auto mb-6"
        priority
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        The page you are looking for does not exist.
      </p>
      <Button onClick={handleGoHome} variant="outlined" color="primary">
        Go Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
