import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SplashScreen from "./pages/SplashScreen";
import GenderSelect from "./pages/GenderSelect";
import FeaturesMenu from "./pages/FeaturesMenu";
import ImageUpload from "./pages/ImageUpload";
import ResultsScreen from "./pages/ResultsScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/gender" element={<GenderSelect />} />
          <Route path="/features/:gender" element={<FeaturesMenu />} />
          <Route path="/upload/:gender/:feature" element={<ImageUpload />} />
          <Route path="/results" element={<ResultsScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
