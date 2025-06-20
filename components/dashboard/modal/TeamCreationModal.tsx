"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from "@/components/button/CustomButton";
import ImageUpload from "@/components/form/ImageUpload";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createTeamMutationFn } from "@/lib/api";
import API from "@/lib/axios-client";
import { useToast } from "@/lib/Providers/ToastContext";

import { Input } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface OptionType {
  value: string;
  label: string;
  image?: string;
}

interface FormData {
  game_type: string;
  team_type: string;
  age_type: string;
  season_type: string;
  team_name: string;
  team_place: string;
  image: File | null;
}

const TeamCreationModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    game_type: "",
    team_type: "",
    age_type: "",
    season_type: "",
    team_name: "",
    team_place: "",
    image: null,
  });
  // const [locationOptions, setLocationOptions] = useState<OptionType[]>([]);
  // const [locationSearch, setLocationSearch] = useState("");
  // const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);
  // const [input, setInput] = useState("");

  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate: createTeam, isPending } = useMutation({
    mutationFn: createTeamMutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      showToast("Item created successfully!", "success", "Success");
      onClose();
    },
    onError: (error: any) => {
      showToast((error as string) || "Error creating team", "error", "Error");
    },
  });

  // Fetch game types
  const { data: gameTypes } = useQuery({
    queryKey: ["gameTypes"],
    queryFn: async () => {
      const response = await API.get("/game-types");
      return response.data.data.map((item: any) => ({
        value: item._id,
        label: item.title,
        image: item.image,
      }));
    },
  });

  // Fetch team types
  const { data: teamTypes } = useQuery({
    queryKey: ["teamTypes"],
    queryFn: async () => {
      const response = await API.get("/team-types");
      return response.data.data.map((item: any) => ({
        value: item._id,
        label: item.title,
      }));
    },
  });

  // Fetch age types
  const { data: ageTypes } = useQuery({
    queryKey: ["ageTypes"],
    queryFn: async () => {
      const response = await API.get("/age-types");
      return response.data.data.map((item: any) => ({
        value: item._id,
        label: item.title,
      }));
    },
  });

  // Fetch season types
  const { data: seasonTypes } = useQuery({
    queryKey: ["seasonTypes"],
    queryFn: async () => {
      const response = await API.get("/season-types");
      return response.data.data.map((item: any) => ({
        value: item._id,
        label: item.title,
      }));
    },
  });

  const steps = [
    {
      title: "Select Your Team's Sports",
      options: gameTypes || [],
      type: "icon",
      name: "game_type",
    },
    {
      title: "Select your team type",
      options: teamTypes || [],
      name: "team_type",
    },
    {
      title: "How old are your players?",
      options: ageTypes || [],
      name: "age_type",
    },

    {
      title: "Upload your team logo",
      imageUpload: true,
      name: "image",
    },

    {
      title: "What is your team's name?",
      input: true,
      placeholder: "ex. NY Tigers",
      name: "team_name",
    },
    {
      title: "Where is your team based?",
      input: true,
      placeholder: "Input city or town",
      name: "team_place",
    },
    {
      title: "When is the upcoming season?",
      options: seasonTypes || [],
      name: "season_type",
    },
    // {
    //   title: "Where is your team based?",
    //   select: true,
    //   placeholder: "Search city or town",
    //   options: predictions || [],
    //   name: "team_place",
    //   onInputChange: (inputValue: string) => setInput(inputValue),
    // },
  ];

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionSelect = (option: any, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: option.value,
    }));
  };

  const handleImageUpload = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = () => {
    const data = {
      game_type: formData.game_type,
      team_type: formData.team_type,
      age_type: formData.age_type,
      season_type: formData.season_type,
      team_name: formData.team_name,
      team_place: formData.team_place || "",
      image: formData.image,
    };

    createTeam(data);

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            {step?.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {step.input ? (
            <Input
              name={step.name}
              placeholder={step.placeholder || "Enter value"}
              value={formData[step.name as keyof FormData] as string}
              onChange={handleInputChange}
              fullWidth
            />
          ) : step.imageUpload ? (
            <ImageUpload
              onUploadComplete={handleImageUpload}
              initialImageUrl={formData.image}
            />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {step.options?.map((option: OptionType, idx: number) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer ${
                    formData[step.name as keyof FormData] === option.value
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                  onClick={() => handleOptionSelect(option, step.name)}
                >
                  {step.type === "icon" && option.image && (
                    <img
                      src={option.image}
                      alt={option.label}
                      className="w-8 h-8 object-contain mb-2"
                    />
                  )}
                  <p className="text-sm font-medium text-center">
                    {option.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 flex justify-center items-center">
          {stepIndex > 0 && (
            <CustomButton onClick={() => setStepIndex((prev) => prev - 1)}>
              Back
            </CustomButton>
          )}
          <CustomButton
            className="ml-auto"
            onClick={() => {
              if (isLast) {
                handleSubmit();
              } else {
                setStepIndex((prev) => prev + 1);
              }
            }}
            disabled={
              (step.input && !formData[step.name as keyof FormData]) ||
              (step.imageUpload && !formData.image)
            }
          >
            {isLast ? "Create Team" : "Continue"}
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamCreationModal;
