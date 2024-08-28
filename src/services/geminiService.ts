import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://api.google.dev/gemini/v1/vision";

export const getMeasureFromImage = async (base64Image: string) => {
  try {
    const response = await axios.post(GEMINI_API_URL, {
      image: base64Image,
      apiKey: GEMINI_API_KEY,
    });

    const { image_url, measure_value } = response.data;
    return { image_url, measure_value };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to extract measurement from image.");
  }
};
