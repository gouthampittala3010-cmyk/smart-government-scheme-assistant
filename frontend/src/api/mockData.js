// Embedded Scheme Database & Client-Side Engine for Standalone / Base44 Cloud Hosting

export const INITIAL_SCHEMES = [
  {
    id: 1,
    name: "PM Kisan Samman Nidhi Yojana",
    code: "PM-KISAN",
    category: "Agriculture & Rural",
    ministry: "Ministry of Agriculture and Farmers Welfare",
    briefDescription: "Direct financial income support of ₹6,000 per year provided to all landholding farmer families across India, transferred directly into bank accounts in three equal installments.",
    benefits: "₹6,000 per annum credited directly into Aadhaar-seeded bank accounts in 3 installments of ₹2,000 each (April-July, August-November, December-March).",
    financialAidAmount: 6000,
    level: "Central",
    applicableState: "All India",
    minAge: 18,
    maxAge: 75,
    eligibleGenders: "All",
    maxAnnualIncome: 1000000,
    eligibleCategories: "All",
    eligibleOccupations: "Farmer,Daily Wage / Laborer",
    eligibleEducations: "All",
    requiresLand: true,
    requiresBpl: false,
    requiresDisability: false,
    ruralOnly: false,
    active: true,
    requiredDocuments: "1. Aadhaar Card\n2. Bank Account Passbook (Aadhaar linked)\n3. Land Ownership Records (Patta / Khatauni / RoR)\n4. Mobile number registered with Aadhaar",
    applicationProcedure: "1. Visit official PM-KISAN portal (https://pmkisan.gov.in).\n2. Click on 'New Farmer Registration' under Farmers Corner.\n3. Enter Aadhaar number and select state.\n4. Fill personal, landholding details, and bank account information.\n5. Submit form. Application verified by local Patwari / Nodal officer.",
    officialWebsite: "https://pmkisan.gov.in",
    helplineNumber: "155261 / 011-24300606",
    tags: "farmer, agriculture, kisan, direct benefit transfer, crop, land"
  },
  {
    id: 2,
    name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    code: "PM-JAY",
    category: "Healthcare & Wellness",
    ministry: "Ministry of Health and Family Welfare",
    briefDescription: "World's largest government-funded health assurance scheme providing health cover of ₹5 Lakh per family per year for secondary and tertiary care hospitalization.",
    benefits: "Cashless and paperless access to medical services up to ₹5,00,000 per family per year across empaneled public and private hospitals across India.",
    financialAidAmount: 500000,
    level: "Central",
    applicableState: "All India",
    minAge: 0,
    maxAge: 120,
    eligibleGenders: "All",
    maxAnnualIncome: 250000,
    eligibleCategories: "All",
    eligibleOccupations: "All",
    eligibleEducations: "All",
    requiresLand: false,
    requiresBpl: false,
    requiresDisability: false,
    ruralOnly: false,
    active: true,
    requiredDocuments: "1. Aadhaar Card or Voter ID\n2. Ration Card or Family Document\n3. Proof of Income / BPL status (if applicable)\n4. Active mobile number",
    applicationProcedure: "1. Visit https://pmjay.gov.in and click 'Am I Eligible'.\n2. Enter mobile number and verify via OTP.\n3. Search family records in Socio-Economic Caste Census database.\n4. Visit nearest Common Service Centre (CSC) or Empaneled Hospital.\n5. Complete biometric e-KYC and download Ayushman Golden Card.",
    officialWebsite: "https://pmjay.gov.in",
    helplineNumber: "14555 / 1800-111-565",
    tags: "health, hospital, insurance, medical, treatment, ayushman, cash cover"
  },
  {
    id: 3,
    name: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
    code: "PMAY-G",
    category: "Housing & Shelter",
    ministry: "Ministry of Rural Development",
    briefDescription: "Provides direct financial assistance to homeless or families living in kutcha/dilapidated houses in rural areas for constructing a pucca house with basic amenities.",
    benefits: "Financial grant of ₹1,20,000 in plain areas and ₹1,30,000 in hilly/difficult states, along with 90/95 days of unskilled labor wages under MGNREGA.",
    financialAidAmount: 120000,
    level: "Central",
    applicableState: "All India",
    minAge: 18,
    maxAge: 75,
    eligibleGenders: "All",
    maxAnnualIncome: 200000,
    eligibleCategories: "All",
    eligibleOccupations: "Farmer,Daily Wage / Laborer,Artisan / Weaver,Unemployed",
    eligibleEducations: "All",
    requiresLand: false,
    requiresBpl: true,
    requiresDisability: false,
    ruralOnly: true,
    active: true,
    requiredDocuments: "1. Aadhaar Card\n2. Bank Account Passbook\n3. MGNREGA Job Card Number\n4. Swachh Bharat Mission (SBM) registration number for toilet subsidy\n5. Land / House site ownership document",
    applicationProcedure: "1. Beneficiary list is prioritized based on SECC 2011 data by Gram Sabha.\n2. Contact your local Gram Panchayat or Block Development Officer (BDO).\n3. Field inspector performs geo-tagging of current house.\n4. Upon sanction, grant is credited in 3 stages corresponding to construction milestones.",
    officialWebsite: "https://pmayg.nic.in",
    helplineNumber: "1800-11-6446",
    tags: "housing, home, rural, pucca house, construction, awas yojana"
  },
  {
    id: 4,
    name: "Central Sector Scheme of Scholarships for College and University Students",
    code: "NSP-CSSS",
    category: "Education & Skill",
    ministry: "Ministry of Education",
    briefDescription: "Financial assistance to meritorious students from low-income families to meet day-to-day expenses while pursuing graduate and post-graduate studies.",
    benefits: "₹12,000 per annum at graduation level for first 3 years and ₹20,000 per annum at post-graduate level, directly credited to bank account.",
    financialAidAmount: 20000,
    level: "Central",
    applicableState: "All India",
    minAge: 17,
    maxAge: 26,
    eligibleGenders: "All",
    maxAnnualIncome: 450000,
    eligibleCategories: "All",
    eligibleOccupations: "Student",
    eligibleEducations: "12th Pass,Diploma / ITI,Graduate",
    requiresLand: false,
    requiresBpl: false,
    requiresDisability: false,
    ruralOnly: false,
    active: true,
    requiredDocuments: "1. Class 12th Board Marksheet\n2. Aadhaar Card\n3. Income Certificate from Revenue Authority (below ₹4.5 Lakhs)\n4. College Admission Fee Receipt & Bonafide Certificate\n5. Bank Passbook in student's name",
    applicationProcedure: "1. Register on National Scholarship Portal (https://scholarships.gov.in).\n2. Fill Application Form with personal, academic, and fee details.\n3. Upload scanned documents.\n4. Institute Nodal Officer (INO) verifies application online.\n5. Scholarship is disbursed via DBT PFMS.",
    officialWebsite: "https://scholarships.gov.in",
    helplineNumber: "0120-6619540",
    tags: "scholarship, student, college, university, education, fees, books"
  },
  {
    id: 5,
    name: "Pradhan Mantri Mudra Yojana (PMMY)",
    code: "PM-MUDRA",
    category: "Financial Inclusion & Business",
    ministry: "Ministry of Finance",
    briefDescription: "Provides collateral-free loans up to ₹10 Lakhs to micro and small non-farm, non-corporate enterprises across Shishu, Kishor, and Tarun categories.",
    benefits: "Collateral-free business loans up to ₹50,000 (Shishu), up to ₹5 Lakhs (Kishor), and up to ₹10 Lakhs (Tarun) with low interest rates and repayment flexibility.",
    financialAidAmount: 1000000,
    level: "Central",
    applicableState: "All India",
    minAge: 18,
    maxAge: 65,
    eligibleGenders: "All",
    maxAnnualIncome: 2000000,
    eligibleCategories: "All",
    eligibleOccupations: "Self Employed / Entrepreneur,Daily Wage / Laborer,Artisan / Weaver,Unemployed",
    eligibleEducations: "All",
    requiresLand: false,
    requiresBpl: false,
    requiresDisability: false,
    ruralOnly: false,
    active: true,
    requiredDocuments: "1. Proof of Identity (Aadhaar / Voter ID / PAN Card)\n2. Proof of Residence\n3. Business Plan / Quotation of machinery or items\n4. Bank account statement of past 6 months\n5. Udyam Registration (for existing units)",
    applicationProcedure: "1. Prepare a project summary or business plan.\n2. Apply online via Udyami Mitra portal (https://udyamimitra.in) or visit any commercial/Gramin bank.\n3. Complete Mudra application form.\n4. Submit documents. Loan is processed without collateral or third-party guarantee.",
    officialWebsite: "https://www.mudra.org.in",
    helplineNumber: "1800-180-1111",
    tags: "mudra, business loan, entrepreneur, shop, MSME, self employed, startup"
  },
  {
    id: 6,
    name: "Sukanya Samriddhi Yojana (Beti Bachao Beti Padhao)",
    code: "SSY-BBBP",
    category: "Social Welfare & Women",
    ministry: "Ministry of Women and Child Development",
    briefDescription: "A government-backed savings scheme for girl children ensuring financial security for higher education and marriage, with high tax-free interest and Section 80C benefits.",
    benefits: "Government assured high interest rate (currently 8.2% p.a.), triple tax exemption (EEE), partial withdrawal permitted after age 18 for higher education.",
    financialAidAmount: 150000,
    level: "Central",
    applicableState: "All India",
    minAge: 0,
    maxAge: 10,
    eligibleGenders: "Female",
    maxAnnualIncome: 5000000,
    eligibleCategories: "All",
    eligibleOccupations: "All",
    eligibleEducations: "All",
    requiresLand: false,
    requiresBpl: false,
    requiresDisability: false,
    ruralOnly: false,
    active: true,
    requiredDocuments: "1. Birth Certificate of the girl child\n2. Identity Proof of parent/guardian (Aadhaar / PAN)\n3. Address proof of parent/guardian\n4. Passport size photographs",
    applicationProcedure: "1. Obtain Form-1 from nearest Post Office or authorized Public/Private Bank.\n2. Fill details of child and guardian.\n3. Attach birth certificate and KYC documents.\n4. Deposit initial opening amount (minimum ₹250).\n5. Receive Sukanya Samriddhi account passbook.",
    officialWebsite: "https://www.indiapost.gov.in",
    helplineNumber: "1800-266-6868",
    tags: "girl child, daughter, women, savings, education, sukanya"
  },
  {
    id: 7,
    name: "Stand-Up India Scheme for Women and SC/ST Entrepreneurs",
    code: "STANDUP-INDIA",
    category: "Financial Inclusion & Business",
    ministry: "Ministry of Finance",
    briefDescription: "Facilitates bank loans between ₹10 Lakh and ₹1 Crore to at least one SC or ST borrower and at least one woman borrower per bank branch for setting up greenfield enterprises.",
    benefits: "Composite loan between ₹10 Lakhs and ₹1 Crore covering up to 85% of total project cost for manufacturing, services, agri-allied or trading sectors.",
    financialAidAmount: 5000000,
    level: "Central",
    applicableState: "All India",
    minAge: 18,
    maxAge: 70,
    eligibleGenders: "Female",
    maxAnnualIncome: 10000000,
    eligibleCategories: "SC,ST,OBC,General,EWS",
    eligibleOccupations: "Self Employed / Entrepreneur,Artisan / Weaver,Unemployed",
    eligibleEducations: "All",
    requiresLand: false,
    requiresBpl: false,
    requiresDisability: false,
    ruralOnly: false,
    active: true,
    requiredDocuments: "1. Proof of Identity and Address\n2. Caste Certificate (for SC/ST applicants)\n3. Detailed Project Report (DPR)\n4. Balance sheets / Net worth statements\n5. Partnership deed or Memorandum of Association",
    applicationProcedure: "1. Visit https://www.standupmitra.in.\n2. Register as a borrower with greenfield project proposal.\n3. Choose handholding support or direct bank application.\n4. Connect with SIDBI partner branches.\n5. Loan sanction and disbursement.",
    officialWebsite: "https://www.standupmitra.in",
    helplineNumber: "1800-180-1111",
    tags: "women entrepreneur, SC, ST, business loan, startup, greenfield, finance"
  },
  {
    id: 8,
    name: "Divyangjan Swavalamban Scheme (Livelihood for PwD)",
    code: "NHFDC-DSS",
    category: "Social Welfare & Women",
    ministry: "Ministry of Social Justice and Empowerment",
    briefDescription: "Provides concessional financial assistance to Persons with Disabilities (PwDs) for starting income-generating enterprises, skill training, and purchasing assistive devices.",
    benefits: "Concessional credit up to ₹5,00,000 at low interest rates (5% to 8%), with interest rebate for women with disabilities and prompt repayment.",
    financialAidAmount: 500000,
    level: "Central",
    applicableState: "All India",
    minAge: 18,
    maxAge: 65,
    eligibleGenders: "All",
    maxAnnualIncome: 500000,
    eligibleCategories: "All",
    eligibleOccupations: "All",
    eligibleEducations: "All",
    requiresLand: false,
    requiresBpl: false,
    requiresDisability: true,
    ruralOnly: false,
    active: true,
    requiredDocuments: "1. Disability Certificate / Unique Disability ID (UDID) Card (40% or more)\n2. Aadhaar Card\n3. Age Proof & Educational Qualification\n4. Income Certificate\n5. Proposed business activity proposal",
    applicationProcedure: "1. Contact State Channelising Agency (SCA) or participating Regional Rural Bank.\n2. Fill NHFDC loan application form.\n3. Attach UDID disability certificate and project estimate.\n4. Screening and recommendation by District Disability Welfare Officer.\n5. Loan disbursement.",
    officialWebsite: "https://nhfdc.nic.in",
    helplineNumber: "0129-2226910",
    tags: "disability, divyang, PwD, accessible, loan, handicap, welfare"
  }
];

// Evaluation algorithm identical to Spring Boot EligibilityEngineService
export function evaluateEligibilityLocally(scheme, profile) {
  let totalRules = 0;
  let passedRules = 0;
  const checks = [];
  const whyEligible = [];
  const whyNotEligible = [];
  const missingRequirements = [];

  // 1. Age
  if (scheme.minAge != null || scheme.maxAge != null) {
    totalRules++;
    const age = profile.age || 0;
    let req = "";
    let pass = false;
    if (scheme.minAge != null && scheme.maxAge != null) {
      req = `${scheme.minAge} to ${scheme.maxAge} years`;
      pass = age >= scheme.minAge && age <= scheme.maxAge;
    } else if (scheme.minAge != null) {
      req = `Min ${scheme.minAge} years`;
      pass = age >= scheme.minAge;
    } else {
      req = `Max ${scheme.maxAge} years`;
      pass = age <= scheme.maxAge;
    }

    checks.push({
      criterionName: "Age Limit",
      requiredRule: req,
      citizenValue: `${age} years`,
      passed: pass,
      reason: pass ? `Age ${age} falls within ${req}` : `Age ${age} does not meet ${req}`
    });

    if (pass) {
      passedRules++;
      whyEligible.push(`Age criteria satisfied: ${age} years (${req})`);
    } else {
      whyNotEligible.push(`Age unmet: You are ${age} years, required: ${req}`);
      missingRequirements.push(`Applicant age must be ${req}`);
    }
  }

  // 2. Gender
  if (scheme.eligibleGenders && scheme.eligibleGenders !== "All") {
    totalRules++;
    const pass = scheme.eligibleGenders.toLowerCase().includes((profile.gender || "").toLowerCase());
    checks.push({
      criterionName: "Gender Restriction",
      requiredRule: scheme.eligibleGenders,
      citizenValue: profile.gender,
      passed: pass,
      reason: pass ? `Gender (${profile.gender}) matches` : `Reserved for ${scheme.eligibleGenders}`
    });

    if (pass) {
      passedRules++;
      whyEligible.push(`Gender criteria met: ${profile.gender}`);
    } else {
      whyNotEligible.push(`Scheme reserved for ${scheme.eligibleGenders}`);
      missingRequirements.push(`Applicant must be ${scheme.eligibleGenders}`);
    }
  }

  // 3. State
  if (scheme.applicableState && scheme.applicableState !== "All India") {
    totalRules++;
    const pass = (profile.state || "").toLowerCase() === scheme.applicableState.toLowerCase();
    checks.push({
      criterionName: "State Domicile",
      requiredRule: scheme.applicableState,
      citizenValue: profile.state,
      passed: pass,
      reason: pass ? `Resident of ${profile.state}` : `Only for ${scheme.applicableState}`
    });

    if (pass) {
      passedRules++;
      whyEligible.push(`State domicile matched: ${profile.state}`);
    } else {
      whyNotEligible.push(`Requires domicile in ${scheme.applicableState}`);
      missingRequirements.push(`Must be a permanent resident of ${scheme.applicableState}`);
    }
  }

  // 4. Income
  if (scheme.maxAnnualIncome) {
    totalRules++;
    const income = profile.annualIncome || 0;
    const pass = income <= scheme.maxAnnualIncome;
    checks.push({
      criterionName: "Income Ceiling",
      requiredRule: `Max ₹${scheme.maxAnnualIncome.toLocaleString('en-IN')}`,
      citizenValue: `₹${income.toLocaleString('en-IN')}`,
      passed: pass,
      reason: pass ? `Income is within ceiling` : `Income exceeds ₹${scheme.maxAnnualIncome.toLocaleString('en-IN')}`
    });

    if (pass) {
      passedRules++;
      whyEligible.push(`Income criteria met: ₹${income.toLocaleString('en-IN')}`);
    } else {
      whyNotEligible.push(`Income exceeds ceiling of ₹${scheme.maxAnnualIncome.toLocaleString('en-IN')}`);
      missingRequirements.push(`Annual family income must not exceed ₹${scheme.maxAnnualIncome.toLocaleString('en-IN')}`);
    }
  }

  // 5. Category
  if (scheme.eligibleCategories && scheme.eligibleCategories !== "All") {
    totalRules++;
    const pass = scheme.eligibleCategories.toLowerCase().includes((profile.category || "").toLowerCase());
    checks.push({
      criterionName: "Social Category",
      requiredRule: scheme.eligibleCategories,
      citizenValue: profile.category,
      passed: pass,
      reason: pass ? `Category (${profile.category}) matched` : `Eligible categories: ${scheme.eligibleCategories}`
    });

    if (pass) {
      passedRules++;
      whyEligible.push(`Social category matched: ${profile.category}`);
    } else {
      whyNotEligible.push(`Scheme targets: ${scheme.eligibleCategories}`);
      missingRequirements.push(`Belong to category: ${scheme.eligibleCategories}`);
    }
  }

  // 6. Occupation
  if (scheme.eligibleOccupations && scheme.eligibleOccupations !== "All") {
    totalRules++;
    const pass = scheme.eligibleOccupations.toLowerCase().includes((profile.occupation || "").toLowerCase());
    checks.push({
      criterionName: "Occupation",
      requiredRule: scheme.eligibleOccupations,
      citizenValue: profile.occupation,
      passed: pass,
      reason: pass ? `Occupation matched` : `Target occupation: ${scheme.eligibleOccupations}`
    });

    if (pass) {
      passedRules++;
      whyEligible.push(`Occupation criteria met: ${profile.occupation}`);
    } else {
      whyNotEligible.push(`Occupation mismatch: ${scheme.eligibleOccupations}`);
      missingRequirements.push(`Must belong to occupation: ${scheme.eligibleOccupations}`);
    }
  }

  // 7. Land
  if (scheme.requiresLand) {
    totalRules++;
    const pass = Boolean(profile.hasLand);
    checks.push({
      criterionName: "Agricultural Land",
      requiredRule: "Must own cultivable land",
      citizenValue: profile.hasLand ? `Yes (${profile.landHoldingHectares || 1} Ha)` : "No land",
      passed: pass,
      reason: pass ? "Land requirement met" : "Requires cultivable land"
    });

    if (pass) {
      passedRules++;
      whyEligible.push("Landholding criteria satisfied");
    } else {
      whyNotEligible.push("Cultivable agricultural land ownership is mandatory");
      missingRequirements.push("Land ownership documents (RoR / Patta)");
    }
  }

  // 8. Disability
  if (scheme.requiresDisability) {
    totalRules++;
    const pass = Boolean(profile.disability);
    checks.push({
      criterionName: "Disability (PwD)",
      requiredRule: "Must have disability (>=40%)",
      citizenValue: profile.disability ? "Yes" : "No",
      passed: pass,
      reason: pass ? "Disability status verified" : "Requires benchmark disability"
    });

    if (pass) {
      passedRules++;
      whyEligible.push("Disability criteria satisfied");
    } else {
      whyNotEligible.push("Scheme is exclusively for Persons with Disabilities (PwD)");
      missingRequirements.push("Valid UDID or Disability Certificate (>=40%)");
    }
  }

  // 9. Rural only
  if (scheme.ruralOnly) {
    totalRules++;
    const pass = (profile.ruralUrban || "").toLowerCase() === "rural";
    checks.push({
      criterionName: "Area Classification",
      requiredRule: "Rural Area Only",
      citizenValue: profile.ruralUrban,
      passed: pass,
      reason: pass ? "Rural residency verified" : "Rural residents only"
    });

    if (pass) {
      passedRules++;
      whyEligible.push("Residency in rural jurisdiction verified");
    } else {
      whyNotEligible.push("Scheme is reserved exclusively for rural residents");
      missingRequirements.push("Residence in a designated rural area");
    }
  }

  const score = totalRules === 0 ? 100 : Math.round((passedRules / totalRules) * 100);
  let matchStatus = "NOT_ELIGIBLE";
  let eligible = false;
  if (score === 100) {
    matchStatus = "FULLY_ELIGIBLE";
    eligible = true;
    if (whyEligible.length === 0) whyEligible.push("Open to all Indian citizens meeting basic criteria");
  } else if (score >= 60) {
    matchStatus = "PARTIALLY_ELIGIBLE";
  }

  return {
    scheme,
    score,
    matchStatus,
    eligible,
    passedCriteriaCount: passedRules,
    totalCriteriaCount: totalRules,
    criteriaChecks: checks,
    whyEligibleReasons: whyEligible,
    whyNotEligibleReasons: whyNotEligible,
    missingRequirements
  };
}
