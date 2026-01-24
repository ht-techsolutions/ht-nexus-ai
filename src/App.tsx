import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import AuthComplete from "./pages/AuthComplete";
import Legal from "./pages/Legal";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import RoutingPage from "./pages/dashboard/RoutingPage";
import CompliancePage from "./pages/dashboard/CompliancePage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import NetworkPage from "./pages/dashboard/NetworkPage";
import AIEnginePage from "./pages/dashboard/AIEnginePage";
import FleetPage from "./pages/dashboard/FleetPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollHandler />
            <Routes>
              <Route path='/' element={<Index />} />

              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/auth/complete' element={<AuthComplete />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/success' element={<Success />} />
              <Route
                path='/dashboard'
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardOverview />} />
                <Route path='routing' element={<RoutingPage />} />
                <Route path='compliance' element={<CompliancePage />} />
                <Route path='analytics' element={<AnalyticsPage />} />
                <Route path='network' element={<NetworkPage />} />
                <Route path='ai-engine' element={<AIEnginePage />} />
                <Route path='fleet' element={<FleetPage />} />
                <Route path='profile' element={<Profile />} />
              </Route>

              <Route path='/legal/:type' element={<Legal />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash (e.g. /#contact), attempt to scroll to the element with that id
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const offset = 80; // same offset used by Navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        return;
      }
    }

    // Default: scroll to top on navigation (keeps behavior consistent)
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return null;
};

export default App;
