"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  IconButton,
  InputAdornment,
  SxProps,
  TextField,
  styled,
} from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  required?: boolean;
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "9999px",
    backgroundColor: "#f2fdf9", // very light green tint
    paddingRight: 8,
    paddingLeft: 16,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputBase-input": {
    padding: "12px 0",
    fontSize: "14px",
    color: "#374151", // Tailwind gray-700
  },
  "& .MuiInputAdornment-root .MuiIconButton-root": {
    padding: 6,
  },
}));

const CustomInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth = true,
  sx,
  placeholder,
  required,
  ...rest
}: TInputProps) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <StyledTextField
          {...field}
          {...rest}
          type={isPassword && !showPassword ? "password" : "text"}
          fullWidth={fullWidth}
          placeholder={placeholder}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
          InputProps={{
            endAdornment: isPassword ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
          sx={sx}
        />
      )}
    />
  );
};

export default CustomInput;
