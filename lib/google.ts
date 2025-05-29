"use server";

import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();
export const autocomplete = async (input: string) => {
  if (!input) return [];
  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: "AIzaSyBr3b2k_eCor2c1bATb9RemY0w1qojmFCA",
      },
    });
    return response.data.predictions;
  } catch (error) {
    console.error(error);
  }
};
