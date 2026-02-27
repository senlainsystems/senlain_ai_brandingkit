import { gemini15Flash } from "@genkit-ai/googleai";
import { imagen3 } from "@genkit-ai/vertexai";
import { z } from "genkit";
import { ai } from "../genkit";

// Flow 1: Generate Brand Names
export const generateBrandNames = ai.defineFlow(
    {
        name: "generateBrandNames",
        inputSchema: z.object({
            industry: z.string(),
            description: z.string(),
            keywords: z.array(z.string()).optional(),
        }),
        outputSchema: z.object({
            names: z.array(z.string()),
            rationale: z.string(),
        }),
    },
    async (input) => {
        const prompt = `
      Generate 5 unique, modern, and memorable brand names for a business in the "${input.industry}" industry.
      
      Business Description: ${input.description}
      Keywords: ${input.keywords?.join(", ") || "N/A"}
      
      Return a JSON object with:
      1. 'names': An array of 5 strings.
      2. 'rationale': A brief explanation of the naming strategy.
    `;

        const result = await ai.generate({
            model: gemini15Flash,
            prompt: prompt,
            output: {
                format: "json",
            },
        });

        return result.output();
    }
);

// Flow 2: Generate Taglines
export const generateTagline = ai.defineFlow(
    {
        name: "generateTagline",
        inputSchema: z.object({
            brandName: z.string(),
            industry: z.string(),
            vibe: z.string().optional(),
        }),
        outputSchema: z.object({
            taglines: z.array(z.string()),
        }),
    },
    async (input) => {
        const prompt = `
      Create 3 catchy taglines for a brand named "${input.brandName}" in the ${input.industry} space.
      Vibe: ${input.vibe || "Professional and Trustworthy"}
      
      Return JSON with 'taglines' array.
    `;

        const result = await ai.generate({
            model: gemini15Flash,
            prompt: prompt,
            output: {
                format: "json",
            },
        });

        return result.output();
    }
);

// Flow 3: Generate Full Brand Identity
export const generateBrandIdentity = ai.defineFlow(
    {
        name: "generateBrandIdentity",
        inputSchema: z.object({
            brandName: z.string(),
            industry: z.string(),
            description: z.string(),
        }),
        outputSchema: z.object({
            missionStatement: z.string(),
            brandValues: z.array(z.string()),
            colorPalette: z.array(z.string()), // Hex codes
            typographyRecommendation: z.string(),
            visualStyle: z.string(),
        }),
    },
    async (input) => {
        const prompt = `
      Develop a complete brand identity for "${input.brandName}" (${input.industry}).
      Description: ${input.description}
      
      Return a JSON object with:
      - missionStatement (string)
      - brandValues (array of strings)
      - colorPalette (array of 5 hex color codes)
      - typographyRecommendation (string describing font styles)
      - visualStyle (string describing the look and feel)
    `;

        const result = await ai.generate({
            model: gemini15Flash,
            prompt: prompt,
            output: {
                format: "json",
            },
        });

        return result.output();
    }
);

// Flow 4: Generate Logo
export const generateLogo = ai.defineFlow(
    {
        name: "generateLogo",
        inputSchema: z.object({
            brandName: z.string(),
            industry: z.string(),
            description: z.string(),
            colors: z.array(z.string()).optional(),
            style: z.string().optional(),
        }),
        outputSchema: z.object({
            imageUrl: z.string(),
        }),
    },
    async (input) => {
        const prompt = `
      Professional, clean, and modern minimalist logo for a brand named "${input.brandName}".
      Industry: ${input.industry}
      Description: ${input.description}
      Color Palette: ${input.colors?.join(", ") || "Professional colors"}
      Style: ${input.style || "Modern Minimalist"}

      The logo should be suitable for a premium brand, with high contrast and clear shapes.
      Avoid cluttered designs. High resolution, white background.
    `;

        const result = await ai.generate({
            model: imagen3,
            prompt: prompt,
        });

        const media = result.media;
        if (media) {
            return { imageUrl: media.url };
        }

        return { imageUrl: "" };
    }
);
