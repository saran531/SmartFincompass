import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

// ─── Auth Types ───
interface AuthState {
  isAuthenticated: boolean;
  email: string;
}

// ─── Assessment Types ───
interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  dependents: string;
  education: string;
}

interface EmploymentInfo {
  employmentType: string;
  employerName: string;
  occupation: string;
  experience: string;
  annualIncome: string;
  additionalIncome: string;
  businessIncome: string;
  contactNumber?: string;
}

interface IncomeInfo {
  salary: string;
  business: string;
  rental: string;
  freelance: string;
  other: string;
}

interface ExpensesInfo {
  food: string;
  transport: string;
  housing: string;
  utilities: string;
  healthcare: string;
  entertainment: string;
  shopping: string;
  other: string;
  emi?: string;
  insurance?: string;
  medical?: string;
}

interface AssetsInfo {
  bankAccounts: string;
  mutualFunds: string;
  stocks: string;
  gold: string;
  realEstate: string;
  crypto: string;
  vehicles: string;
}

interface LiabilitiesInfo {
  homeLoan: string;
  personalLoan: string;
  carLoan: string;
  creditCard: string;
  educationLoan: string;
}

interface SavingsInfo {
  emergencyFund: string;
  monthlySavings: string;
  recurringDeposit: string;
  ppf: string;
  epf: string;
}

interface InsuranceInfo {
  lifeInsurance: { provider: string; amount: string }[];
  healthInsurance: { provider: string; amount: string }[];
  vehicleInsurance: { provider: string; amount: string }[];
  propertyInsurance: { provider: string; amount: string }[];
  nomineeName: string;
  nomineeRelationship: string;
  nomineeDob: string;
  nomineeContact: string;
}

interface InvestmentInfo {
  riskAppetite: string;
  investmentKnowledge: string;
  investmentDuration: string;
  currentInvestments: string[];
}

interface GoalsInfo {
  selectedGoals: string[];
  goalPriorities: string[];
}

interface DocumentsInfo {
  aadhaar: string;
  pan: string;
  passport: string;
  drivingLicence: string;
  insurance: string;
  property: string;
  will: string;
  nominee: string;
}

interface AssessmentData {
  personalInfo: PersonalInfo;
  employment: EmploymentInfo;
  income: IncomeInfo;
  expenses: ExpensesInfo;
  assets: AssetsInfo;
  liabilities: LiabilitiesInfo;
  savings: SavingsInfo;
  insurance: InsuranceInfo;
  investment: InvestmentInfo;
  goals: GoalsInfo;
  documents: DocumentsInfo;
}

// ─── Context Type ───
interface AppContextType {
  auth: AuthState;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isAssessmentCompleted: boolean;
  completeAssessment: () => void;
  resetAssessment: () => void;
  assessmentData: AssessmentData;
  updateAssessment: <K extends keyof AssessmentData>(section: K, data: Partial<AssessmentData[K]>) => void;
}

// ─── Default Assessment Data ───
const defaultAssessmentData: AssessmentData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    dependents: "",
    education: "",
  },
  employment: {
    employmentType: "",
    employerName: "",
    occupation: "",
    experience: "",
    annualIncome: "",
    additionalIncome: "",
    businessIncome: "",
  },
  income: {
    salary: "",
    business: "",
    rental: "",
    freelance: "",
    other: "",
  },
  expenses: {
    food: "",
    transport: "",
    housing: "",
    utilities: "",
    healthcare: "",
    entertainment: "",
    shopping: "",
    other: "",
    emi: "",
    insurance: "",
    medical: "",
  },
  assets: {
    bankAccounts: "",
    mutualFunds: "",
    stocks: "",
    gold: "",
    realEstate: "",
    crypto: "",
    vehicles: "",
  },
  liabilities: {
    homeLoan: "",
    personalLoan: "",
    carLoan: "",
    creditCard: "",
    educationLoan: "",
  },
  savings: {
    emergencyFund: "",
    monthlySavings: "",
    recurringDeposit: "",
    ppf: "",
    epf: "",
  },
  insurance: {
    lifeInsurance: [],
    healthInsurance: [],
    vehicleInsurance: [],
    propertyInsurance: [],
    nomineeName: "",
    nomineeRelationship: "",
    nomineeDob: "",
    nomineeContact: "",
  },
  investment: {
    riskAppetite: "",
    investmentKnowledge: "",
    investmentDuration: "",
    currentInvestments: [],
  },
  goals: {
    selectedGoals: [],
    goalPriorities: [],
  },
  documents: {
    aadhaar: "",
    pan: "",
    passport: "",
    drivingLicence: "",
    insurance: "",
    property: "",
    will: "",
    nominee: "",
  },
};

// ─── Demo Credentials ───
const DEMO_EMAIL = "smartfin@gmail.com";
const DEMO_PASSWORD = "SmartFin @123";

// ─── Context ───
const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem("smartfin_auth");
    return saved ? JSON.parse(saved) : { isAuthenticated: false, email: "" };
  });

  const [isAssessmentCompleted, setIsAssessmentCompleted] = useState(() => {
    const saved = localStorage.getItem("smartfin_assessment_completed");
    return saved === "true";
  });

  const [assessmentData, setAssessmentData] = useState<AssessmentData>(() => {
    const saved = localStorage.getItem("smartfin_assessment_data");
    return saved ? JSON.parse(saved) : defaultAssessmentData;
  });

  useEffect(() => {
    localStorage.setItem("smartfin_auth", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    localStorage.setItem("smartfin_assessment_completed", JSON.stringify(isAssessmentCompleted));
  }, [isAssessmentCompleted]);

  useEffect(() => {
    localStorage.setItem("smartfin_assessment_data", JSON.stringify(assessmentData));
  }, [assessmentData]);

  const login = useCallback((email: string, password: string) => {
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setAuth({ isAuthenticated: true, email });
      return { success: true };
    }
    return { success: false, error: "Invalid email or password. Please use the demo credentials." };
  }, []);

  const logout = useCallback(() => {
    setAuth({ isAuthenticated: false, email: "" });
  }, []);

  const completeAssessment = useCallback(() => {
    setIsAssessmentCompleted(true);
  }, []);

  const resetAssessment = useCallback(() => {
    setIsAssessmentCompleted(false);
    setAssessmentData(defaultAssessmentData);
    localStorage.removeItem("smartfin_assessment_completed");
    localStorage.removeItem("smartfin_assessment_data");
  }, []);

  const updateAssessment = useCallback(
    <K extends keyof AssessmentData>(section: K, data: Partial<AssessmentData[K]>) => {
      setAssessmentData((prev) => ({
        ...prev,
        [section]: { ...prev[section], ...data },
      }));
    },
    []
  );

  return (
    <AppContext.Provider
      value={{
        auth,
        login,
        logout,
        isAssessmentCompleted,
        completeAssessment,
        resetAssessment,
        assessmentData,
        updateAssessment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
