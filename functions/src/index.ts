import { configureGenkit } from "@genkit-ai/core";
import { firebase } from "@genkit-ai/firebase";
import { googleAI } from "@genkit-ai/googleai";
import { onFlow, noAuth } from "@genkit-ai/firebase/functions";
import { runFlow } from "@genkit-ai/flow";
import * as z from "zod";
import * as flows from "./flows/brandFlows";

// Configure Genkit with the Google AI plugin.
configureGenkit({
    plugins: [
        firebase(),
        googleAI(),
    ],
    logLevel: "debug",
});

// Expose flows as Firebase Functions using the explicit onFlow signature
export const generateBrandNames = onFlow(
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
        authPolicy: noAuth(),
    },
    async (input) => {
        return runFlow(flows.generateBrandNames, input);
    }
);

export const generateTagline = onFlow(
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
        authPolicy: noAuth(),
    },
    async (input) => {
        return runFlow(flows.generateTagline, input);
    }
);

export const generateBrandIdentity = onFlow(
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
            colorPalette: z.array(z.string()),
            typographyRecommendation: z.string(),
            visualStyle: z.string(),
        }),
        authPolicy: noAuth(),
    },
    async (input) => {
        return runFlow(flows.generateBrandIdentity, input);
    }
);
