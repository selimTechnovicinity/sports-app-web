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
import { autocomplete } from "@/lib/google";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Select from "react-select";

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
  team_place: OptionType | null;
  image: string;
}

const ImageUpload = ({
  onUploadComplete,
  initialImage = "",
}: {
  onUploadComplete: (url: string) => void;
  initialImage?: string;
}) => {
  const [image, setImage] = useState<string>(initialImage);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      // Mock upload - replace with actual API call in production
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImage(imageUrl);
        onUploadComplete(imageUrl);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage("");
    onUploadComplete("");
    setError("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {image ? (
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={image}
            alt="Team logo"
            sx={{ width: 150, height: 150, borderRadius: "8px" }}
            variant="rounded"
          />
          <IconButton
            onClick={handleRemoveImage}
            sx={{
              position: "absolute",
              top: -10,
              right: -10,
              backgroundColor: "error.main",
              color: "white",
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            border: "2px dashed",
            borderColor: "divider",
            borderRadius: "8px",
            p: 4,
            width: "100%",
            textAlign: "center",
          }}
        >
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload-input"
            type="file"
            onChange={handleImageChange}
            disabled={isUploading}
          />
          <label htmlFor="image-upload-input">
            <Button
              component="span"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Uploading...
                </>
              ) : (
                "Upload Team Logo"
              )}
            </Button>
          </label>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            PNG, JPG up to 5MB
          </Typography>
        </Box>
      )}
      {error && (
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      )}
    </Box>
  );
};

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
    team_place: null,
    image: "",
  });
  // const [locationOptions, setLocationOptions] = useState<OptionType[]>([]);
  // const [locationSearch, setLocationSearch] = useState("");
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([]);
  const [input, setInput] = useState("");

  // location

  useEffect(() => {
    console.log("input: ", input);
    const fetchPredictions = async () => {
      const predictions = await autocomplete(input);
      console.log("predictions", predictions);
      setPredictions(predictions ?? []);
    };
    fetchPredictions();
  }, [input]);

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
      title: "When is the upcoming season?",
      options: seasonTypes || [],
      name: "season_type",
    },
    {
      title: "Where is your team based?",
      select: true,
      placeholder: "Search city or town",
      options: predictions || [],
      name: "team_place",
      onInputChange: (inputValue: string) => setInput(inputValue),
    },
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

  const handleLocationSelect = (option: OptionType | null) => {
    setFormData((prev) => ({
      ...prev,
      team_place: option,
    }));
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", {
      game_type: formData.game_type,
      team_type: formData.team_type,
      age_type: formData.age_type,
      season_type: formData.season_type,
      team_name: formData.team_name,
      team_place: formData.team_place?.label || "",
      image: formData.image,
    });
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
          ) : step.select ? (
            <Select
              options={step.options}
              value={formData.team_place}
              onChange={handleLocationSelect}
              onInputChange={step.onInputChange}
              placeholder={step.placeholder}
              className="react-select-container"
              classNamePrefix="react-select"
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                control: (provided) => ({
                  ...provided,
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  borderColor: "#d1d5db",
                }),
              }}
              isLoading={predictions.length > 2 && predictions.length === 0}
              noOptionsMessage={() =>
                predictions.length < 3
                  ? "Type at least 3 characters to search"
                  : "No locations found"
              }
            />
          ) : step.imageUpload ? (
            <ImageUpload
              onUploadComplete={handleImageUpload}
              initialImage={formData.image}
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
              (step.input && !formData.team_name) ||
              (step.select && !formData.team_place) ||
              (step.imageUpload && !formData.image) ||
              (!step.input &&
                !step.select &&
                !step.imageUpload &&
                !formData[step.name as keyof FormData])
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
