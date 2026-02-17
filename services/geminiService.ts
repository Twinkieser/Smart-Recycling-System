
import { GoogleGenAI, Type } from "@google/genai";
import { WasteCategory, ClassificationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function classifyWaste(imageB64: string): Promise<Partial<ClassificationResult>> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Classify the waste item in this image. 
  Categories must be one of: Plastic, Glass, Metal, Paper, Organic, or Non-Recyclable. 
  Provide specific disposal guidelines for this type of object.`;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageB64.split(",")[1] || imageB64,
            },
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { 
            type: Type.STRING, 
            enum: ["Plastic", "Glass", "Metal", "Paper", "Organic", "Non-Recyclable"] 
          },
          confidence: { type: Type.NUMBER, description: "Confidence score between 0 and 1" },
          recyclable: { type: Type.BOOLEAN },
          guidelines: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          binColor: { type: Type.STRING, description: "Suggested bin color (e.g. Blue, Green, Grey)" }
        },
        required: ["category", "confidence", "recyclable", "guidelines", "binColor"]
      },
    },
  });

  try {
    const data = JSON.parse(response.text);
    return {
      id: Math.random().toString(36).substr(2, 9),
      category: data.category as WasteCategory,
      confidence: data.confidence,
      recyclable: data.recyclable,
      guidelines: data.guidelines,
      binColor: data.binColor,
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error("Failed to parse Gemini response", err);
    throw new Error("Could not classify image");
  }
}
