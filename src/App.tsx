import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PageTransitionProvider } from "./components/PageTransition";

// Route-level code splitting: each page loads only when first visited.
// This dramatically reduces the initial JS parse time (TBT).
const About = lazy(() => import("./pages/About"));
const CalculatorDetail = lazy(() => import("./pages/CalculatorDetail"));
const Calculators = lazy(() => import("./pages/Calculators"));
const Contact = lazy(() => import("./pages/Contact"));
const FormsDownloads = lazy(() => import("./pages/FormsDownloads"));
const GoalDetail = lazy(() => import("./pages/GoalDetail"));
const Goals = lazy(() => import("./pages/Goals"));
const Home = lazy(() => import("./pages/Home"));
const InvestorServices = lazy(() => import("./pages/InvestorServices"));
const PrivacyPolicy = lazy(() =>
  import("./pages/Legal").then((m) => ({ default: m.PrivacyPolicy }))
);
const Terms = lazy(() =>
  import("./pages/Legal").then((m) => ({ default: m.Terms }))
);
const NotFound = lazy(() => import("./pages/NotFound"));
const Resources = lazy(() => import("./pages/Resources"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Services = lazy(() => import("./pages/Services"));
const Team = lazy(() => import("./pages/Team"));

// Minimal fallback shown while a page chunk loads (stays invisible — transitions handle it)
const PageFallback = () => (
  <div style={{ minHeight: "100dvh" }} aria-hidden="true" />
);

export default function App() {
  return (
    <PageTransitionProvider>
      {(displayLocation) => (
        <Suspense fallback={<PageFallback />}>
        <Routes location={displayLocation}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="team" element={<Team />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="goals" element={<Goals />} />
            <Route path="goals/:slug" element={<GoalDetail />} />
            <Route path="calculators" element={<Calculators />} />
            <Route path="calculators/:slug" element={<CalculatorDetail />} />
            <Route path="resources" element={<Resources />} />
            <Route path="resources/investor-services" element={<InvestorServices />} />
            <Route path="resources/forms-downloads" element={<FormsDownloads />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<Terms />} />

            {/* Friendly aliases for the paths used by the original site. */}
            <Route path="about-us" element={<Navigate to="/about" replace />} />
            <Route path="contact-us" element={<Navigate to="/contact" replace />} />
            <Route path="faqs" element={<Navigate to="/resources" replace />} />
            <Route path="investor-services" element={<Navigate to="/resources/investor-services" replace />} />
            <Route path="forms-downloads" element={<Navigate to="/resources/forms-downloads" replace />} />
            <Route path="mutual-fund-consultant-in-jharkhand" element={<Navigate to="/services/mutual-funds" replace />} />
            <Route path="life-insurance-consultant-in-jharkhand" element={<Navigate to="/services/life-insurance" replace />} />
            <Route path="health-insurance-consultant-in-jharkhand" element={<Navigate to="/services/health-insurance" replace />} />
            <Route path="tax-planning-services-in-jharkhand" element={<Navigate to="/services/tax-planning" replace />} />
            <Route path="general-insurance-consultant-in-jharkhand" element={<Navigate to="/services/general-insurance" replace />} />
            <Route path="fd-and-bond-consultant-in-jharkhand" element={<Navigate to="/services/fd-bonds" replace />} />
            <Route path="stock-market-demat-open-consultant-in-jharkhand" element={<Navigate to="/services/stock-market-demat" replace />} />
            <Route path="nps-consultant-in-jharkhand" element={<Navigate to="/services/nps" replace />} />
            <Route path="systematic-investment-plan-calculator" element={<Navigate to="/calculators/sip" replace />} />
            <Route path="retirement-planning-calculator" element={<Navigate to="/calculators/retirement" replace />} />
            <Route path="asset-allocation-calculator" element={<Navigate to="/calculators/asset-allocation" replace />} />
            <Route path="home-loan-emi-calculator" element={<Navigate to="/calculators/emi" replace />} />
            <Route path="provident-fund-calculator" element={<Navigate to="/calculators/ppf" replace />} />
            <Route path="employees-provident-fund-calculator" element={<Navigate to="/calculators/epf" replace />} />
            <Route path="goal-setting-calculator" element={<Navigate to="/calculators/goal-setting" replace />} />
            <Route path="children-education-planner" element={<Navigate to="/calculators/children-education" replace />} />
            <Route path="mutual-fund-sip-calculator-step-up" element={<Navigate to="/calculators/sip-step-up" replace />} />
            <Route path="dream-home" element={<Navigate to="/goals/dream-home" replace />} />
            <Route path="wealth-creation" element={<Navigate to="/goals/wealth-creation" replace />} />
            <Route path="retirement-planning" element={<Navigate to="/goals/retirement" replace />} />
            <Route path="child-education" element={<Navigate to="/goals/child-education" replace />} />
            <Route path="child-wedding-plan" element={<Navigate to="/goals/child-wedding" replace />} />
            <Route path="privacy" element={<Navigate to="/privacy-policy" replace />} />
            <Route path="terms" element={<Navigate to="/terms-and-conditions" replace />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        </Suspense>
      )}
    </PageTransitionProvider>
  );
}
