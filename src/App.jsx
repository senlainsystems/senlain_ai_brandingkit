import React from "react";
import Routes from "./Routes";
import { ToastProvider } from "components/ui/ToastProvider";
import { BrandProvider } from "context/BrandContext";
import { AuthProvider } from "context/AuthContext";

function App() {
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