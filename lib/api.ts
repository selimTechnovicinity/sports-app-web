import { FieldValues } from "react-hook-form";
import API from "./axios-client";

export const loginMutationFn = async (data: FieldValues) =>
  await API.post("/auths/login", data);

export const registerMutationFn = async (data: FieldValues) =>
  await API.post(`/auths/register`, data);

export const forgotPasswordMutationFn = async (data: FieldValues) =>
  await API.post(`/auths/forget-password`, data);

export const verifyOTPMutationFn = async (data: FieldValues) =>
  await API.post(`/auths/reset-password/verify`, data);

export const setPasswordMutationFn = async (data: FieldValues) =>
  await API.post(`/auths/reset-password`, data);

export const logoutMutationFn = async () => await API.post(`/auth/logout`);

export const getUserProfileQueryFn = async () => await API.get(`/users`);

export const getEnventQueryFn = async () => await API.get(`/events`);

export const getTeamQueryFn = async () => await API.get(`/teams`);

export const createTeamMutationFn = async (data: FieldValues) =>
  await API.post(`/teams`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
