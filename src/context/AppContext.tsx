import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

// ─── Auth Types ───
interface AuthState {
  isAuthenticated: boolean;
  email: string;
  fullName?: string;
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
  dependentsBreakdown?: { spouse: number; children: number; parents: number; other: number };
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
  educationQualification?: string;
  partTimeJob?: string;
}

interface OtherIncomeEntry {
  type: string;
  amount: string;
}

interface IncomeInfo {
  salary: string;
  business: string;
  rental: string;
  freelance: string;
  other: string;
  commission?: string;
  otherIncomes?: OtherIncomeEntry[];
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
  subscriptions?: string;
}

interface AssetEntry {
  name: string;
  amount: string;
}

interface MutualFundInfo {
  mode?: string;
  lumpsumAmount?: string;
  sipAmount?: string;
}

interface AssetsInfo {
  bankAccounts: string;
  mutualFunds: string;
  stocks: string;
  gold: string;
  realEstate: string;
  crypto: string;
  vehicles: string;
  fixedDeposits?: string;
  bankAccountsList?: AssetEntry[];
  fixedDepositsList?: AssetEntry[];
  propertyList?: AssetEntry[];
  vehicleList?: AssetEntry[];
  mutualFundInfo?: MutualFundInfo;
}

interface LiabilitiesInfo {
  homeLoan: string;
  personalLoan: string;
  carLoan: string;
  creditCard: string;
  educationLoan: string;
  other?: string;
  otherName?: string;
}

interface SavingsInfo {
  emergencyFund: string;
  monthlySavings: string;
  recurringDeposit: string;
  ppf: string;
  epf: string;
  other?: string;
  otherName?: string;
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
  aadhaar?: boolean | string;
  pan?: boolean | string;
  passport?: boolean | string;
  drivingLicence?: boolean | string;
  voterId?: boolean;
  twoWheelerRC?: boolean;
  fourWheelerRC?: boolean;
  insurance?: boolean | string;
  insuranceTypes?: string[];
  marriageCertificate?: boolean;
  communityCertificate?: boolean;
  birthCertificate?: boolean;
  rationCard?: boolean;
  ociCard?: boolean;
  property?: boolean | string;
  will?: boolean | string;
  nominee?: boolean | string;
  education10th?: boolean;
  education12th?: boolean;
  diploma?: boolean;
  bachelors?: boolean;
  masters?: boolean;
  courses?: boolean;
  [key: string]: any;
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
  saveAccountName: (fullName: string) => void;
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
    commission: "",
    otherIncomes: [],
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
    subscriptions: "",
  },
  assets: {
    bankAccounts: "",
    mutualFunds: "",
    stocks: "",
    gold: "",
    realEstate: "",
    crypto: "",
    vehicles: "",
    fixedDeposits: "",
    bankAccountsList: [],
    fixedDepositsList: [],
    propertyList: [],
    vehicleList: [],
    mutualFundInfo: {},
  },
  liabilities: {
    homeLoan: "",
    personalLoan: "",
    carLoan: "",
    creditCard: "",
    educationLoan: "",
    other: "",
    otherName: "",
  },
  savings: {
    emergencyFund: "",
    monthlySavings: "",
    recurringDeposit: "",
    ppf: "",
    epf: "",
    other: "",
    otherName: "",
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
    aadhaar: undefined,
    pan: undefined,
    passport: undefined,
    drivingLicence: undefined,
    voterId: undefined,
    twoWheelerRC: undefined,
    fourWheelerRC: undefined,
    insurance: undefined,
    insuranceTypes: [],
    marriageCertificate: undefined,
    communityCertificate: undefined,
    birthCertificate: undefined,
    rationCard: undefined,
    ociCard: undefined,
    property: undefined,
    will: undefined,
    nominee: undefined,
    education10th: undefined,
    education12th: undefined,
    diploma: undefined,
    bachelors: undefined,
    masters: undefined,
    courses: undefined,
  },
};

// ─── Age Calculation Helper ───
export function calculateAge(dob: string): number {
  if (!dob) return 0;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// ─── Demo Credentials ───
export const DEMO_ACCOUNTS = [
  {
    email: "smartfin@gmail.com",
    password: "SmartFin @123",
  },
  {
    email: "gokul@gmail.com",
    password: "Smartfin123",
  },
];

export function validateDemoCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const match = DEMO_ACCOUNTS.find(
    (acc) => acc.email.toLowerCase() === normalizedEmail && acc.password === password
  );
  if (match) {
    return { success: true, email: match.email };
  }
  return { success: false, error: "Invalid email or password." };
}

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
    const res = validateDemoCredentials(email, password);
    if (res.success && res.email) {
      setAuth((prev) => ({ ...prev, isAuthenticated: true, email: res.email }));
      return { success: true };
    }
    return { success: false, error: res.error || "Invalid email or password." };
  }, []);

  const logout = useCallback(() => {
    setAuth((prev) => ({ isAuthenticated: false, email: "", fullName: prev.fullName }));
  }, []);

  const saveAccountName = useCallback((fullName: string) => {
    setAuth((prev) => ({ ...prev, fullName }));
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
        saveAccountName,
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
