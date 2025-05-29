/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";

interface ImageUploadProps {
  onUploadComplete: (file: File | null) => void;
  initialImageUrl?: File | null; // For displaying existing images only
}

const ImageUpload = ({
  onUploadComplete,
  initialImageUrl = null,
}: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type and size
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
        // Create temporary URL for preview only
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        // Pass the original file to parent component
        onUploadComplete(file);
      } catch (err) {
        setError("Failed to process image");
      } finally {
        setIsUploading(false);
      }
    },
    [onUploadComplete]
  );

  const handleRemoveImage = useCallback(() => {
    // Clean up the object URL to prevent memory leaks
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl("");
    onUploadComplete(null); // Pass null or undefined as needed
    setError("");
  }, [onUploadComplete, previewUrl]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
      }}
    >
      {previewUrl ? (
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={previewUrl}
            alt="Preview"
            sx={{
              width: 150,
              height: 150,
              borderRadius: "8px",
              objectFit: "cover",
            }}
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
              "&:hover": {
                backgroundColor: "error.dark",
              },
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
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "action.hover",
            },
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
              color="primary"
              startIcon={<CloudUploadIcon />}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Uploading...
                </>
              ) : (
                "Upload Image"
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

export default ImageUpload;
