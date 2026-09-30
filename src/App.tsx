import { Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "./context/AppContext";
import PublicLayout from "./components/PublicLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import KnowYourRisk from "./pages/KnowYourRisk";
import CreateAccount from "./pages/CreateAccount";
import OtpVerification from "./pages/OtpVerification";
import PersonalInformation from "./pages/assessment/PersonalInformation";
import EmploymentDetails from "./pages/assessment/EmploymentDetails";
import IncomeDetails from "./pages/assessment/IncomeDetails";
import MonthlyExpenses from "./pages/assessment/MonthlyExpenses";
import Assets from "./pages/assessment/Assets";
import Liabilities from "./pages/assessment/Liabilities";
import Savings from "./pages/assessment/Savings";
import Insurance from "./pages/assessment/Insurance";
import InvestmentExperience from "./pages/assessment/InvestmentExperience";
import FinancialGoals from "./pages/assessment/FinancialGoals";
import GovernmentDocuments from "./pages/assessment/GovernmentDocuments";
import SelectedDocuments from "./pages/assessment/SelectedDocuments";
import ReviewSubmit from "./pages/assessment/ReviewSubmit";
import AiProcessing from "./pages/AiProcessing";
import WelcomeScreen from "./pages/WelcomeScreen";
import FinancialDashboard from "./pages/FinancialDashboard";
import AiFinancialReport from "./pages/AiFinancialReport";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { auth } = useApp();
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      {/* Public marketing layout — shared Header + Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/know-your-risk" element={<KnowYourRisk />} />
      </Route>

      {/* Application pages — no public Header/Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/otp-verification" element={<OtpVerification />} />

      {/* Protected routes */}
      <Route path="/welcome" element={<ProtectedRoute><WelcomeScreen /></ProtectedRoute>} />
      <Route path="/personal-information" element={<ProtectedRoute><PersonalInformation /></ProtectedRoute>} />
      <Route path="/employment-details" element={<ProtectedRoute><EmploymentDetails /></ProtectedRoute>} />
      <Route path="/income-details" element={<ProtectedRoute><IncomeDetails /></ProtectedRoute>} />
      <Route path="/monthly-expenses" element={<ProtectedRoute><MonthlyExpenses /></ProtectedRoute>} />
      <Route path="/assets" element={<ProtectedRoute><Assets /></ProtectedRoute>} />
      <Route path="/liabilities" element={<ProtectedRoute><Liabilities /></ProtectedRoute>} />
      <Route path="/savings" element={<ProtectedRoute><Savings /></ProtectedRoute>} />
      <Route path="/insurance" element={<ProtectedRoute><Insurance /></ProtectedRoute>} />
      <Route path="/investment-experience" element={<ProtectedRoute><InvestmentExperience /></ProtectedRoute>} />
      <Route path="/financial-goals" element={<ProtectedRoute><FinancialGoals /></ProtectedRoute>} />
      <Route path="/government-documents" element={<ProtectedRoute><GovernmentDocuments /></ProtectedRoute>} />
      <Route path="/selected-documents" element={<ProtectedRoute><SelectedDocuments /></ProtectedRoute>} />
      <Route path="/assessment/selected-documents" element={<ProtectedRoute><SelectedDocuments /></ProtectedRoute>} />
      <Route path="/review-submit" element={<ProtectedRoute><ReviewSubmit /></ProtectedRoute>} />
      <Route path="/ai-processing" element={<ProtectedRoute><AiProcessing /></ProtectedRoute>} />
      <Route path="/financial-dashboard" element={<ProtectedRoute><FinancialDashboard /></ProtectedRoute>} />
      <Route path="/ai-financial-report" element={<ProtectedRoute><AiFinancialReport /></ProtectedRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
