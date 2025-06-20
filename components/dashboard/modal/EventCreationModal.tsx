"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from "@/components/button/CustomButton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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

const EventCreationModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [teams, setTeams] = useState([]);
  const [eventTypes, setEventTypes] = useState([
    { value: "Game", label: "Game" },
    { value: "Practice", label: "Practice" },
    { value: "Other", label: "Other" },
  ]);
  const [repeatOptions, setRepeatOptions] = useState([
    { value: "Never", label: "Never" },
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
  ]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await API.get("/teams");
      setTeams(
        res.data.data.map((team: any) => ({
          value: team._id,
          label: team.team_name,
          image: team.image,
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
          src={data.image}
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
    try {
      const formattedData = {
        ...data,
        start_date: new Date(data.start_date).toISOString(),
        all_day: data.all_day === "true" || data.all_day === true,
        opponent_team_id: data.opponent_team_id || null,
      };

      await API.post("/events", formattedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast("Event created successfully", "success", "Success");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      onClose();

      setIsEditing(false);
      reset();
    } catch (error) {
      showToast("Failed to update event", "error", "error");
    }
  };
  const handleModalSubmit = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="w-full sm:max-w-lg md:max-w-2xl mx-auto max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Create New Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team
              </label>
              <Select
                options={teams}
                components={{ Option: CustomOption }}
                onChange={(selected: any) =>
                  setValue("team_id", selected?.value)
                }
                className="basic-multi-select"
                classNamePrefix="select"
                isClearable={false}
              />
              {errors.team_id && (
                <p className="mt-1 text-sm text-red-600">Team is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opponent Team (Optional)
              </label>
              <Select
                options={teams}
                components={{ Option: CustomOption }}
                onChange={(selected: any) =>
                  setValue("opponent_team_id", selected?.value)
                }
                className="basic-multi-select"
                classNamePrefix="select"
                isClearable
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                {...register("event_type", {
                  required: "Event type is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {eventTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.event_type && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.event_type.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Home/Away
              </label>
              <select
                {...register("home_away", {
                  required: "Home/Away is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Home">Home</option>
                <option value="Away">Away</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                {...register("start_date", {
                  required: "Start date is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.start_date && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.start_date.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                {...register("duration", {
                  required: "Duration is required",
                  min: {
                    value: 1,
                    message: "Duration must be at least 1 minute",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.duration.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Arrive Time (minutes before)
              </label>
              <input
                type="number"
                {...register("arrive_time", {
                  required: "Arrive time is required",
                  min: {
                    value: 0,
                    message: "Arrive time cannot be negative",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.arrive_time && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.arrive_time.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                All Day Event
              </label>
              <select
                {...register("all_day")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Repeats
              </label>
              <select
                {...register("repeats")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {repeatOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                {...register("location", {
                  required: "Location is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.message as string}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                {...register("notes")}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            {/* <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                reset();
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button> */}
            <CustomButton
              onClick={() => {
                setIsModalOpen(false);
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
              Cencel
            </CustomButton>
            <CustomButton type="submit" sx={{ boxShadow: "none" }}>
              Create Event
            </CustomButton>
          </div>
        </form>

        <DialogFooter className="mt-6 flex justify-center items-center"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventCreationModal;
