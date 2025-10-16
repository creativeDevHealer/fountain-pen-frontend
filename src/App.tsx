import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { getAuthToken } from "@/lib/utils";

const queryClient = new QueryClient();

const App = () => {
  const [token, setToken] = useState<string | null>(getAuthToken());
  useEffect(() => {
    const onChange = () => setToken(getAuthToken());
    try { window.addEventListener('storage', onChange); } catch (_e) {}
    try { window.addEventListener('auth-token-changed' as any, onChange); } catch (_e) {}
    return () => {
      try { window.removeEventListener('storage', onChange); } catch (_e) {}
      try { window.removeEventListener('auth-token-changed' as any, onChange); } catch (_e) {}
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="pen-collector-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
              <Route path="/settings" element={token ? <Settings /> : <Navigate to="/login" replace />} />
              <Route path="/" element={token ? <Index /> : <Navigate to="/login" replace />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
