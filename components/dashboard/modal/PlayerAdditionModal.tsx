"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from "@/components/button/CustomButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import API from "@/lib/axios-client";
import { useToast } from "@/lib/Providers/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

interface PlayerAdditionModalProps {
  open: boolean;
  onClose: () => void;
}

const PlayerAdditionModal = ({ open, onClose }: PlayerAdditionModalProps) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamsData, setTeamsData] = useState();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      team_id: "",
      first_name: "",
      last_name: "",
      email: "",
      jersey_no: "",
    },
  });

  // const { teams } = useGetTeams();

  // useEffect(() => {
  //   if (teams?.success) {
  //     setTeamsData(
  //       teams.data.map((team: any) => ({
  //         value: team._id,
  //         label: team.team_name,
  //         image: team.image || "/default_image.jpg",
  //       }))
  //     );
  //   }
  // }, [teams]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await API.get("/teams?limit=10000");
      setTeamsData(
        res.data.data.map((team: any) => ({
          value: team._id,
          label: team.team_name,
          image: team.image || "/default_image.jpg",
        }))
      );
    } catch (error) {
      showToast("Failed to fetch teams", "error", "Error");
    }
  };

  const CustomOption = ({ innerProps, label, data }: any) => (
    <div
      {...innerProps}
      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
    >
      {data.image && (
        <Image
          src={data.image || "/default_image.jpg"}
          alt={label}
          width={24}
          height={24}
          className="w-6 h-6 rounded-full mr-2"
        />
      )}
      <span>{label}</span>
    </div>
  );

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await API.post(`/teams/${data.team_id}/player`, data);
      showToast("Player added successfully", "success", "Success");
      queryClient.invalidateQueries({ queryKey: ["teamPlayers"] });
      reset();
      onClose();
    } catch (error: any) {
      showToast(
        error.response?.data?.message || "Failed to add player",
        "error",
        "Error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="w-full sm:max-w-lg md:max-w-xl mx-auto max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Add New Player
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team
            </label>
            <Select
              options={teamsData}
              components={{ Option: CustomOption }}
              onChange={(selected: any) => setValue("team_id", selected?.value)}
              className="basic-multi-select"
              classNamePrefix="select"
              isClearable={false}
              styles={{
                menu: (provided) => ({
                  ...provided,
                  height: "200px",
                  overflow: "auto",
                }),
                menuList: (provided) => ({
                  ...provided,
                  maxHeight: "none",
                  height: "100%",
                }),
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name*
              </label>
              <input
                type="text"
                {...register("first_name", {
                  required: "First name is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter player's first name"
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.first_name.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name*
              </label>
              <input
                type="text"
                {...register("last_name", {
                  required: "Last name is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter player's last name"
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.last_name.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter player's email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jersey Number*
              </label>
              <input
                type="text"
                {...register("jersey_no", {
                  required: "Jersey number is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter player's jersey number"
              />
              {errors.jersey_no && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.jersey_no.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <CustomButton
              onClick={() => {
                reset();
                onClose();
              }}
              variant="outlined"
              sx={{
                backgroundColor: "white",
                color: "#00D084",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#00B374",
                  color: "white",
                  boxShadow: "none",
                },
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              sx={{ boxShadow: "none" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Player"}
            </CustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerAdditionModal;
