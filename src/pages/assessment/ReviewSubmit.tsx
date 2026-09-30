import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, calculateAge } from "../../context/AppContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockIcon from "@mui/icons-material/Lock";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FlagIcon from "@mui/icons-material/Flag";
import DescriptionIcon from "@mui/icons-material/Description";
import ChecklistIcon from "@mui/icons-material/Checklist";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkOutlineIcon from "@mui/icons-material/WorkOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import BusinessIcon from "@mui/icons-material/Business";
import PercentIcon from "@mui/icons-material/Percent";
import LaptopIcon from "@mui/icons-material/Laptop";
import PaymentsIcon from "@mui/icons-material/Payments";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BoltIcon from "@mui/icons-material/Bolt";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LayersIcon from "@mui/icons-material/Layers";
import HomeIcon from "@mui/icons-material/Home";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SecurityIcon from "@mui/icons-material/Security";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import BadgeIcon from "@mui/icons-material/Badge";
import BookIcon from "@mui/icons-material/Book";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CakeIcon from "@mui/icons-material/Cake";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PublicIcon from "@mui/icons-material/Public";
import GavelIcon from "@mui/icons-material/Gavel";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import VerifiedIcon from "@mui/icons-material/Verified";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AssessmentJourneyProgress from "../../components/AssessmentJourneyProgress";

interface SummaryCard {
  key: string;
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  bulletColor: string;
  editRoute: string;
  items: { label: string; value: string; check?: boolean }[];
}

const FIELD_ICONS: Record<string, React.ReactNode> = {
  "name": <PersonIcon sx={{ fontSize: 18 }} className="text-blue-600" />,
  "email": <EmailIcon sx={{ fontSize: 18 }} className="text-rose-600" />,
  "phone": <PhoneIcon sx={{ fontSize: 18 }} className="text-emerald-600" />,
  "age": <CalendarTodayIcon sx={{ fontSize: 18 }} className="text-violet-600" />,
  "education": <SchoolIcon sx={{ fontSize: 18 }} className="text-emerald-600" />,
  "dependents": <GroupsIcon sx={{ fontSize: 18 }} className="text-orange-600" />,
  "employment type": <WorkIcon sx={{ fontSize: 18 }} className="text-blue-600" />,
  "occupation / role": <PersonIcon sx={{ fontSize: 18 }} className="text-indigo-600" />,
  "part-time job": <WorkOutlineIcon sx={{ fontSize: 18 }} className="text-amber-600" />,
  "annual income": <BarChartIcon sx={{ fontSize: 18 }} className="text-rose-600" />,
  "salary": <AccountBalanceWalletIcon sx={{ fontSize: 18 }} className="text-amber-600" />,
  "business": <BusinessIcon sx={{ fontSize: 18 }} className="text-rose-600" />,
  "commission": <PercentIcon sx={{ fontSize: 18 }} className="text-fuchsia-600" />,
  "freelance / rental": <LaptopIcon sx={{ fontSize: 18 }} className="text-sky-600" />,
  "other income": <PaymentsIcon sx={{ fontSize: 18 }} className="text-blue-600" />,
  "total expenses": <BarChartIcon sx={{ fontSize: 18 }} className="text-orange-600" />,
  "food & transport": <RestaurantIcon sx={{ fontSize: 18 }} className="text-amber-600" />,
  "emi & insurance": <CreditCardIcon sx={{ fontSize: 18 }} className="text-pink-600" />,
  "utilities & entertainment": <BoltIcon sx={{ fontSize: 18 }} className="text-yellow-500" />,
  "subscriptions": <SubscriptionsIcon sx={{ fontSize: 18 }} className="text-red-500" />,
  "total assets": <BusinessIcon sx={{ fontSize: 18 }} className="text-teal-600" />,
  "bank balance": <AccountBalanceIcon sx={{ fontSize: 18 }} className="text-blue-700" />,
  "mutual funds": <ShowChartIcon sx={{ fontSize: 18 }} className="text-indigo-600" />,
  "property & vehicle": <HomeIcon sx={{ fontSize: 18 }} className="text-orange-600" />,
  "total liabilities": <LayersIcon sx={{ fontSize: 18 }} className="text-rose-600" />,
  "home loan": <HomeIcon sx={{ fontSize: 18 }} className="text-pink-600" />,
  "personal loan": <DescriptionIcon sx={{ fontSize: 18 }} className="text-blue-600" />,
  "emergency fund": <SecurityIcon sx={{ fontSize: 18 }} className="text-teal-600" />,
  "monthly savings": <SavingsIcon sx={{ fontSize: 18 }} className="text-amber-600" />,
  "ppf / epf": <TrendingUpIcon sx={{ fontSize: 18 }} className="text-emerald-600" />,
  "life insurance": <FavoriteIcon sx={{ fontSize: 18 }} className="text-rose-600" />,
  "health insurance": <MedicalServicesIcon sx={{ fontSize: 18 }} className="text-purple-600" />,
  "nominee": <GroupsIcon sx={{ fontSize: 18 }} className="text-orange-600" />,
  "risk appetite": <TrackChangesIcon sx={{ fontSize: 18 }} className="text-rose-600" />,
  "knowledge level": <MenuBookIcon sx={{ fontSize: 18 }} className="text-purple-600" />,
  "current investments": <BarChartIcon sx={{ fontSize: 18 }} className="text-orange-600" />,
  "selected goals": <TrackChangesIcon sx={{ fontSize: 18 }} className="text-violet-600" />,
  "top priority": <EmojiEventsIcon sx={{ fontSize: 18 }} className="text-amber-500" />,
  "aadhaar": <FingerprintIcon sx={{ fontSize: 18 }} className="text-amber-600" />,
  "pan": <BadgeIcon sx={{ fontSize: 18 }} className="text-blue-600" />,
  "passport": <BookIcon sx={{ fontSize: 18 }} className="text-indigo-700" />,
  "driving licence": <DirectionsCarIcon sx={{ fontSize: 18 }} className="text-sky-600" />,
  "voter id": <AccountBoxIcon sx={{ fontSize: 18 }} className="text-rose-600" />,
  "2 wheeler rc": <DirectionsCarIcon sx={{ fontSize: 18 }} className="text-sky-600" />,
  "4 wheeler rc": <DirectionsCarIcon sx={{ fontSize: 18 }} className="text-sky-600" />,
  "insurance": <SecurityIcon sx={{ fontSize: 18 }} className="text-emerald-600" />,
  "marriage certificate": <Diversity3Icon sx={{ fontSize: 18 }} className="text-brand-green-600" />,
  "community certificate": <GroupsIcon sx={{ fontSize: 18 }} className="text-purple-600" />,
  "birth certificate": <CakeIcon sx={{ fontSize: 18 }} className="text-orange-500" />,
  "ration card": <ReceiptLongIcon sx={{ fontSize: 18 }} className="text-amber-700" />,
  "oci card": <PublicIcon sx={{ fontSize: 18 }} className="text-cyan-600" />,
  "property documents": <HomeIcon sx={{ fontSize: 18 }} className="text-orange-600" />,
  "will": <GavelIcon sx={{ fontSize: 18 }} className="text-violet-600" />,
  "10th": <MenuBookIcon sx={{ fontSize: 18 }} className="text-teal-600" />,
  "12th": <SchoolIcon sx={{ fontSize: 18 }} className="text-sky-700" />,
  "diploma": <AssignmentIcon sx={{ fontSize: 18 }} className="text-violet-600" />,
  "bachelors": <SchoolIcon sx={{ fontSize: 18 }} className="text-indigo-600" />,
  "masters": <SchoolIcon sx={{ fontSize: 18 }} className="text-purple-700" />,
  "courses": <CardMembershipIcon sx={{ fontSize: 18 }} className="text-rose-500" />,
  "all steps reviewed": <FactCheckIcon sx={{ fontSize: 18 }} className="text-blue-600" />,
  "data verified": <VerifiedIcon sx={{ fontSize: 18 }} className="text-emerald-600" />,
  "ready for ai insights": <LightbulbIcon sx={{ fontSize: 18 }} className="text-amber-500" />,
  "available documents": <DescriptionIcon sx={{ fontSize: 18 }} className="text-cyan-600" />,
};

const getFieldIcon = (label: string, bulletColor: string): React.ReactNode => {
  const key = label.toLowerCase().trim();
  const exact = FIELD_ICONS[key];
  if (exact) return exact;
  if (key.includes("wheeler") || key.includes(" rc")) return <DirectionsCarIcon sx={{ fontSize: 18 }} className="text-sky-600" />;
  if (key.includes("rent")) return <HomeIcon sx={{ fontSize: 18 }} className="text-teal-600" />;
  if (key.includes("interest")) return <PercentIcon sx={{ fontSize: 18 }} className="text-emerald-600" />;
  if (key.includes("loan")) return <DescriptionIcon sx={{ fontSize: 18 }} className="text-blue-600" />;
  if (key.includes("income")) return <PaymentsIcon sx={{ fontSize: 18 }} className="text-blue-600" />;
  if (key.includes("certificate")) return <DescriptionIcon sx={{ fontSize: 18 }} className="text-brand-green-600" />;
  if (key.includes("fund")) return <SavingsIcon sx={{ fontSize: 18 }} className="text-emerald-600" />;
  if (key.includes("saving")) return <SavingsIcon sx={{ fontSize: 18 }} className="text-amber-600" />;
  if (key.includes("business")) return <BusinessIcon sx={{ fontSize: 18 }} className="text-rose-600" />;
  if (key.includes("salary")) return <AccountBalanceWalletIcon sx={{ fontSize: 18 }} className="text-amber-600" />;
  if (key.includes("transport")) return <RestaurantIcon sx={{ fontSize: 18 }} className="text-amber-600" />;
  return <DescriptionIcon sx={{ fontSize: 18 }} className={bulletColor.replace("bg-", "text-")} />;
};

export default function ReviewSubmit() {
  const navigate = useNavigate();
  const { assessmentData, completeAssessment } = useApp();
  const [declarationOneAccepted, setDeclarationOneAccepted] = useState(false);
  const [declarationTwoAccepted, setDeclarationTwoAccepted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const DOCUMENT_LABELS: Record<string, string> = {
    aadhaar: "Aadhaar",
    pan: "PAN",
    passport: "Passport",
    drivingLicence: "Driving Licence",
    voterId: "Voter ID",
    twoWheelerRC: "2 Wheeler RC",
    fourWheelerRC: "4 Wheeler RC",
    insurance: "Insurance",
    marriageCertificate: "Marriage Certificate",
    communityCertificate: "Community Certificate",
    birthCertificate: "Birth Certificate",
    rationCard: "Ration Card",
    ociCard: "OCI Card",
    property: "Property Documents",
    will: "Will",
    nominee: "Nominee Details",
    education10th: "10th",
    education12th: "12th",
    diploma: "Diploma",
    bachelors: "Bachelors",
    masters: "Masters",
    courses: "Courses",
  };

  const getSelectedDocumentItems = () => {
    const docs = (assessmentData.documents || {}) as Record<string, any>;
    const items: { label: string; value: string; check?: boolean }[] = [];

    const keysInOrder = [
      "aadhaar",
      "pan",
      "passport",
      "drivingLicence",
      "voterId",
      "twoWheelerRC",
      "fourWheelerRC",
      "insurance",
      "marriageCertificate",
      "communityCertificate",
      "birthCertificate",
      "rationCard",
      "ociCard",
      "property",
      "will",
      "nominee",
      "education10th",
      "education12th",
      "diploma",
      "bachelors",
      "masters",
      "courses",
    ];

    keysInOrder.forEach((key) => {
      const val = docs[key];
      const isYes = val === true || val === "uploaded";
      if (isYes) {
        if (key === "insurance") {
          const types = Array.isArray(docs.insuranceTypes) && docs.insuranceTypes.length > 0
            ? docs.insuranceTypes.join(", ")
            : "Available";
          items.push({
            label: "Insurance",
            value: types,
            check: true,
          });
        } else {
          items.push({
            label: DOCUMENT_LABELS[key] || key,
            value: "Available",
            check: true,
          });
        }
      }
    });

    if (items.length === 0) {
      items.push({
        label: "Available Documents",
        value: "None selected",
      });
    }

    return items;
  };

  const summaryCards: SummaryCard[] = [
    {
      key: "personal",
      title: "Personal Information",
      icon: <PersonIcon sx={{ fontSize: 26 }} />,
      iconColor: "bg-brand-green-50 text-brand-green-700",
      bulletColor: "bg-brand-green-500",
      editRoute: "/personal-information",
      items: [
        { label: "Name", value: assessmentData.personalInfo.fullName || "Not provided" },
        { label: "Email", value: assessmentData.personalInfo.email || "Not provided" },
        { label: "Phone", value: assessmentData.personalInfo.phone ? `+91 ${assessmentData.personalInfo.phone}` : "Not provided" },
        { label: "Age", value: assessmentData.personalInfo.dateOfBirth ? `${calculateAge(assessmentData.personalInfo.dateOfBirth)} years` : "Not provided" },
        { label: "Education", value: assessmentData.personalInfo.education || "Not provided" },
        { label: "Dependents", value: assessmentData.personalInfo.dependents || "0" },
      ],
    },
    {
      key: "employment",
      title: "Employment Details",
      icon: <WorkIcon sx={{ fontSize: 26 }} />,
      iconColor: "bg-sky-50 text-sky-700",
      bulletColor: "bg-sky-500",
      editRoute: "/employment-details",
      items: [
        { label: "Employment Type", value: assessmentData.employment.employmentType || "Not provided" },
        { label: "Occupation / Role", value: assessmentData.employment.occupation || assessmentData.employment.employerName || "Not provided" },
        ...(assessmentData.employment.employmentType === "Student" ? [
          { label: "Education", value: assessmentData.employment.educationQualification || "Not provided" },
          { label: "Part-time Job", value: assessmentData.employment.partTimeJob || "Not specified" },
        ] : []),
        { label: "Annual Income", value: assessmentData.employment.annualIncome ? `₹ ${Number(assessmentData.employment.annualIncome).toLocaleString("en-IN")}` : "Not provided" },
      ],
    },
    {
      key: "income",
      title: "Income Sources",
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 26 }} />,
      iconColor: "bg-purple-50 text-purple-700",
      bulletColor: "bg-purple-500",
      editRoute: "/income-details",
      items: [
        { label: "Salary", value: assessmentData.income.salary ? `₹ ${Number(assessmentData.income.salary).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "Business", value: assessmentData.income.business ? `₹ ${Number(assessmentData.income.business).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "Commission", value: assessmentData.income.commission ? `₹ ${Number(assessmentData.income.commission).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "Freelance / Rental", value: assessmentData.income.freelance || assessmentData.income.rental ? `₹ ${(Number(assessmentData.income.freelance || 0) + Number(assessmentData.income.rental || 0)).toLocaleString("en-IN")}` : "₹ 0" },
        ...(assessmentData.income.otherIncomes && assessmentData.income.otherIncomes.length > 0
          ? assessmentData.income.otherIncomes.map((oi) => ({
              label: oi.type || "Other Income",
              value: oi.amount ? `₹ ${Number(oi.amount).toLocaleString("en-IN")}` : "₹ 0",
            }))
          : []),
        { label: "Other Income", value: assessmentData.income.other ? `₹ ${Number(assessmentData.income.other).toLocaleString("en-IN")}` : "₹ 0" },
      ],
    },
    {
      key: "expenses",
      title: "Monthly Expenses",
      icon: <ShoppingCartIcon sx={{ fontSize: 26 }} />,
      iconColor: "bg-orange-50 text-orange-700",
      bulletColor: "bg-orange-500",
      editRoute: "/monthly-expenses",
      items: [
        {
          label: "Total Expenses",
          value: `₹ ${Object.values(assessmentData.expenses || {}).reduce((acc, curr) => acc + (Number(curr) || 0), 0).toLocaleString("en-IN")}`,
        },
        { label: "Food & Transport", value: `₹ ${(Number(assessmentData.expenses?.food || 0) + Number(assessmentData.expenses?.transport || 0)).toLocaleString("en-IN")}` },
        { label: "EMI & Insurance", value: `₹ ${(Number(assessmentData.expenses?.emi || 0) + Number(assessmentData.expenses?.insurance || 0)).toLocaleString("en-IN")}` },
        { label: "Utilities & Entertainment", value: `₹ ${(Number(assessmentData.expenses?.utilities || 0) + Number(assessmentData.expenses?.entertainment || 0)).toLocaleString("en-IN")}` },
        { label: "Subscriptions", value: assessmentData.expenses?.subscriptions ? `₹ ${Number(assessmentData.expenses.subscriptions).toLocaleString("en-IN")}` : "₹ 0" },
      ],
    },
    {
      key: "assets",
      title: "Assets",
      icon: <AccountBalanceIcon sx={{ fontSize: 26 }} />,
      iconColor: "bg-teal-50 text-teal-700",
      bulletColor: "bg-teal-500",
      editRoute: "/assets",
      items: [
        {
          label: "Total Assets",
          value: `₹ ${Object.values(assessmentData.assets || {}).reduce((acc, curr) => acc + (Number(curr) || 0), 0).toLocaleString("en-IN")}`,
        },
        { label: "Bank Balance", value: assessmentData.assets?.bankAccounts ? `₹ ${Number(assessmentData.assets.bankAccounts).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "Mutual Funds", value: assessmentData.assets?.mutualFunds ? `₹ ${Number(assessmentData.assets.mutualFunds).toLocaleString("en-IN")}${assessmentData.assets?.mutualFundInfo?.mode ? ` (${assessmentData.assets.mutualFundInfo.mode})` : ""}` : "₹ 0" },
        { label: "Property & Vehicle", value: `₹ ${(Number(assessmentData.assets?.realEstate || 0) + Number(assessmentData.assets?.vehicles || 0)).toLocaleString("en-IN")}` },
      ],
    },
    {
      key: "liabilities",
      title: "Liabilities",
      icon: <CreditCardIcon sx={{ fontSize: 26 }} />,
      iconColor: "bg-pink-50 text-pink-700",
      bulletColor: "bg-pink-500",
      editRoute: "/liabilities",
      items: [
        {
          label: "Total Liabilities",
          value: `₹ ${Object.values(assessmentData.liabilities || {}).reduce((acc, curr) => acc + (Number(curr) || 0), 0).toLocaleString("en-IN")}`,
        },
        { label: "Home Loan", value: assessmentData.liabilities?.homeLoan ? `₹ ${Number(assessmentData.liabilities.homeLoan).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "Personal Loan", value: assessmentData.liabilities?.personalLoan ? `₹ ${Number(assessmentData.liabilities.personalLoan).toLocaleString("en-IN")}` : "₹ 0" },
        ...(assessmentData.liabilities?.otherName ? [{ label: assessmentData.liabilities.otherName, value: assessmentData.liabilities.other ? `₹ ${Number(assessmentData.liabilities.other).toLocaleString("en-IN")}` : "₹ 0" }] : []),
      ],
    },
    {
      key: "savings",
      title: "Savings & Investments",
      icon: <SavingsIcon sx={{ fontSize: 26 }} />,
      iconColor: "bg-brand-green-50 text-brand-green-700",
      bulletColor: "bg-brand-green-500",
      editRoute: "/savings",
      items: [
        { label: "Emergency Fund", value: assessmentData.savings?.emergencyFund ? `₹ ${Number(assessmentData.savings.emergencyFund).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "Monthly Savings", value: assessmentData.savings?.monthlySavings ? `₹ ${Number(assessmentData.savings.monthlySavings).toLocaleString("en-IN")}` : "₹ 0" },
        { label: "PPF / EPF", value: `₹ ${(Number(assessmentData.savings?.ppf || 0) + Number(assessmentData.savings?.epf || 0)).toLocaleString("en-IN")}` },
        ...(assessmentData.savings?.otherName ? [{ label: assessmentData.savings.otherName, value: assessmentData.savings.other ? `₹ ${Number(assessmentData.savings.other).toLocaleString("en-IN")}` : "₹ 0" }] : []),
      ],
    },
    {
      key: "insurance",
      title: "Insurance Details",
      icon: <HealthAndSafetyIcon sx={{ fontSize: 26 }} />,
      iconColor: "bg-rose-50 text-rose-700",
      bulletColor: "bg-rose-500",
      editRoute: "/insurance",
      items: [
        { label: "Life Insurance", value: `${assessmentData.insurance?.lifeInsurance?.length || 0} Policies` },
        { label: "Health Insurance", value: `${assessmentData.insurance?.healthInsurance?.length || 0} Policies` },
        { label: "Nominee", value: assessmentData.insurance?.nomineeName ? `${assessmentData.insurance.nomineeName} (${assessmentData.insurance.nomineeRelationship || "Nominee"})` : "Not assigned" },
      ],
    },
    {
      key: "investment",
      title: "Investment Experience",
      icon: <TrendingUpIcon sx={{ fontSize: 26 }} />,
      iconColor: "bg-amber-50 text-amber-700",
      bulletColor: "bg-amber-500",
      editRoute: "/investment-experience",
      items: [
        { label: "Risk Appetite", value: assessmentData.investment?.riskAppetite ? assessmentData.investment.riskAppetite.charAt(0).toUpperCase() + assessmentData.investment.riskAppetite.slice(1) : "Moderate" },
        { label: "Knowledge Level", value: assessmentData.investment?.investmentKnowledge ? assessmentData.investment.investmentKnowledge.charAt(0).toUpperCase() + assessmentData.investment.investmentKnowledge.slice(1) : "Intermediate" },
        { label: "Current Investments", value: `${assessmentData.investment?.currentInvestments?.length || 0} Categories` },
      ],
    },
    {
      key: "goals",
      title: "Financial Goals",
      icon: <FlagIcon sx={{ fontSize: 26 }} />,
      iconColor: "bg-violet-50 text-violet-700",
      bulletColor: "bg-violet-500",
      editRoute: "/financial-goals",
      items: [
        { label: "Selected Goals", value: `${assessmentData.goals?.selectedGoals?.length || 0} Goals` },
        { label: "Top Priority", value: assessmentData.goals?.goalPriorities?.[0] ? assessmentData.goals.goalPriorities[0].toUpperCase() : "Emergency Fund" },
      ],
    },
    {
      key: "documents",
      title: "Document Readiness",
      icon: <DescriptionIcon sx={{ fontSize: 26 }} />,
      iconColor: "bg-cyan-50 text-cyan-700",
      bulletColor: "bg-cyan-500",
      editRoute: "/government-documents",
      items: getSelectedDocumentItems(),
    },
    {
      key: "checklist",
      title: "Review Checklist",
      icon: <ChecklistIcon sx={{ fontSize: 26 }} />,
      iconColor: "bg-indigo-50 text-indigo-700",
      bulletColor: "bg-indigo-500",
      editRoute: "/review-submit",
      items: [
        { label: "All Steps Reviewed", value: "", check: true },
        { label: "Data Verified", value: "", check: true },
        { label: "Ready for AI Insights", value: "", check: true },
      ],
    },
  ];

  const handleSubmit = () => {
    if (!declarationOneAccepted || !declarationTwoAccepted) {
      setSubmitAttempted(true);
      return;
    }
    completeAssessment();
    navigate("/ai-processing");
  };

  return (
    <div className="assessment-page min-h-screen">
      <style>{`
        .assessment-page .label-icon { height: 28px !important; width: 28px !important; border-radius: 9px !important; font-size: 17px; }
        .assessment-page .label-icon svg { font-size: 20px !important; }
        .assessment-page main label.mb-2 { margin-bottom: 6px !important; }
        .assessment-page .asmt-btn-next {
          border-radius: 9999px !important;
          background: linear-gradient(135deg, #128052 0%, #22b573 100%);
          box-shadow: 0 6px 16px rgba(18, 128, 82, 0.3), 0 0 10px rgba(34, 181, 115, 0.18);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .assessment-page .asmt-btn-back {
          border-radius: 9999px !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        }
        @media (prefers-reduced-motion: no-preference) {
          .assessment-page .asmt-btn-next:hover {
            background: linear-gradient(135deg, #16975f 0%, #27c77f 100%);
            box-shadow: 0 10px 24px rgba(18, 128, 82, 0.42), 0 0 16px rgba(34, 181, 115, 0.34);
            transform: translateY(-1px);
          }
          .assessment-page .asmt-btn-next:active { transform: translateY(0); }
          .assessment-page .asmt-btn-back:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(2, 132, 199, 0.22);
          }
        }
      `}</style>
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-6 lg:px-10">
        {/* ─── TOP ROW: Assessment Journey Progress ─── */}
        <AssessmentJourneyProgress
          currentStep={12}
          title="Review Your Information"
          subtitle="Please review all the information you've provided before submitting your assessment."
        />

        {/* ─── White Review Content Panel (continuous light surface) ─── */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-3.5 shadow-[0_6px_28px_rgba(13,37,73,0.10)] sm:p-5">

        {/* ─── Section Title + Expand All ─── */}
        <div className="mb-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1.5 flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-700">
                <ChecklistIcon sx={{ fontSize: 24 }} />
              </span>
            <p className="asmt-section-title text-lg font-extrabold text-navy-950 sm:text-xl">
              Summary of Your Information
            </p>
            </div>
            <p className="mt-1 text-sm font-medium text-slate-600">
              Here's a quick overview of the details you've provided.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex h-10 items-center gap-2 self-start rounded-full border-2 border-brand-green-600 bg-white px-4 text-sm font-bold text-brand-green-700 transition-all duration-250 hover:bg-brand-green-50 active:scale-[0.98]"
          >
            <ListIcon sx={{ fontSize: 18 }} />
            {expanded ? "Collapse All" : "Expand All"}
          </button>
        </div>

        {/* ─── Summary Cards Grid ─── */}
        <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {summaryCards.map((card) => (
            <div
              key={card.key}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${card.iconColor}`}
                  >
                    {card.icon}
                  </span>
                  <p className="text-base font-bold text-navy-950">
                    {card.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(card.editRoute)}
                  className="flex items-center gap-1.5 rounded-lg border-2 border-brand-green-600 bg-white px-3 py-1.5 text-xs font-bold text-brand-green-700 transition-all hover:bg-brand-green-50"
                >
                  <EditIcon sx={{ fontSize: 14 }} />
                  Edit
                </button>
              </div>
              <ul className="space-y-2">
                {card.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                        {getFieldIcon(item.label, card.bulletColor)}
                      </span>
                      <span className="truncate text-slate-600 font-medium">{item.label}:</span>
                    </span>
                    <span className="flex items-center justify-end gap-1.5 text-right">
                      <span className="font-bold text-navy-950">
                        {item.value}
                      </span>
                      {item.check && (
                        <CheckCircleIcon
                          sx={{ fontSize: 16 }}
                          className="shrink-0 text-brand-green-600"
                        />
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ─── Declaration Section ─── */}
        <div className="mt-4 rounded-2xl border border-brand-green-300 bg-brand-green-50/60 p-5 shadow-xs">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green-100">
              <VerifiedUserIcon
                sx={{ fontSize: 24 }}
                className="text-brand-green-700"
              />
            </span>
            <div className="flex-1">
              <p className="text-base font-extrabold text-navy-950">Declaration</p>
              <div className="mt-3 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setDeclarationOneAccepted((v) => !v);
                    setSubmitAttempted(false);
                  }}
                  aria-pressed={declarationOneAccepted}
                  className="flex items-start gap-2.5 text-left text-sm leading-relaxed text-slate-700 font-medium"
                >
                  {declarationOneAccepted ? (
                    <CheckBoxIcon
                      sx={{ fontSize: 26 }}
                      className="mt-0.5 shrink-0 text-brand-green-600"
                    />
                  ) : (
                    <CheckBoxOutlineBlankIcon
                      sx={{ fontSize: 26 }}
                      className="mt-0.5 shrink-0 text-slate-500"
                    />
                  )}
                  I hereby declare that all the information provided above is true, accurate, and complete to the best of my knowledge.
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeclarationTwoAccepted((v) => !v);
                    setSubmitAttempted(false);
                  }}
                  aria-pressed={declarationTwoAccepted}
                  className="flex items-start gap-2.5 text-left text-sm leading-relaxed text-slate-700 font-medium"
                >
                  {declarationTwoAccepted ? (
                    <CheckBoxIcon
                      sx={{ fontSize: 26 }}
                      className="mt-0.5 shrink-0 text-brand-green-600"
                    />
                  ) : (
                    <CheckBoxOutlineBlankIcon
                      sx={{ fontSize: 26 }}
                      className="mt-0.5 shrink-0 text-slate-500"
                    />
                  )}
                  I understand that this information will be used to generate my financial wellness assessment and recommendations.
                </button>
              </div>
              {submitAttempted && (!declarationOneAccepted || !declarationTwoAccepted) && (
                <p className="mt-3 text-xs font-semibold text-red-600">
                  Please agree to both declarations before submitting your assessment.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ─── Bottom Navigation: Back | Download Summary | Submit + Security ─── */}
        <div className="mt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => navigate("/selected-documents")}
              className="asmt-btn-back flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-bold sm:w-auto"
            >
              <ArrowBackIcon sx={{ fontSize: 20 }} />
              Back
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="asmt-btn-back flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-bold sm:w-auto"
            >
              <DownloadIcon sx={{ fontSize: 20 }} />
              Download Summary
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="asmt-btn-next flex h-12 w-full items-center justify-center gap-2 rounded-full px-8 text-[15px] font-bold sm:w-auto"
            >
              Submit Assessment
              <ArrowForwardIcon sx={{ fontSize: 20 }} />
            </button>
          </div>

          {/* Security Message */}
          <p className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600">
            <LockIcon sx={{ fontSize: 16 }} className="text-brand-green-600" />
            Your information is secure and encrypted
          </p>
        </div>

        </div>
      </main>
    </div>
  );
}
