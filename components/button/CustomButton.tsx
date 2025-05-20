"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, ButtonProps, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "9999px",
  backgroundColor: "#00D084", // vibrant green
  color: "#fff",
  textTransform: "none",
  padding: "12px 32px",
  fontWeight: 500,
  fontSize: "16px",
  boxShadow: "0px 8px 16px rgba(0, 208, 132, 0.25)",
  "&:hover": {
    backgroundColor: "#00B374",
    boxShadow: "0px 10px 20px rgba(0, 208, 132, 0.3)",
  },
}));

type CustomButtonProps = ButtonProps & {
  children: React.ReactNode;
};

const CustomButton = ({ children, ...props }: CustomButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default CustomButton;
