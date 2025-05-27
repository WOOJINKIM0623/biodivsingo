import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_TEXT, GEMINI_MODEL_IMAGE, UI_TEXT } from '../constants';

const API_KEY = process.env.API_KEY;

// Initialize AI client lazily or handle API_KEY presence more gracefully if needed.
// For now, we assume API_KEY is present for the service to function.
const getAIClient = () => {
  if (!API_KEY) {
    // This error will be caught by the calling functions (getSpeciesInfo, generateSpeciesImage)
    throw new Error(UI_TEXT.API_KEY_ERROR);
  }
  return new GoogleGenAI({ apiKey: API_KEY });
}

export const getSpeciesInfo = async (speciesName: string): Promise<string> => {
  const ai = getAIClient(); // This will throw if API_KEY is missing
  try {
    const prompt = `서산시 해미 지역의 생태계 교란종인 "${speciesName}"에 대해 알려줘. 주요 특징, 생태계에 미치는 영향, 그리고 가능한 관리 방법에 대해 자세히 설명해줘. 답변은 한국어로 해줘.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: prompt,
    });

    return response.text;
  } catch (error: any) {
    console.error("Error fetching species info from Gemini:", error);
    if (error.message === UI_TEXT.API_KEY_ERROR) {
        throw error; // Re-throw API key error
    }
    throw new Error(UI_TEXT.GEMINI_GENERAL_ERROR);
  }
};

export const generateSpeciesImage = async (speciesName: string): Promise<string> => {
  const ai = getAIClient(); // This will throw if API_KEY is missing
  try {
    const prompt = `A photorealistic image of the invasive alien species "${speciesName}" in its natural habitat. Focus on clear identification features.`;
    
    const response = await ai.models.generateImages({
      model: GEMINI_MODEL_IMAGE,
      prompt: prompt,
      config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image?.imageBytes) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image data received from Gemini.");
    }
  } catch (error: any) {
    console.error("Error generating species image from Gemini:", error);
    if (error.message === UI_TEXT.API_KEY_ERROR) {
        throw error; // Re-throw API key error
    }
    // It's possible the model can't generate an image for a very obscure species.
    // Or there might be safety flags.
    throw new Error(UI_TEXT.LEARN_IMAGE_ERROR);
  }
};
