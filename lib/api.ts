import { FieldValues } from "react-hook-form";
import API from "./axios-client";

export const loginMutationFn = async (data: FieldValues) =>
  await API.post("/auth/login", data);

export const registerMutationFn = async (data: FieldValues) =>
  await API.post(`/auth/register`, data);

export const verifyOTPMutationFn = async (data: FieldValues) =>
  await API.post(`/auth/reset-password/verify`, data);

export const forgotPasswordMutationFn = async (data: FieldValues) =>
  await API.post(`/auth/forget-password`, data);

export const setPasswordMutationFn = async (data: FieldValues) =>
  await API.post(`/auth/reset-password`, data);

export const logoutMutationFn = async () => await API.post(`/auth/logout`);
