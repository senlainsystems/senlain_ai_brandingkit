import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";


console.log("index.jsx: Initializing React root...");
const container = document.getElementById("root");
console.log("index.jsx: Container found:", !!container);
const root = createRoot(container);

console.log("index.jsx: Rendering App...");
root.render(<App />);
