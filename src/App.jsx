import React from "react";
import Routes from "./Routes";
import { ToastProvider } from "components/ui/ToastProvider";
import { BrandProvider } from "context/BrandContext";
import { AuthProvider } from "context/AuthContext";

function App() {
  console.log("App.jsx: App component rendering...");
  return (
    <ToastProvider>
      <AuthProvider>
        <BrandProvider>
          <Routes />
        </BrandProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;