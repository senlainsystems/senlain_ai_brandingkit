import { onCallGenkit } from "firebase-functions/https";
import * as flows from "./flows/brandFlows";

// Expose flows as Firebase Functions using onCallGenkit
export const generateBrandNames = onCallGenkit(flows.generateBrandNames);
export const generateTagline = onCallGenkit(flows.generateTagline);
export const generateBrandIdentity = onCallGenkit(flows.generateBrandIdentity);
export const generateLogo = onCallGenkit(flows.generateLogo);
