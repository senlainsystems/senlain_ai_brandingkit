import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

console.log("firebase.js: Initializing Firebase with config...");
const app = initializeApp(firebaseConfig);
console.log("firebase.js: Firebase app initialized.");

export const auth = getAuth(app);
console.log("firebase.js: Auth local instance created.");

export const db = getFirestore(app);
console.log("firebase.js: Firestore local instance created.");

let analytics;
try {
    analytics = getAnalytics(app);
    console.log("firebase.js: Analytics initialized.");
} catch (e) {
    console.warn("firebase.js: Analytics failed to initialize (expected in some environments):", e.message);
}
export { analytics };

// Connect to emulators if enabled in .env
if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
    console.log("Connecting to Auth and Firestore emulators...");
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, "localhost", 8080);
}

export default app;
