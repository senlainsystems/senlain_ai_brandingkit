import { httpsCallable } from "firebase/functions";
import { getFunctions } from "firebase/functions";
import app from "./firebase";

// Initialize Cloud Functions
const functions = getFunctions(app);

// Connect to emulator if running locally
const emulatorPromise = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? import("firebase/functions").then(({ connectFunctionsEmulator }) => {
        console.log("Connecting to Functions emulator...");
        connectFunctionsEmulator(functions, "localhost", 5001);
    })
    : Promise.resolve();

// Generic function to call Genkit flows
const callGenkitFlow = async (flowName, data) => {
    // Wait for emulator connection to be established
    await emulatorPromise;
    try {
        const callable = httpsCallable(functions, flowName);
        const result = await callable(data);
        return result.data;
    } catch (error) {
        console.error(`Error calling Genkit flow '${flowName}':`, error);
        throw error;
    }
};

// Specific wrappers for our flows
export const genkitApi = {
    // Generate brand names from description and industry
    generateBrandNames: (data) => callGenkitFlow('generateBrandNames', data),

    // Generate taglines based on brand name
    generateTagline: (data) => callGenkitFlow('generateTagline', data),

    // Generate full brand identity (colors, fonts, style)
    generateBrandIdentity: (data) => callGenkitFlow('generateBrandIdentity', data),

    // Generate logo using AI
    generateLogo: (data) => callGenkitFlow('generateLogo', data),
};
