import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import LandingPage from "pages/landing";
import LoginRegistration from "pages/login-registration";
import BrandBriefCreation from "pages/brand-brief-creation";
import AIGenerationInterface from "pages/ai-generation-interface";
import BrandKitPreviewEditor from "pages/brand-kit-preview-editor";
import BrandKitGallery from "pages/brand-kit-gallery";
import AccountSettingsBilling from "pages/account-settings-billing";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login-registration" element={<LoginRegistration />} />
          <Route path="/brand-brief-creation" element={<BrandBriefCreation />} />
          <Route path="/ai-generation-interface" element={<AIGenerationInterface />} />
          <Route path="/brand-kit-preview-editor" element={<BrandKitPreviewEditor />} />
          <Route path="/brand-kit-gallery" element={<BrandKitGallery />} />
          <Route path="/account-settings-billing" element={<AccountSettingsBilling />} />
          <Route path="/" element={<LandingPage />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;