
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import CRMDashboard from "./pages/dashboards/CRMDashboard";
import FinanceDashboard from "./pages/dashboards/FinanceDashboard";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RecoverPassword from "./pages/auth/RecoverPassword";

// Landing Pages
import SaaSLanding from "./pages/landing/SaaSLanding";
import ProductLanding from "./pages/landing/ProductLanding";

// E-commerce Pages
import ProductCatalog from "./pages/ecommerce/ProductCatalog";
import Checkout from "./pages/ecommerce/Checkout";

// Component Showcase
import ComponentShowcase from "./pages/components/ComponentShowcase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboards/admin" element={<AdminDashboard />} />
            <Route path="/dashboards/crm" element={<CRMDashboard />} />
            <Route path="/dashboards/finance" element={<FinanceDashboard />} />
            
            {/* Auth Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/recover" element={<RecoverPassword />} />
            
            {/* Landing Routes */}
            <Route path="/landing/saas" element={<SaaSLanding />} />
            <Route path="/landing/product" element={<ProductLanding />} />
            
            {/* E-commerce Routes */}
            <Route path="/ecommerce/catalog" element={<ProductCatalog />} />
            <Route path="/ecommerce/checkout" element={<Checkout />} />
            
            {/* Components */}
            <Route path="/components" element={<ComponentShowcase />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
