/* =========================================================
   B.TECH Credit Assessment Tool — app.js
   Final full version (cleaned + non-duplicated explanations)
   ========================================================= */

/* ----------------------- 1. TRANSLATIONS ----------------------- */

const translations = {
  en: {
    dir: "ltr",
    appTitle: "B.TECH Credit Assessment",
    appSubtitle: "Internal tool for evaluating customer creditworthiness",
    step1Label: "Customer Type",
    step2Label: "Questionnaire",
    step3Label: "Results",

    chooseCustomerType: "Select customer type",
    chooseCustomerTypeHint: "The questionnaire and scoring model will adapt automatically.",
    typeSole: "Sole Proprietor / Small Business",
    typeSoleDesc: "Simplified business figures, I-Score based",
    typeSME: "SME / Large Corporate",
    typeSMEDesc: "Audited financial statements based",

    next: "Next",
    back: "Back",
    calculate: "Calculate Assessment",
    startOver: "Start New Assessment",
    exportPdf: "Export PDF",

    sectionBasicInfo: "Basic Information",
    sectionCreditTerms: "Requested Credit Terms",
    sectionCreditHistory: "Credit History",
    sectionFinancials: "Financial Information",
    sectionBusinessRisk: "Business Risk Factors",
    sectionSecurity: "Security / Collateral",

    customerName: "Customer Name",
    companyName: "Company Name",
    businessActivity: "Business Activity",
    industry: "Industry",
    yearsInBusiness: "Years in Business",
    numberOfBranches: "Number of Branches",
    registeredCapital: "Registered Capital — Commercial Registry (EGP)",
    annualSalesBtech: "Annual Sales with B.TECH (EGP)",
    annualPlannedSales: "Annual Planned Sales with B.TECH (EGP)",
    requestedPaymentTerm: "Requested Payment Term (days)",
    requestedCreditLimit: "Requested Credit Limit (EGP)",
    iScoreRating: "I-Score Score (400–850)",
    paymentBehavior: "Payment Behavior",
    maxDelay: "Maximum Delay",
    bouncedCheques: "Number of Bounced Cheques",
    legalHistory: "Legal / Default History",
    guaranteeAvailable: "Guarantee Cheque Available",
    guaranteeValue: "Guarantee Cheque Value (EGP)",

    cash: "Cash (EGP)",
    accountsReceivable: "Accounts Receivable (EGP)",
    inventory: "Inventory (EGP)",
    shortTermDebt: "Short-Term Debt (EGP)",
    totalDebt: "Total Debt (EGP)",
    totalEquity: "Total Equity (EGP)",
    revenue: "Revenue (EGP)",
    netIncome: "Net Income (EGP)",
    interestExpense: "Interest Expense (EGP)",
    depreciationAmortization: "Depreciation & Amortization (EGP)",
    optionalTag: "optional — improves accuracy",
    operatingCashFlow: "Operating Cash Flow",
    seasonalBusiness: "Seasonal Business?",
    majorCustomerDependency: "Major Customer Dependency?",
    majorSupplierDependency: "Major Supplier Dependency?",
    legalDisputes: "Legal Disputes?",
    taxDisputes: "Tax Disputes?",

    yes: "Yes",
    no: "No",
    selectOption: "Select…",
    behaviorNeverDelayed: "Never delayed",
    behaviorRarelyDelayed: "Rarely delayed",
    behaviorSometimesDelayed: "Sometimes delayed",
    behaviorFrequentlyDelayed: "Frequently delayed",
    delayNone: "None",
    delayUnder30: "Less than 30 days",
    delay30to90: "30–90 days",
    delayOver90: "More than 90 days",
    cfPositive: "Positive",
    cfNeutral: "Neutral",
    cfNegative: "Negative",

    fieldRequired: "This field is required",
    mustBeNumber: "Please enter a valid number",
    mustBePositive: "Value must be zero or greater",
    pleaseSelect: "Please make a selection",
    iScoreRangeError: "I-Score must be between 400 and 850",
    formHasErrors: "Please complete all required fields before continuing.",

    resultsTitle: "Assessment Results",
    resultsSubtitle: "Automated credit evaluation based on submitted data",
    creditScore: "Credit Score",
    riskGrade: "Risk Grade",
    requestedLimitDisplay: "Requested Credit Limit",
    approvedLimitDisplay: "Approved Credit Limit",
    initialLimitDisplay: "Initial Credit Limit (First 3 Months)",
    initialLimitRuleNote:
      "Rule: If approved limit < EGP 350,000, initial limit = approved limit. Otherwise, initial limit = 50% of approved with minimum EGP 350,000.",
    limitRangeNote: "Range shown — credit officer to set the final limit within it.",
    recommendedTerm: "Recommended Payment Term",
    finalDecision: "Final Decision",
    days: "days",
    upTo: "Up to {n} days",
    between: "{a}–{b} days",

    decisionApproved: "Approved",
    decisionConditional: "Conditional Approval",
    decisionRejected: "Rejected",

    gradeA: "Grade A — Low Risk",
    gradeB: "Grade B — Low–Medium Risk",
    gradeC: "Grade C — Medium Risk",
    gradeD: "Grade D — High Risk",

    strengths: "Strengths",
    weaknesses: "Weaknesses",
    riskDrivers: "Risk Drivers",
    noneIdentified: "None identified",

    explanationTitle: "Why this decision?",

    expExcellentPaymentHistory: "Excellent payment history",
    expGoodPaymentHistory: "Good payment history",
    expGoodCollateral: "Good collateral coverage",
    expWeakPaymentHistory: "Weak payment history",
    expMultipleBounced: "Multiple bounced cheques on record",
    expLegalHistory: "Legal / default history on record",
    expNoBounced: "No bounced cheques on record",
    expNoLegalHistory: "No legal or default history",
    expStrongBusinessAge: "Established business with strong track record",
    expYoungBusiness: "Limited operating history",
    expStrongBranchNetwork: "Strong branch network supports scale",
    expModerateBranchNetwork: "Moderate branch network",
    expLimitedBranchNetwork: "Limited branch network",
    expLimitReducedForCreditHistory: "Calculated limit was reduced due to a weaker credit history",
    expStrongCurrentRatio: "Strong current ratio (healthy short-term liquidity)",
    expWeakCurrentRatio: "Weak current ratio (liquidity pressure)",
    expStrongQuickRatio: "Strong quick ratio",
    expWeakQuickRatio: "Weak quick ratio",
    expHighDebtToEquity: "High debt-to-equity ratio",
    expLowDebtToEquity: "Conservative debt-to-equity ratio",
    expHealthyNetMargin: "Healthy net profit margin",
    expWeakNetMargin: "Weak or negative net profit margin",
    expNegativeNetIncome: "Estimated EBITDA is zero or negative — credit limit constrained accordingly",
    expEbitdaEstimateIncomplete:
      "EBITDA estimate is based on net income alone — interest and depreciation/amortization were not provided",
    expPositiveCashFlow: "Positive operating cash flow",
    expNegativeCashFlow: "Negative operating cash flow",
    expSeasonalRisk: "Revenue is seasonal, adding cash flow variability",
    expCustomerConcentration: "Dependent on a small number of major customers",
    expSupplierConcentration: "Dependent on a small number of major suppliers",
    expLegalDisputeRisk: "Active legal disputes present",
    expTaxDisputeRisk: "Active tax disputes present",
    expNoBusinessRiskFlags: "No major business risk flags identified",
    expRequestExceedsCapacity: "Requested limit exceeds calculated capacity",
    expRequestWithinCapacity: "Requested limit is within calculated capacity",
    expNoGuarantee: "No guarantee cheque provided",
    resultCustomer: "Customer",
    resultAssessmentDate: "Assessment Date",

    footerNote:
      "This tool provides an automated preliminary assessment. Final credit decisions should be reviewed and approved by an authorized department.",
    languageToggle: "العربية",
  },

  ar: {
    dir: "rtl",
    appTitle: "أداة تقييم الائتمان - بي تك",
    appSubtitle: "أداة داخلية لتقييم الجدارة الائتمانية للعملاء",
    step1Label: "نوع العميل",
    step2Label: "الاستبيان",
    step3Label: "النتائج",

    chooseCustomerType: "اختر نوع العميل",
    chooseCustomerTypeHint: "سيتم تكييف الاستبيان ونموذج التقييم تلقائيًا.",
    typeSole: "منشأة فردية / مسئولية محدودة",
    typeSoleDesc: "أرقام تجارية مبسطة، يعتمد على آي سكور",
    typeSME: "شركة متوسطة / ش.م.م",
    typeSMEDesc: "يعتمد على القوائم المالية المدققة",

    next: "التالي",
    back: "رجوع",
    calculate: "إجراء التقييم",
    startOver: "تقييم جديد",
    exportPdf: "تصدير PDF",

    sectionBasicInfo: "المعلومات الأساسية",
    sectionCreditTerms: "شروط الائتمان المطلوبة",
    sectionCreditHistory: "السجل الائتماني",
    sectionFinancials: "المعلومات المالية",
    sectionBusinessRisk: "عوامل مخاطر الأعمال",
    sectionSecurity: "الضمانات",

    customerName: "اسم العميل",
    companyName: "اسم الشركة",
    businessActivity: "النشاط التجاري",
    industry: "القطاع",
    yearsInBusiness: "سنوات النشاط",
    numberOfBranches: "عدد الفروع",
    registeredCapital: "رأس المال المصدَّر — السجل التجاري (جنيه)",
    annualSalesBtech: "المبيعات السنوية مع بي تك (جنيه)",
    annualPlannedSales: "المبيعات السنوية المخططة مع بي تك (جنيه)",
    requestedPaymentTerm: "فترة السداد المطلوبة (أيام)",
    requestedCreditLimit: "الحد الائتماني المطلوب (جنيه)",
    iScoreRating: "درجة آي سكور (400–850)",
    paymentBehavior: "سلوك السداد",
    maxDelay: "أقصى فترة تأخير",
    bouncedCheques: "عدد الشيكات المرتجعة",
    legalHistory: "سجل قانوني / تعثر سابق",
    guaranteeAvailable: "توافر شيك ضمان",
    guaranteeValue: "قيمة شيك الضمان (جنيه)",

    cash: "النقدية (جنيه)",
    accountsReceivable: "الذمم المدينة (جنيه)",
    inventory: "المخزون (جنيه)",
    shortTermDebt: "الديون قصيرة الأجل (جنيه)",
    totalDebt: "إجمالي الديون (جنيه)",
    totalEquity: "إجمالي حقوق الملكية (جنيه)",
    revenue: "الإيرادات (جنيه)",
    netIncome: "صافي الربح (جنيه)",
    interestExpense: "مصروفات الفوائد (جنيه)",
    depreciationAmortization: "الاستهلاك والإطفاء (جنيه)",
    optionalTag: "اختياري — يحسّن دقة التقدير",
    operatingCashFlow: "التدفق النقدي التشغيلي",
    seasonalBusiness: "هل النشاط موسمي؟",
    majorCustomerDependency: "اعتماد على عميل رئيسي؟",
    majorSupplierDependency: "اعتماد على مورد رئيسي؟",
    legalDisputes: "نزاعات قانونية؟",
    taxDisputes: "نزاعات ضريبية؟",

    yes: "نعم",
    no: "لا",
    selectOption: "اختر…",
    behaviorNeverDelayed: "لم يتأخر أبدًا",
    behaviorRarelyDelayed: "نادرًا ما يتأخر",
    behaviorSometimesDelayed: "يتأخر أحيانًا",
    behaviorFrequentlyDelayed: "يتأخر كثيرًا",
    delayNone: "بدون تأخير",
    delayUnder30: "أقل من 30 يومًا",
    delay30to90: "30–90 يومًا",
    delayOver90: "أكثر من 90 يومًا",
    cfPositive: "موجب",
    cfNeutral: "متوسط",
    cfNegative: "سالب",

    fieldRequired: "هذا الحقل مطلوب",
    mustBeNumber: "يرجى إدخال رقم صحيح",
    mustBePositive: "يجب أن تكون القيمة صفر أو أكبر",
    pleaseSelect: "يرجى تحديد اختيار",
    iScoreRangeError: "يجب أن تكون درجة آي سكور بين 400 و 850",
    formHasErrors: "يرجى استكمال جميع الحقول المطلوبة للاستمرار.",

    resultsTitle: "نتائج التقييم",
    resultsSubtitle: "تقييم ائتماني آلي بناءً على البيانات المقدمة",
    creditScore: "التقييم الائتماني",
    riskGrade: "درجة الخطورة",
    requestedLimitDisplay: "الحد الائتماني المطلوب",
    approvedLimitDisplay: "الحد الائتماني المعتمد",
    initialLimitDisplay: "الحد الائتماني المبدئي (أول 3 شهور)",
    initialLimitRuleNote:
      "القاعدة: إذا كان الحد المعتمد أقل من 350,000 جنيه، فالحد المبدئي = الحد المعتمد. بخلاف ذلك: الحد المبدئي = 50% من الحد المعتمد وبحد أدنى 350,000 جنيه.",
    limitRangeNote: "نطاق مقترح — يحدد مدير الائتمان الحد النهائي ضمنه.",
    recommendedTerm: "فترة السداد المقترحة",
    finalDecision: "القرار النهائي",
    days: "يوم",
    upTo: "حتى {n} يومًا",
    between: "{a}–{b} يومًا",

    decisionApproved: "موافقة",
    decisionConditional: "موافقة مشروطة",
    decisionRejected: "مرفوض",

    gradeA: "الدرجة A — خطورة منخفضة",
    gradeB: "الدرجة B — خطورة منخفضة إلى متوسطة",
    gradeC: "الدرجة C — خطورة متوسطة",
    gradeD: "الدرجة D — خطورة مرتفعة",

    strengths: "نقاط القوة",
    weaknesses: "نقاط الضعف",
    riskDrivers: "محركات الخطورة",
    noneIdentified: "لا يوجد",

    explanationTitle: "لماذا هذا القرار؟",

    expExcellentPaymentHistory: "سجل سداد ممتاز",
    expGoodPaymentHistory: "سجل سداد جيد",
    expGoodCollateral: "تغطية ضمانات جيدة",
    expWeakPaymentHistory: "سجل سداد ضعيف",
    expMultipleBounced: "وجود شيكات مرتجعة متعددة",
    expLegalHistory: "وجود سجل قانوني أو تعثر سابق",
    expNoBounced: "عدم وجود شيكات مرتجعة",
    expNoLegalHistory: "عدم وجود سجل قانوني أو تعثر",
    expStrongBusinessAge: "نشاط تجاري قائم بسجل قوي",
    expYoungBusiness: "سجل تشغيلي محدود",
    expStrongBranchNetwork: "شبكة فروع قوية تدعم حجم النشاط",
    expModerateBranchNetwork: "شبكة فروع متوسطة",
    expLimitedBranchNetwork: "شبكة فروع محدودة",
    expLimitReducedForCreditHistory: "تم تخفيض الحد المحسوب بسبب ضعف السجل الائتماني",
    expStrongCurrentRatio: "نسبة تداول قوية (سيولة قصيرة الأجل جيدة)",
    expWeakCurrentRatio: "نسبة تداول ضعيفة (ضغط على السيولة)",
    expStrongQuickRatio: "نسبة سيولة سريعة قوية",
    expWeakQuickRatio: "نسبة سيولة سريعة ضعيفة",
    expHighDebtToEquity: "نسبة دين إلى حقوق ملكية مرتفعة",
    expLowDebtToEquity: "نسبة دين إلى حقوق ملكية متحفظة",
    expHealthyNetMargin: "هامش ربح صافي صحي",
    expWeakNetMargin: "هامش ربح صافي ضعيف أو سالب",
    expNegativeNetIncome: "تقدير EBITDA صفر أو سالب — تم تقييد الحد الائتماني وفقًا لذلك",
    expEbitdaEstimateIncomplete: "تقدير EBITDA مبني على صافي الربح فقط — لم يتم إدخال الفوائد أو الاستهلاك/الإطفاء",
    expPositiveCashFlow: "تدفق نقدي تشغيلي موجب",
    expNegativeCashFlow: "تدفق نقدي تشغيلي سالب",
    expSeasonalRisk: "الإيرادات موسمية، مما يزيد تقلب التدفق النقدي",
    expCustomerConcentration: "اعتماد على عدد محدود من العملاء الرئيسيين",
    expSupplierConcentration: "اعتماد على عدد محدود من الموردين الرئيسيين",
    expLegalDisputeRisk: "وجود نزاعات قانونية نشطة",
    expTaxDisputeRisk: "وجود نزاعات ضريبية نشطة",
    expNoBusinessRiskFlags: "لا توجد مؤشرات خطورة كبيرة في النشاط",
    expRequestExceedsCapacity: "الحد المطلوب يتجاوز القدرة المحسوبة",
    expRequestWithinCapacity: "الحد المطلوب ضمن القدرة المحسوبة",
    expNoGuarantee: "لا يوجد شيك ضمان مقدم",
    resultCustomer: "العميل",
    resultAssessmentDate: "تاريخ التقييم",

    footerNote: "توفر هذه الأداة تقييمًا أوليًا آليًا. يجب مراجعة و اعتماد القرارات الائتمانية النهائية من قبل الادارة المختصة.",
    languageToggle: "English",
  },
};

/* ----------------------- 2. STATE ----------------------- */

const state = {
  lang: "en",
  step: 1,
  customerType: null,
  values: {},
  errors: {},
  result: null,
};

/* ----------------------- 3. FIELD DEFINITIONS ----------------------- */

const PAYMENT_TERM_OPTIONS = [7, 10, 15, 21, 30, 45, 65];

function selectField(key, labelKey, optionsKey) {
  return { key, labelKey, type: "select", optionsKey };
}
function numberField(key, labelKey, opts = {}) {
  return { key, labelKey, type: "number", min: 0, ...opts };
}
function textField(key, labelKey) {
  return { key, labelKey, type: "text" };
}
function yesNoField(key, labelKey) {
  return { key, labelKey, type: "select", optionsKey: "yesNo" };
}

const OPTION_SETS = {
  paymentTerm: PAYMENT_TERM_OPTIONS.map((d) => ({ value: String(d), labelKey: null, raw: d })),
  paymentBehavior: [
    { value: "never", labelKey: "behaviorNeverDelayed" },
    { value: "rarely", labelKey: "behaviorRarelyDelayed" },
    { value: "sometimes", labelKey: "behaviorSometimesDelayed" },
    { value: "frequently", labelKey: "behaviorFrequentlyDelayed" },
  ],
  maxDelay: [
    { value: "none", labelKey: "delayNone" },
    { value: "under30", labelKey: "delayUnder30" },
    { value: "30to90", labelKey: "delay30to90" },
    { value: "over90", labelKey: "delayOver90" },
  ],
  yesNo: [
    { value: "yes", labelKey: "yes" },
    { value: "no", labelKey: "no" },
  ],
  cashFlow: [
    { value: "positive", labelKey: "cfPositive" },
    { value: "neutral", labelKey: "cfNeutral" },
    { value: "negative", labelKey: "cfNegative" },
  ],
};

const MODEL_FIELDS = {
  sole: [
    {
      sectionKey: "sectionBasicInfo",
      fields: [
        textField("customerName", "customerName"),
        textField("businessActivity", "businessActivity"),
        numberField("yearsInBusiness", "yearsInBusiness"),
        numberField("numberOfBranches", "numberOfBranches"),
      ],
    },
    {
      sectionKey: "sectionFinancials",
      fields: [
        numberField("registeredCapital", "registeredCapital"),
        numberField("annualSalesBtech", "annualSalesBtech"),
      ],
    },
    {
      sectionKey: "sectionCreditTerms",
      fields: [
        selectField("requestedPaymentTerm", "requestedPaymentTerm", "paymentTerm"),
        numberField("requestedCreditLimit", "requestedCreditLimit"),
      ],
    },
    {
      sectionKey: "sectionCreditHistory",
      fields: [
        numberField("iScoreRating", "iScoreRating"),
        selectField("paymentBehavior", "paymentBehavior", "paymentBehavior"),
        selectField("maxDelay", "maxDelay", "maxDelay"),
        numberField("bouncedCheques", "bouncedCheques"),
        yesNoField("legalHistory", "legalHistory"),
      ],
    },
    {
      sectionKey: "sectionSecurity",
      fields: [
        yesNoField("guaranteeAvailable", "guaranteeAvailable"),
        numberField("guaranteeValue", "guaranteeValue"),
      ],
    },
  ],

  sme: [
    {
      sectionKey: "sectionBasicInfo",
      fields: [
        textField("companyName", "companyName"),
        textField("industry", "industry"),
        numberField("yearsInBusiness", "yearsInBusiness"),
        numberField("numberOfBranches", "numberOfBranches"),
      ],
    },
    {
      sectionKey: "sectionCreditTerms",
      fields: [
        numberField("annualPlannedSales", "annualPlannedSales"),
        selectField("requestedPaymentTerm", "requestedPaymentTerm", "paymentTerm"),
        numberField("requestedCreditLimit", "requestedCreditLimit"),
      ],
    },
    {
      sectionKey: "sectionFinancials",
      fields: [
        numberField("cash", "cash"),
        numberField("accountsReceivable", "accountsReceivable"),
        numberField("inventory", "inventory"),
        numberField("shortTermDebt", "shortTermDebt"),
        numberField("totalDebt", "totalDebt"),
        numberField("totalEquity", "totalEquity"),
        numberField("revenue", "revenue"),
        numberField("netIncome", "netIncome"),
        numberField("interestExpense", "interestExpense", { optional: true }),
        numberField("depreciationAmortization", "depreciationAmortization", { optional: true }),
        selectField("operatingCashFlow", "operatingCashFlow", "cashFlow"),
      ],
    },
    {
      sectionKey: "sectionBusinessRisk",
      fields: [
        yesNoField("seasonalBusiness", "seasonalBusiness"),
        yesNoField("majorCustomerDependency", "majorCustomerDependency"),
        yesNoField("majorSupplierDependency", "majorSupplierDependency"),
        yesNoField("legalDisputes", "legalDisputes"),
        yesNoField("taxDisputes", "taxDisputes"),
      ],
    },
  ],
};

/* ----------------------- 4. SCORING ENGINES ----------------------- */

const BEHAVIOR_POINTS = { never: 1, rarely: 0.8, sometimes: 0.5, frequently: 0.15 };
const DELAY_POINTS = { none: 1, under30: 0.75, "30to90": 0.4, over90: 0.1 };

function num(v) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

const VAT_RATE = 0.14;
const INITIAL_LIMIT_FLOOR = 350000;

function salesBasedLimit(netAnnualSales, paymentDays) {
  const days = paymentDays > 0 ? paymentDays : 30;
  const grossAnnual = netAnnualSales * (1 + VAT_RATE);
  return (grossAnnual * days) / 360;
}

function iScoreAcceptanceRatio(iScoreRaw) {
  const s = num(iScoreRaw);
  if (s >= 726 && s <= 850) return 1.0;
  if (s >= 701 && s <= 725) return 0.9;
  if (s >= 676 && s <= 700) return 0.85;
  if (s >= 651 && s <= 675) return 0.8;
  if (s >= 626 && s <= 650) return 0.75;
  if (s >= 599 && s <= 625) return 0.70;
  if (s >= 573 && s <= 598) return 0.65;
  if (s >= 547 && s <= 572) return 0.55;
  if (s >= 521 && s <= 546) return 0.5;
  if (s >= 400 && s <= 520) return 0.0;
  return 0;
}

function branchScoreFactor(branchesRaw) {
  const branches = Math.floor(num(branchesRaw));
  if (branches >= 3) return 1.0;
  if (branches === 2) return 0.8;
  if (branches === 1) return 0.7;
  return 0;
}

function creditQualityMultiplier(v) {
  const bounced = num(v.bouncedCheques);
  const hasLegalHistory = v.legalHistory === "yes";
  const iScore = num(v.iScoreRating);

  if (hasLegalHistory || bounced >= 2 || iScore <= 520) {
    return { multiplier: 0, tier: "bad" };
  }

  const iScoreRatio = iScoreAcceptanceRatio(iScore);
  let weakSignals = 0;
  if (iScoreRatio < 0.85) weakSignals++;
  if (["sometimes", "frequently"].includes(v.paymentBehavior)) weakSignals++;
  if (["30to90", "over90"].includes(v.maxDelay)) weakSignals++;
  if (bounced === 1) weakSignals++;

  if (weakSignals === 0) return { multiplier: 1.0, tier: "clean" };
  if (weakSignals === 1) return { multiplier: 0.9, tier: "good" };
  if (weakSignals === 2) return { multiplier: 0.75, tier: "average" };
  return { multiplier: 0.5, tier: "weak" };
}

function scoreModelB(v) {
  let historyPts = 0;
  historyPts += iScoreAcceptanceRatio(v.iScoreRating) * 40;
  historyPts += (BEHAVIOR_POINTS[v.paymentBehavior] ?? 0) * 12;
  historyPts += (DELAY_POINTS[v.maxDelay] ?? 0) * 10;

  const bounced = num(v.bouncedCheques);
  historyPts += (bounced === 0 ? 8 : bounced === 1 ? 3 : 0);

  let creditHistory = Math.min(70, historyPts);
  if (v.legalHistory === "yes") creditHistory = Math.min(creditHistory, 20);

  const years = num(v.yearsInBusiness);
  const businessStrength = Math.max(0, Math.min(1, years / 3)) * 10;

  const requestedLimit = num(v.requestedCreditLimit);
  const guaranteeValue = v.guaranteeAvailable === "yes" ? num(v.guaranteeValue) : 0;
  const securityRatio = requestedLimit > 0 ? Math.min(1, guaranteeValue / requestedLimit) : 0;
  const security = securityRatio * 10;

  const branches = branchScoreFactor(v.numberOfBranches) * 10;

  const total = creditHistory + businessStrength + security + branches;

  return {
    total: Math.round(Math.max(0, Math.min(100, total))),
    breakdown: { creditHistory, businessStrength, security, branches },
  };
}

function limitModelB(v) {
  const annualSalesBtech = num(v.annualSalesBtech);
  const paymentDays = num(v.requestedPaymentTerm) || 30;
  const salesLimit = salesBasedLimit(annualSalesBtech, paymentDays);

  const { multiplier, tier } = creditQualityMultiplier(v);

  if (multiplier === 0) {
    return {
      finalLimit: 0,
      salesBasedLimit: salesLimit,
      creditQualityMultiplier: 0,
      creditQualityTier: tier,
      guaranteeDiscount: 0,
    };
  }

  const limitAfterQuality = salesLimit * multiplier;
  const hasGuarantee = v.guaranteeAvailable === "yes" && num(v.guaranteeValue) > 0;
  const guaranteeDiscount = hasGuarantee ? 0 : 0.10;
  const finalLimit = limitAfterQuality * (1 - guaranteeDiscount);

  return {
    finalLimit,
    salesBasedLimit: salesLimit,
    limitAfterQuality,
    creditQualityMultiplier: multiplier,
    creditQualityTier: tier,
    guaranteeDiscount,
  };
}

function ratiosModelC(v) {
  const cash = num(v.cash);
  const ar = num(v.accountsReceivable);
  const inventory = num(v.inventory);
  const std = num(v.shortTermDebt);
  const totalDebt = num(v.totalDebt);
  const equity = num(v.totalEquity);
  const revenue = num(v.revenue);
  const netIncome = num(v.netIncome);

  const currentRatio = std > 0 ? (cash + ar + inventory) / std : null;
  const quickRatio = std > 0 ? (cash + ar) / std : null;
  const debtToEquity = equity > 0 ? totalDebt / equity : null;
  const netMargin = revenue > 0 ? netIncome / revenue : null;

  return { currentRatio, quickRatio, debtToEquity, netMargin };
}

function scoreModelC(v) {
  const { currentRatio, quickRatio, debtToEquity, netMargin } = ratiosModelC(v);

  const crScore = currentRatio === null ? 0.5 : Math.max(0, Math.min(1, currentRatio / 2));
  const qrScore = quickRatio === null ? 0.5 : Math.max(0, Math.min(1, quickRatio / 1.2));
  const deScore = debtToEquity === null ? 0.5 : Math.max(0, Math.min(1, 1 - debtToEquity / 2));
  const financialStrength = ((crScore + qrScore + deScore) / 3) * 35;

  const cfMap = { positive: 1, neutral: 0.55, negative: 0.1 };
  const cfScore = cfMap[v.operatingCashFlow] ?? 0.5;
  const marginScore = netMargin === null ? 0.5 : Math.max(0, Math.min(1, netMargin / 0.15));
  const cashFlow = ((cfScore + marginScore) / 2) * 20;

  const riskFlags = ["seasonalBusiness", "majorCustomerDependency", "majorSupplierDependency", "legalDisputes", "taxDisputes"];
  const yesCount = riskFlags.filter((k) => v[k] === "yes").length;
  const businessRiskRatio = Math.max(0, 1 - yesCount / riskFlags.length);
  const businessRisk = businessRiskRatio * 15;

  const requestedLimit = num(v.requestedCreditLimit);
  const annualPlannedSales = num(v.annualPlannedSales);
  const monthlySales = annualPlannedSales / 12;
  const commercialRatio = requestedLimit > 0 ? Math.min(1, monthlySales / requestedLimit) : 0.5;
  const commercialValue = commercialRatio * 15;

  const security = qrScore * 15;
  const total = financialStrength + cashFlow + businessRisk + commercialValue + security;

  return {
    total: Math.round(Math.max(0, Math.min(100, total))),
    breakdown: { financialStrength, cashFlow, businessRisk, commercialValue, security },
    ratios: { currentRatio, quickRatio, debtToEquity, netMargin },
  };
}

function limitModelC(v, grade) {
  const annualPlannedSales = num(v.annualPlannedSales);
  const paymentDays = num(v.requestedPaymentTerm) || 30;
  const salesLimit = salesBasedLimit(annualPlannedSales, paymentDays);

  const equity = num(v.totalEquity);
  let equityPct = 0.08;
  if (grade === "A" || grade === "B") equityPct = 0.25;
  else if (grade === "C") equityPct = 0.15;
  const equityBasedLimit = equity * equityPct;

  const cash = num(v.cash);
  const ar = num(v.accountsReceivable);
  const inventory = num(v.inventory);
  const std = num(v.shortTermDebt);
  const liquidityBasedLimit = cash + ar * 0.7 + inventory * 0.3 - std;

  const netIncome = num(v.netIncome);
  const interestExpense = num(v.interestExpense);
  const depreciationAmortization = num(v.depreciationAmortization);
  const approxEbitda = netIncome + interestExpense + depreciationAmortization;
  const ebitdaIsPartial = interestExpense === 0 && depreciationAmortization === 0;

  let incomePct = 0.25;
  if (grade === "A") incomePct = 0.5;
  else if (grade === "B") incomePct = 0.4;
  else if (grade === "C") incomePct = 0.25;
  const incomeBasedLimit = Math.max(0, approxEbitda * incomePct);

  const candidates = [salesLimit, equityBasedLimit, liquidityBasedLimit].filter((n) => n > 0);
  if (netIncome !== 0 || v.netIncome !== undefined) candidates.push(incomeBasedLimit);

  const finalLimit = candidates.length ? Math.min(...candidates) : 0;
  const upperLimit = candidates.length ? Math.max(...candidates) : 0;

  return {
    finalLimit,
    upperLimit,
    salesBasedLimit: salesLimit,
    equityBasedLimit,
    liquidityBasedLimit,
    incomeBasedLimit,
    approxEbitda,
    ebitdaIsPartial,
  };
}

/* ----------------------- 5. DECISION ENGINE ----------------------- */

function gradeFromScore(score) {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  return "D";
}

function decisionFromGrade(grade) {
  switch (grade) {
    case "A":
      return { decision: "approved", term: { type: "upTo", n: 65 } };
    case "B":
      return { decision: "approved", term: { type: "between", a: 30, b: 45 } };
    case "C":
      return { decision: "conditional", term: { type: "between", a: 7, b: 21 } };
    default:
      return { decision: "rejected", term: null };
  }
}

function buildExplanationSole(v, scoreData, limitData) {
  const strengths = [];
  const weaknesses = [];
  const drivers = [];

  // ✅ Fixed semantic duplication:
  // never => excellent only
  // rarely => good only
  if (v.paymentBehavior === "never") {
    strengths.push("expExcellentPaymentHistory");
  } else if (v.paymentBehavior === "rarely") {
    strengths.push("expGoodPaymentHistory");
  } else if (["sometimes", "frequently"].includes(v.paymentBehavior)) {
    weaknesses.push("expWeakPaymentHistory");
    drivers.push("expWeakPaymentHistory");
  }

  const bounced = num(v.bouncedCheques);
  if (bounced === 0) strengths.push("expNoBounced");
  else if (bounced >= 2) {
    weaknesses.push("expMultipleBounced");
    drivers.push("expMultipleBounced");
  }

  if (v.legalHistory === "no") strengths.push("expNoLegalHistory");
  else {
    weaknesses.push("expLegalHistory");
    drivers.push("expLegalHistory");
  }

  const years = num(v.yearsInBusiness);
  if (years >= 3) strengths.push("expStrongBusinessAge");
  else if (years < 1) {
    weaknesses.push("expYoungBusiness");
    drivers.push("expYoungBusiness");
  }

  const branches = Math.floor(num(v.numberOfBranches));
  if (branches >= 3) strengths.push("expStrongBranchNetwork");
  else if (branches === 2) strengths.push("expModerateBranchNetwork");
  else weaknesses.push("expLimitedBranchNetwork");

  if (v.guaranteeAvailable === "yes" && num(v.guaranteeValue) > 0) strengths.push("expGoodCollateral");
  else drivers.push("expNoGuarantee");

  if (limitData && limitData.creditQualityMultiplier < 1) {
    drivers.push("expLimitReducedForCreditHistory");
  }

  return { strengths, weaknesses, drivers };
}

function buildExplanationSME(v, scoreData, limitData) {
  const strengths = [];
  const weaknesses = [];
  const drivers = [];
  const { currentRatio, quickRatio, debtToEquity, netMargin } = scoreData.ratios;

  if (currentRatio !== null) {
    if (currentRatio >= 1.5) strengths.push("expStrongCurrentRatio");
    else if (currentRatio < 1) {
      weaknesses.push("expWeakCurrentRatio");
      drivers.push("expWeakCurrentRatio");
    }
  }

  if (quickRatio !== null) {
    if (quickRatio >= 1) strengths.push("expStrongQuickRatio");
    else if (quickRatio < 0.6) {
      weaknesses.push("expWeakQuickRatio");
      drivers.push("expWeakQuickRatio");
    }
  }

  if (debtToEquity !== null) {
    if (debtToEquity <= 0.6) strengths.push("expLowDebtToEquity");
    else if (debtToEquity > 1.5) {
      weaknesses.push("expHighDebtToEquity");
      drivers.push("expHighDebtToEquity");
    }
  }

  if (netMargin !== null) {
    if (netMargin >= 0.1) strengths.push("expHealthyNetMargin");
    else if (netMargin < 0.03) {
      weaknesses.push("expWeakNetMargin");
      drivers.push("expWeakNetMargin");
    }
  }

  const approxEbitda = limitData ? limitData.approxEbitda : num(v.netIncome);
  if (approxEbitda <= 0) {
    weaknesses.push("expNegativeNetIncome");
    drivers.push("expNegativeNetIncome");
  }

  if (limitData && limitData.ebitdaIsPartial) {
    drivers.push("expEbitdaEstimateIncomplete");
  }

  if (v.operatingCashFlow === "positive") strengths.push("expPositiveCashFlow");
  else if (v.operatingCashFlow === "negative") {
    weaknesses.push("expNegativeCashFlow");
    drivers.push("expNegativeCashFlow");
  }

  const riskFlagsMap = {
    seasonalBusiness: "expSeasonalRisk",
    majorCustomerDependency: "expCustomerConcentration",
    majorSupplierDependency: "expSupplierConcentration",
    legalDisputes: "expLegalDisputeRisk",
    taxDisputes: "expTaxDisputeRisk",
  };

  let anyRisk = false;
  Object.entries(riskFlagsMap).forEach(([key, expKey]) => {
    if (v[key] === "yes") {
      drivers.push(expKey);
      anyRisk = true;
    }
  });
  if (!anyRisk) strengths.push("expNoBusinessRiskFlags");

  const years = num(v.yearsInBusiness);
  if (years >= 5) strengths.push("expStrongBusinessAge");
  else if (years < 2) weaknesses.push("expYoungBusiness");

  return { strengths, weaknesses, drivers };
}

function dedupeByPriority(explanation) {
  const used = new Set();

  const uniq = (arr) => {
    const out = [];
    (arr || []).forEach((k) => {
      if (!used.has(k)) {
        used.add(k);
        out.push(k);
      }
    });
    return out;
  };

  const drivers = uniq(explanation.drivers);
  const weaknesses = uniq(explanation.weaknesses);
  const strengths = uniq(explanation.strengths);

  return { strengths, weaknesses, drivers };
}

function capExplanationItems(explanation, limits = { strengths: 5, weaknesses: 5, drivers: 4 }) {
  return {
    strengths: (explanation.strengths || []).slice(0, limits.strengths),
    weaknesses: (explanation.weaknesses || []).slice(0, limits.weaknesses),
    drivers: (explanation.drivers || []).slice(0, limits.drivers),
  };
}

function computeInitialLimit(approvedLimit, decision) {
  if (decision === "rejected" || approvedLimit <= 0) return null;
  if (approvedLimit < INITIAL_LIMIT_FLOOR) return approvedLimit;
  return Math.max(INITIAL_LIMIT_FLOOR, approvedLimit * 0.5);
}

function runAssessment() {
  const v = state.values;
  let scoreData, limitData, explanation;

  if (state.customerType === "sole") {
    scoreData = scoreModelB(v);
    limitData = limitModelB(v);
    explanation = buildExplanationSole(v, scoreData, limitData);
  } else {
    scoreData = scoreModelC(v);
    const grade = gradeFromScore(scoreData.total);
    limitData = limitModelC(v, grade);
    explanation = buildExplanationSME(v, scoreData, limitData);
  }

  const grade = gradeFromScore(scoreData.total);
  const { decision, term } = decisionFromGrade(grade);

  const requestedLimit = num(v.requestedCreditLimit);
  if (requestedLimit > 0) {
    if (limitData.finalLimit >= requestedLimit) explanation.strengths.push("expRequestWithinCapacity");
    else {
      explanation.weaknesses.push("expRequestExceedsCapacity");
      explanation.drivers.push("expRequestExceedsCapacity");
    }
  }

  explanation = dedupeByPriority(explanation);
  explanation = capExplanationItems(explanation);

  const approvedLimit = decision === "rejected" ? 0 : Math.round(Math.max(0, limitData.finalLimit));
  const approvedLimitMax =
    state.customerType === "sme" && decision !== "rejected"
      ? Math.round(Math.max(0, limitData.upperLimit))
      : null;
  const initialLimit = decision === "rejected" ? null : Math.round(computeInitialLimit(approvedLimit, decision));

  state.result = {
    score: scoreData.total,
    grade,
    decision,
    term,
    requestedLimit: requestedLimit > 0 ? Math.round(requestedLimit) : null,
    approvedLimit,
    approvedLimitMax,
    initialLimit,
    explanation,
    breakdown: scoreData.breakdown,
  };
}

/* ----------------------- 6. RENDERING ----------------------- */

function t(key, vars) {
  let str = translations[state.lang][key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([k, val]) => {
      str = str.replace(`{${k}}`, val);
    });
  }
  return str;
}

function formatCurrency(n) {
  const formatted = Math.round(n).toLocaleString("en-US");
  return state.lang === "ar" ? `${formatted} جنيه` : `EGP ${formatted}`;
}

function applyLanguage() {
  const dict = translations[state.lang];
  document.documentElement.lang = state.lang;
  document.documentElement.dir = dict.dir;
  document.body.classList.toggle("rtl", dict.dir === "rtl");
  document.body.classList.toggle("ltr", dict.dir === "ltr");

  document.getElementById("appTitle").textContent = t("appTitle");
  document.getElementById("appSubtitle").textContent = t("appSubtitle");
  document.getElementById("langToggleBtn").textContent = t("languageToggle");
  document.getElementById("footerNote").textContent = t("footerNote");

  document.getElementById("stepLabel1").textContent = t("step1Label");
  document.getElementById("stepLabel2").textContent = t("step2Label");
  document.getElementById("stepLabel3").textContent = t("step3Label");

  document.getElementById("btnBackTo1").textContent = t("back");
  document.getElementById("btnNextTo3").textContent = t("calculate");
  document.getElementById("btnBackTo2").textContent = t("back");
  document.getElementById("btnExportPdf").textContent = t("exportPdf");
  document.getElementById("btnStartOver").textContent = t("startOver");

  renderCurrentStep();
}

function renderProgress() {
  for (let i = 1; i <= 3; i++) {
    const dot = document.getElementById(`stepDot${i}`);
    const connector = document.getElementById(`stepConnector${i}`);
    dot.classList.remove("active", "complete");
    if (i < state.step) dot.classList.add("complete");
    if (i === state.step) dot.classList.add("active");
    if (connector) connector.classList.toggle("complete", i < state.step);
  }
}

function renderCurrentStep() {
  renderProgress();
  document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
  if (state.step === 1) {
    document.getElementById("screen1").classList.add("active");
    renderScreen1();
  } else if (state.step === 2) {
    document.getElementById("screen2").classList.add("active");
    renderScreen2();
  } else {
    document.getElementById("screen3").classList.add("active");
    renderScreen3();
  }
}

function renderScreen1() {
  const wrap = document.getElementById("customerTypeGrid");
  wrap.innerHTML = "";
  const types = [
    { key: "sole", icon: iconBriefcase(), titleKey: "typeSole", descKey: "typeSoleDesc" },
    { key: "sme", icon: iconBuilding(), titleKey: "typeSME", descKey: "typeSMEDesc" },
  ];

  document.getElementById("chooseCustomerType").textContent = t("chooseCustomerType");
  document.getElementById("chooseCustomerTypeHint").textContent = t("chooseCustomerTypeHint");

  types.forEach((type) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "type-card" + (state.customerType === type.key ? " selected" : "");
    card.innerHTML = `
      <span class="type-card-icon">${type.icon}</span>
      <span class="type-card-title">${t(type.titleKey)}</span>
      <span class="type-card-desc">${t(type.descKey)}</span>
    `;
    card.addEventListener("click", () => {
      state.customerType = type.key;
      state.values = {};
      state.errors = {};
      renderScreen1();
      setTimeout(() => goToStep(2), 180);
    });
    wrap.appendChild(card);
  });
}

function renderScreen2() {
  const sections = MODEL_FIELDS[state.customerType] || [];
  const container = document.getElementById("questionnaireContainer");
  container.innerHTML = "";

  sections.forEach((section) => {
    const sectionEl = document.createElement("div");
    sectionEl.className = "form-section";
    const heading = document.createElement("h3");
    heading.className = "form-section-title";
    heading.textContent = t(section.sectionKey);
    sectionEl.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "form-grid";
    section.fields.forEach((field) => grid.appendChild(renderField(field)));

    sectionEl.appendChild(grid);
    container.appendChild(sectionEl);
  });
}

function renderField(field) {
  const group = document.createElement("div");
  group.className = "form-group";

  const label = document.createElement("label");
  label.className = "form-label";
  label.htmlFor = `field-${field.key}`;
  label.textContent = t(field.labelKey) + (field.optional ? ` (${t("optionalTag")})` : "");
  group.appendChild(label);

  let input;
  if (field.type === "select") {
    input = document.createElement("select");
    input.className = "form-control";
    input.id = `field-${field.key}`;

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = t("selectOption");
    input.appendChild(placeholder);

    const options = OPTION_SETS[field.optionsKey] || [];
    options.forEach((opt) => {
      const optionEl = document.createElement("option");
      optionEl.value = opt.value;
      optionEl.textContent = opt.labelKey ? t(opt.labelKey) : `${opt.raw} ${t("days")}`;
      input.appendChild(optionEl);
    });

    input.value = state.values[field.key] ?? "";
    input.addEventListener("change", () => {
      state.values[field.key] = input.value;
      clearFieldError(field.key);
    });
  } else if (field.type === "number") {
    input = document.createElement("input");
    input.type = "text";
    input.inputMode = "decimal";
    input.className = "form-control";
    input.id = `field-${field.key}`;
    input.placeholder = "0";

    const rawValue = state.values[field.key];

    function formatWithCommas(val) {
      if (val === undefined || val === null || val === "") return "";
      const str = String(val);
      const neg = str.startsWith("-") ? "-" : "";
      const unsigned = neg ? str.slice(1) : str;
      const parts = unsigned.split(".");
      const intPart = parts[0].replace(/\D/g, "");
      const decPart = parts.length > 1 ? "." + parts[1].replace(/\D/g, "") : "";
      const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return neg + withCommas + decPart;
    }

    input.value =
      rawValue !== undefined && rawValue !== null && Number(rawValue) !== 0
        ? formatWithCommas(rawValue)
        : "";

    input.addEventListener("input", () => {
      const cursorFromEnd = input.value.length - input.selectionStart;
      const cleaned = input.value.replace(/,/g, "");
      const numericOnly = cleaned.replace(/[^\d.-]/g, "");
      state.values[field.key] = numericOnly;
      input.value = formatWithCommas(numericOnly);
      const newPos = Math.max(0, input.value.length - cursorFromEnd);
      input.setSelectionRange(newPos, newPos);
      clearFieldError(field.key);
    });
  } else {
    input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";
    input.id = `field-${field.key}`;
    input.value = state.values[field.key] ?? "";
    input.addEventListener("input", () => {
      state.values[field.key] = input.value;
      clearFieldError(field.key);
    });
  }

  group.appendChild(input);

  const errorEl = document.createElement("span");
  errorEl.className = "form-error";
  errorEl.id = `error-${field.key}`;
  if (state.errors[field.key]) {
    errorEl.textContent = t(state.errors[field.key]);
    input.classList.add("invalid");
  }
  group.appendChild(errorEl);

  return group;
}

function clearFieldError(key) {
  if (state.errors[key]) {
    delete state.errors[key];
    const errorEl = document.getElementById(`error-${key}`);
    const inputEl = document.getElementById(`field-${key}`);
    if (errorEl) errorEl.textContent = "";
    if (inputEl) inputEl.classList.remove("invalid");
  }
}

function validateScreen2() {
  const sections = MODEL_FIELDS[state.customerType] || [];
  let valid = true;
  state.errors = {};

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      const value = state.values[field.key];

      if (field.type === "select") {
        if (!value) {
          state.errors[field.key] = "pleaseSelect";
          valid = false;
        }
      } else if (field.type === "number") {
        const isEmpty = value === undefined || value === "" || value === null;
        if (isEmpty && field.optional) {
          // optional
        } else if (isEmpty) {
          state.errors[field.key] = "fieldRequired";
          valid = false;
        } else if (isNaN(parseFloat(value))) {
          state.errors[field.key] = "mustBeNumber";
          valid = false;
        } else if (parseFloat(value) < 0) {
          state.errors[field.key] = "mustBePositive";
          valid = false;
        } else if (field.key === "iScoreRating") {
          const s = parseFloat(value);
          if (s < 400 || s > 850) {
            state.errors[field.key] = "iScoreRangeError";
            valid = false;
          }
        }
      } else {
        if (!value || !value.trim()) {
          state.errors[field.key] = "fieldRequired";
          valid = false;
        }
      }
    });
  });

  return valid;
}

function renderScreen3() {
  try {
    runAssessment();
    const r = state.result;

    const customerNameKey = state.customerType === "sme" ? "companyName" : "customerName";
    const customerNameVal = state.values[customerNameKey] || "—";
    document.getElementById("resultCustomerLabel").textContent = t("resultCustomer");
    document.getElementById("resultCustomerName").textContent = customerNameVal;

    document.getElementById("resultDateLabel").textContent = t("resultAssessmentDate");
    document.getElementById("resultAssessmentDate").textContent = new Date().toLocaleDateString(
      state.lang === "ar" ? "ar-EG" : "en-GB",
      { year: "numeric", month: "long", day: "numeric" }
    );

    document.getElementById("resultsTitle").textContent = t("resultsTitle");
    document.getElementById("resultsSubtitle").textContent = t("resultsSubtitle");

    renderScoreGauge(r.score, r.grade);

    document.getElementById("creditScoreLabel").textContent = t("creditScore");
    document.getElementById("creditScoreValue").textContent = r.score;

    document.getElementById("riskGradeLabel").textContent = t("riskGrade");
    const gradeBadge = document.getElementById("riskGradeValue");
    gradeBadge.textContent = t(`grade${r.grade}`);
    gradeBadge.className = "result-badge grade-" + r.grade;

    document.getElementById("recommendedLimitLabel").textContent = t("requestedLimitDisplay");
    const requestedValueEl = document.getElementById("recommendedLimitValue");
    requestedValueEl.textContent = r.requestedLimit != null ? formatCurrency(r.requestedLimit) : "—";

    document.getElementById("recommendedTermLabel").textContent = t("approvedLimitDisplay");
    const approvedValueEl = document.getElementById("recommendedTermValue");
    if (r.decision === "rejected") {
      approvedValueEl.textContent = "—";
    } else if (r.approvedLimitMax != null && r.approvedLimitMax > r.approvedLimit) {
      approvedValueEl.innerHTML =
        `<span class="limit-range">${formatCurrency(r.approvedLimit)} — ${formatCurrency(r.approvedLimitMax)}</span>` +
        `<span class="limit-range-note">${t("limitRangeNote")}</span>`;
    } else {
      approvedValueEl.textContent = formatCurrency(r.approvedLimit);
    }

    document.getElementById("finalDecisionLabel").textContent = t("initialLimitDisplay");
    const initialValueEl = document.getElementById("finalDecisionValue");
    if (r.decision === "rejected" || r.initialLimit == null) {
      initialValueEl.textContent = "—";
      initialValueEl.className = "result-tile-value";
    } else {
      initialValueEl.textContent = formatCurrency(r.initialLimit);
      initialValueEl.className = "result-tile-value";
    }

    gradeBadge.insertAdjacentHTML(
      "afterend",
      `<div class="limit-range-note" style="margin-top:6px">${t("finalDecision")}: ${t(`decision${capitalize(r.decision)}`)}</div>`
    );

    if (r.decision !== "rejected") {
      initialValueEl.insertAdjacentHTML("afterend", `<span class="limit-range-note">${t("initialLimitRuleNote")}</span>`);
    }

    document.getElementById("explanationTitle").textContent = t("explanationTitle");
    renderExplanationList("strengthsList", "strengths", r.explanation.strengths, "good");
    renderExplanationList("weaknessesList", "weaknesses", r.explanation.weaknesses, "bad");
    renderExplanationList("riskDriversList", "riskDrivers", r.explanation.drivers, "warn");
  } catch (err) {
    console.error("renderScreen3 failed:", err);
    const card = document.querySelector("#screen3 .screen-card");
    if (card) {
      const banner = document.createElement("div");
      banner.className = "form-error-banner visible";
      banner.textContent =
        state.lang === "ar"
          ? "حدث خطأ غير متوقع أثناء عرض النتائج. يرجى إعادة المحاولة."
          : "An unexpected error occurred while rendering results. Please try again.";
      card.prepend(banner);
    }
  }
}

function renderExplanationList(containerId, titleKey, items, kind) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const heading = document.createElement("h4");
  heading.className = "explanation-heading explanation-" + kind;
  heading.textContent = t(titleKey);
  container.appendChild(heading);

  const list = document.createElement("ul");
  list.className = "explanation-list";

  if (!items.length) {
    const li = document.createElement("li");
    li.className = "explanation-empty";
    li.textContent = t("noneIdentified");
    list.appendChild(li);
  } else {
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = t(item);
      list.appendChild(li);
    });
  }

  container.appendChild(list);
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function renderScoreGauge(score, grade) {
  const svg = document.getElementById("scoreGaugeSvg");
  const gradeColors = { A: "#1E8E5A", B: "#2D8C5C", C: "#D98C0F", D: "#C73E3E" };
  const color = gradeColors[grade] || "#2D5C8C";

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, score)) / 100;
  const offset = circumference * (1 - pct);

  svg.innerHTML = `
    <circle cx="100" cy="100" r="${radius}" class="gauge-track" />
    <circle cx="100" cy="100" r="${radius}"
      class="gauge-fill"
      stroke="${color}"
      stroke-dasharray="${circumference}"
      stroke-dashoffset="${circumference}"
      transform="rotate(-90 100 100)" />
    <text x="100" y="94" text-anchor="middle" class="gauge-score" fill="${color}">${score}</text>
    <text x="100" y="120" text-anchor="middle" class="gauge-max">/ 100</text>
  `;

  const raf = typeof requestAnimationFrame === "function" ? requestAnimationFrame : (cb) => setTimeout(cb, 16);
  raf(() => {
    const fill = svg.querySelector(".gauge-fill");
    fill.style.transition = "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)";
    raf(() => fill.setAttribute("stroke-dashoffset", String(offset)));
  });
}

function iconBriefcase() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="7.5" width="17" height="11.5" rx="1.8"/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" stroke-linecap="round"/><path d="M3.5 12.5h17" /></svg>`;
}
function iconBuilding() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="3.5" width="10" height="17" rx="1"/><rect x="14" y="9" width="6" height="11.5" rx="1"/><path d="M7 7.5h1.2M10.4 7.5h1.2M7 11h1.2M10.4 11h1.2M7 14.5h1.2M10.4 14.5h1.2" stroke-linecap="round"/></svg>`;
}

/* ----------------------- 7. NAVIGATION / EVENTS ----------------------- */

function goToStep(step) {
  state.step = step;
  renderCurrentStep();
  document.getElementById("appMain").scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleNextFromStep2() {
  if (!validateScreen2()) {
    renderScreen2();
    document.getElementById("formErrorBanner").textContent = t("formHasErrors");
    document.getElementById("formErrorBanner").classList.add("visible");
    return;
  }
  document.getElementById("formErrorBanner").classList.remove("visible");
  goToStep(3);
}

function resetAssessment() {
  state.step = 1;
  state.customerType = null;
  state.values = {};
  state.errors = {};
  state.result = null;
  renderCurrentStep();
}

function initEventListeners() {
  document.getElementById("langToggleBtn").addEventListener("click", () => {
    state.lang = state.lang === "en" ? "ar" : "en";
    applyLanguage();
  });

  document.getElementById("btnBackTo1").addEventListener("click", () => goToStep(1));
  document.getElementById("btnNextTo3").addEventListener("click", handleNextFromStep2);
  document.getElementById("btnBackTo2").addEventListener("click", () => goToStep(2));
  document.getElementById("btnStartOver").addEventListener("click", resetAssessment);

  const pdfBtn = document.getElementById("btnExportPdf");
  if (pdfBtn) pdfBtn.addEventListener("click", exportResultsToPdf);
}

function exportResultsToPdf() {
  printAssessmentWindow(state, t, formatCurrency, capitalize);
}

/* ----------------------- INIT ----------------------- */

document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();
  applyLanguage();
});
