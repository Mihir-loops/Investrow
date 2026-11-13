export type Service = {
  slug: string;
  title: string;
  proseTitle: string;
  index: string;
  icon: string;
  teaser: string;
  summary: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  what: string[];
  how: { title: string; text: string }[];
  types: { title: string; text: string }[];
  taxTitle: string;
  taxNote: string;
  caveat?: string;
  metaTitle: string;
  metaDescription: string;
};

export type Goal = {
  slug: string;
  title: string;
  index: string;
  icon: string;
  teaser: string;
  summary: string;
  intro: string;
  horizon: string;
  considerations: { title: string; text: string }[];
  steps: string[];
  calculator: { label: string; href: string };
  metaTitle: string;
  metaDescription: string;
};

export type CalculatorMeta = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  teaser: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
};

export const company = {
  name: "Investrow Financial Services Pvt. Ltd.",
  shortName: "Investrow",
  founded: "2021",
  cin: "U67190JH2021PTC016813",
  arn: "ARN-194720",
  bse: "55533",
  phones: ["+91 9102050555", "+91 9102070777"],
  email: "info@investrow.in",
  headOffice:
    "Jealgora No. 7, PO Jealgora, Sindri Road, Dhanbad, Jharkhand — 828110",
  branch:
    "MOCP Thakur More, Jharia, Baliyapur Road, Dhanbad, Jharkhand — 828201",
  mapUrl:
    "https://www.google.com/maps/embed?pb=%211m18%211m12%211m3%211d3653.050312000423%212d86.4140077%213d23.709897299999998%212m3%211f0%212f0%213f0%213m2%211i1024%212i768%214f13.1%213m3%211m2%211s0x39f699b3b0ee452f%3A0x6914b604b05dc72d%212sInvestrow+Financial+Services+Pvt+Ltd%215e0%213m2%211sen%212sin%214v1774522454761%215m2%211sen%212sin",
  disclaimer:
    "Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. KYC is a one-time exercise while dealing in securities markets — once KYC is completed through a SEBI-registered intermediary, it does not need to be repeated when approaching another intermediary.",
};

export const navGroups = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "The company", href: "/about" },
      { label: "Our team", href: "/team" },
      { label: "Principles", href: "/about#principles" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All services", href: "/services" },
      { label: "Mutual funds", href: "/services/mutual-funds" },
      { label: "Life insurance", href: "/services/life-insurance" },
      { label: "Health insurance", href: "/services/health-insurance" },
      { label: "Tax planning", href: "/services/tax-planning" },
      { label: "General insurance", href: "/services/general-insurance" },
      { label: "FDs & bonds", href: "/services/fd-bonds" },
      {
        label: "Stock market & demat",
        href: "/services/stock-market-demat",
      },
      { label: "NPS", href: "/services/nps" },
    ],
  },
  {
    label: "Goals",
    href: "/goals",
    children: [
      { label: "All goals", href: "/goals" },
      { label: "Dream home", href: "/goals/dream-home" },
      { label: "Wealth creation", href: "/goals/wealth-creation" },
      { label: "Retirement", href: "/goals/retirement" },
      { label: "Child's education", href: "/goals/child-education" },
      { label: "Child's wedding", href: "/goals/child-wedding" },
    ],
  },
  {
    label: "Calculators",
    href: "/calculators",
    children: [
      { label: "All calculators", href: "/calculators" },
      { label: "SIP return", href: "/calculators/sip" },
      { label: "Step-up SIP", href: "/calculators/sip-step-up" },
      { label: "Retirement", href: "/calculators/retirement" },
      { label: "Goal setting", href: "/calculators/goal-setting" },
      { label: "Child education", href: "/calculators/children-education" },
      { label: "EMI", href: "/calculators/emi" },
      { label: "PPF", href: "/calculators/ppf" },
      { label: "EPF", href: "/calculators/epf" },
      { label: "Asset allocation", href: "/calculators/asset-allocation" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Resources & FAQs", href: "/resources" },
      { label: "Investor services", href: "/resources/investor-services" },
      { label: "Forms & downloads", href: "/resources/forms-downloads" },
    ],
  },
];

export const services: Service[] = [
  {
    slug: "mutual-funds",
    title: "Mutual Funds",
    proseTitle: "mutual funds",
    index: "01",
    icon: "chart",
    teaser:
      "Professionally managed portfolios for disciplined, goal-based wealth creation.",
    summary:
      "Mutual funds pool money from many investors into a professionally managed portfolio of equities, bonds or money-market instruments.",
    image: "/assets/services/mutual-funds.jpg",
    imageAlt:
      "Illustration of a mutual fund piggy bank, rupee notes and savings bag",
    eyebrow: "Mutual fund distribution",
    what: [
      "A mutual fund is a professionally managed pool of money from multiple investors. The fund manager invests that pool across equities, bonds and money-market instruments according to the scheme's objective.",
      "For many investors, mutual funds can offer diversification and professional management without the need to select individual securities. They can suit both first-time investors building a habit and experienced investors allocating across asset classes.",
      "Investrow is an AMFI-registered mutual fund distributor. Fund selection should begin with your goal, time horizon and ability to tolerate market ups and downs — not with last year's return chart.",
    ],
    how: [
      {
        title: "Clarify the goal and horizon",
        text: "Define what the money is for, when you may need it, and how much short-term volatility you can reasonably withstand.",
      },
      {
        title: "Choose a route",
        text: "A lump sum invests a larger amount at once. A systematic investment plan (SIP) spreads purchases over regular intervals and can make investing easier to sustain.",
      },
      {
        title: "Select and document",
        text: "Review scheme objective, portfolio, costs and risk level. Complete the required KYC and application documentation.",
      },
      {
        title: "Review, don't react",
        text: "Monitor the portfolio against the plan at sensible intervals. Avoid changing course solely because of short-term market noise.",
      },
    ],
    types: [
      {
        title: "Equity funds",
        text: "Primarily invest in stocks and carry higher short-term volatility, with the potential for higher long-term growth.",
      },
      {
        title: "Debt funds",
        text: "Invest in fixed-income securities and money-market instruments. Risk varies by credit quality and duration.",
      },
      {
        title: "Hybrid funds",
        text: "Combine equity and debt in different proportions, aiming for a balance between growth and stability.",
      },
      {
        title: "ELSS",
        text: "Equity-linked savings schemes with a statutory lock-in. Tax treatment should be checked against current law.",
      },
      {
        title: "Liquid funds",
        text: "Focus on short-term instruments and higher liquidity. They are not the same as a bank deposit and carry market risk.",
      },
    ],
    taxTitle: "Tax treatment",
    taxNote:
      "The company's public page lists historical capital-gains and dividend tax treatment for equity and debt funds. Those figures are time-sensitive and depend on fund classification, holding period and current law. This rebuild deliberately does not republish them as current fact. Please confirm the applicable treatment with a qualified tax professional before acting.",
    metaTitle: "Mutual Funds | Investrow Financial Services",
    metaDescription:
      "Understand mutual funds, SIP and lump-sum investing, fund categories and the questions to ask before choosing a scheme. Investrow is an AMFI-registered mutual fund distributor (ARN-194720).",
  },
  {
    slug: "life-insurance",
    title: "Life Insurance",
    proseTitle: "life insurance",
    index: "02",
    icon: "shield",
    teaser:
      "Protection that helps your family keep its footing if the unexpected happens.",
    summary:
      "A life insurance contract pays a defined benefit to a nominee or beneficiary on death or after a defined period, in exchange for premiums.",
    image: "/assets/services/life-insurance.png",
    imageAlt:
      "Illustration of a family under an umbrella with a life insurance policy",
    eyebrow: "Life cover",
    what: [
      "Life insurance is a contract in which the insurer pays a defined benefit to your nominee or beneficiary on your death, or after a defined period, in exchange for premiums.",
      "Its primary financial role is protection: replacing income, covering liabilities and giving a family room to make decisions without immediate financial pressure.",
      "Cover should be sized around actual needs — dependants, loans, education and living costs — rather than bought only for a tax deduction.",
    ],
    how: [
      {
        title: "Assess the need",
        text: "Map your income, dependants, outstanding loans, future education costs and the years of support your family may need.",
      },
      {
        title: "Choose the policy type",
        text: "Term, whole life, endowment, ULIP and money-back plans serve different purposes. Protection and investment should be evaluated separately.",
      },
      {
        title: "Compare the details",
        text: "Look at coverage, exclusions, waiting periods, premium commitment and the insurer's claim record — not just the premium.",
      },
      {
        title: "Set affordable cover",
        text: "Choose a sum assured that is adequate and a premium you can sustain through the policy term.",
      },
      {
        title: "Disclose accurately",
        text: "Complete the proposal with accurate health and lifestyle information. Non-disclosure can affect a claim.",
      },
      {
        title: "Review periodically",
        text: "Revisit cover after marriage, a child, a home loan or a significant income change.",
      },
    ],
    types: [
      {
        title: "Term life",
        text: "Pure protection for a defined period, usually with the lowest premium for a given sum assured.",
      },
      {
        title: "Whole life",
        text: "Cover that extends across the lifetime of the policyholder, subject to policy terms.",
      },
      {
        title: "Endowment plans",
        text: "Combine life cover with a savings component that pays a maturity benefit.",
      },
      {
        title: "ULIPs",
        text: "Unit-linked insurance plans combine cover with market-linked investments. Costs and lock-ins need careful review.",
      },
      {
        title: "Money-back policies",
        text: "Pay a portion of the sum assured at intervals, with the balance at maturity or on a covered event.",
      },
    ],
    taxTitle: "Tax treatment",
    taxNote:
      "The company's public page refers to Section 80C deductions and Section 10(10D) treatment, subject to conditions. Tax rules depend on the policy, premium level, sum assured and the year of purchase, and can change. Confirm the current position with a qualified tax professional; this page does not provide tax advice.",
    metaTitle: "Life Insurance | Investrow Financial Services",
    metaDescription:
      "Learn how life insurance protects dependants, how to size cover and compare term, whole life, endowment, ULIP and money-back plans with Investrow.",
  },
  {
    slug: "health-insurance",
    title: "Health Insurance",
    proseTitle: "health insurance",
    index: "03",
    icon: "heart",
    teaser:
      "Practical cover for hospitalisation, treatment and the costs that arrive with it.",
    summary:
      "Health insurance provides financial protection for hospitalisation, surgery, consultations and medicines, subject to policy terms.",
    image: "/assets/services/health-insurance.png",
    imageAlt:
      "Illustration of a family protected by a health insurance shield",
    eyebrow: "Health cover",
    what: [
      "Health insurance provides financial protection for hospitalisation, surgeries, consultations and medicines, subject to the policy's terms, waiting periods and exclusions.",
      "The right cover is not only about the premium. Network hospitals, room-rent limits, sub-limits, pre-existing condition terms and claim settlement experience matter just as much.",
      "A family floater can pool cover across members, while individual policies can be useful where each person needs dedicated limits.",
    ],
    how: [
      {
        title: "Compare the cover",
        text: "Look at sum insured, room-rent limits, co-payment, sub-limits, waiting periods and the network hospital list.",
      },
      {
        title: "Check claim experience",
        text: "Review the insurer's claim settlement ratio and the practical process for cashless and reimbursement claims.",
      },
      {
        title: "Disclose health history",
        text: "Declare pre-existing conditions and ongoing medication accurately. This helps avoid surprises at claim time.",
      },
      {
        title: "Keep it active",
        text: "Pay premiums on time and review cover as your family, health and medical costs change.",
      },
    ],
    types: [
      {
        title: "Individual health insurance",
        text: "A dedicated sum insured for one person, useful where individual limits and benefits matter.",
      },
      {
        title: "Family floater",
        text: "One sum insured shared across family members, often a cost-effective way to cover a household.",
      },
      {
        title: "Critical illness",
        text: "Pays a lump sum on diagnosis of specified conditions, subject to policy terms. It can complement hospitalisation cover.",
      },
      {
        title: "Senior citizen plans",
        text: "Designed for older policyholders, with specific entry ages, waiting periods and underwriting requirements.",
      },
      {
        title: "Group health insurance",
        text: "Employer or association cover that provides a common pool of benefits for eligible members.",
      },
    ],
    taxTitle: "Tax treatment",
    taxNote:
      "The company's public page refers to Section 80D deductions for premiums covering self, spouse, children and parents, with age-based limits and preventive check-up provisions. Limits and regime applicability change. Verify the current rules with a tax professional before relying on any deduction.",
    metaTitle: "Health Insurance | Investrow Financial Services",
    metaDescription:
      "Compare health insurance cover, network hospitals, waiting periods and family floater, critical illness and senior citizen plans with Investrow.",
  },
  {
    slug: "tax-planning",
    title: "Tax Planning",
    proseTitle: "tax planning",
    index: "04",
    icon: "receipt",
    teaser:
      "A lawful, organised approach to reducing tax friction across the year.",
    summary:
      "Tax planning looks at income, investments, expenses and deductions to organise finances lawfully — never to evade tax.",
    image: "/assets/services/tax-planning.png",
    imageAlt:
      "Illustration of tax planning documents, calculator and savings",
    eyebrow: "Tax-aware planning",
    what: [
      "Tax planning is the process of reviewing an individual's or business's finances to reduce tax liability lawfully while remaining fully compliant. It looks at income timing, investments, expenses, deductions and the structure of financial decisions.",
      "Good planning happens through the year, not in the last week of March. It should support your financial goals rather than sell a product simply because it offers a deduction.",
      "Tax evasion — hiding income or misrepresenting facts — is unlawful. This service is about legitimate planning and documentation.",
    ],
    how: [
      {
        title: "Review the full picture",
        text: "Map income sources, expenses, existing investments, loans and both short- and long-term goals.",
      },
      {
        title: "Identify lawful options",
        text: "Consider deductions, exemptions, allowances and instruments that fit your cash flow and risk profile.",
      },
      {
        title: "Coordinate with investments",
        text: "Avoid locking money into unsuitable products only for a tax benefit. Suitability and liquidity come first.",
      },
      {
        title: "Document and review",
        text: "Keep records, review changes in tax law and revisit the plan when income or family circumstances change.",
      },
    ],
    types: [
      {
        title: "Short-term planning",
        text: "Organising decisions within the current financial year, including eligible deductions and timing.",
      },
      {
        title: "Long-term planning",
        text: "Structuring savings and investments across years around goals, retirement and family needs.",
      },
      {
        title: "Permissive planning",
        text: "Using options the law expressly allows, within the letter and spirit of the rules.",
      },
      {
        title: "Purposive planning",
        text: "Aligning tax decisions with clear financial objectives rather than pursuing deductions in isolation.",
      },
      {
        title: "Personal & corporate",
        text: "Planning for salaried individuals, professionals and business owners, with the appropriate professional review.",
      },
    ],
    taxTitle: "Fees & professional review",
    taxNote:
      "The company's public page notes that professional fees may attract GST depending on applicable law. Tax outcomes depend on individual facts and current legislation. Investrow's role is financial-services distribution and planning support, not legal or tax advice; engage a qualified chartered accountant or tax professional for filing and formal opinions.",
    metaTitle: "Tax Planning Services | Investrow Financial Services",
    metaDescription:
      "Organise your finances lawfully with year-round tax planning that supports your goals. Understand deductions, documentation and when to involve a tax professional.",
  },
  {
    slug: "general-insurance",
    title: "General Insurance",
    proseTitle: "general insurance",
    index: "05",
    icon: "umbrella",
    teaser:
      "Cover for the everyday assets and events that are easy to overlook.",
    summary:
      "General insurance protects against non-life losses involving vehicles, travel, property, fire and accidents.",
    image: "/assets/services/general-insurance.png",
    imageAlt: "Illustration of general insurance cover for home and motor",
    eyebrow: "Non-life protection",
    what: [
      "General insurance protects against non-life losses: accidents, theft, fire, travel disruption, property damage and more.",
      "Motor insurance is mandatory for vehicles used on public roads. Home and travel cover can protect against costs that would otherwise fall entirely on your savings.",
      "The cheapest policy is not automatically the right one. Exclusions, deductibles, claim limits and the claims process determine what actually gets paid.",
    ],
    how: [
      {
        title: "Identify the exposure",
        text: "List the assets and events that could create a large, unplanned expense.",
      },
      {
        title: "Compare protection",
        text: "Review coverage, exclusions, deductibles, premium and claim-settlement experience.",
      },
      {
        title: "Choose the plan",
        text: "Match the cover to the asset's value and your budget; avoid both under-insurance and unnecessary duplication.",
      },
      {
        title: "Stay covered",
        text: "Renew on time and update cover when you buy a vehicle, move home or change travel plans.",
      },
    ],
    types: [
      {
        title: "Motor insurance",
        text: "Third-party cover is mandatory; comprehensive cover can add own-damage protection, subject to policy terms.",
      },
      {
        title: "Travel insurance",
        text: "Cover for medical emergencies, trip delays, baggage loss and related risks while travelling.",
      },
      {
        title: "Home insurance",
        text: "Protection for the structure and contents against specified risks such as fire, theft or natural events.",
      },
      {
        title: "Fire insurance",
        text: "Cover for property damage caused by fire and allied perils, often relevant for businesses.",
      },
      {
        title: "Health insurance",
        text: "Though health is sometimes grouped separately, it is a non-life cover for medical costs.",
      },
    ],
    taxTitle: "Tax treatment",
    taxNote:
      "The company's public page notes that health insurance premiums may qualify under Section 80D, while motor, travel and home premiums are generally treated as personal expenses unless business-use rules apply. Tax treatment depends on use and current law; confirm with a tax professional.",
    metaTitle: "General Insurance | Investrow Financial Services",
    metaDescription:
      "Protect vehicles, travel, home and property with general insurance. Understand exclusions, deductibles and claim considerations before choosing a plan.",
  },
  {
    slug: "fd-bonds",
    title: "FDs & Bonds",
    proseTitle: "FDs & bonds",
    index: "06",
    icon: "landmark",
    teaser:
      "Fixed-income options for money that needs a clearer, steadier role.",
    summary:
      "Fixed deposits and bonds can provide defined income and capital stability, with different issuer, liquidity and credit risks.",
    image: "/assets/services/fd-bonds.png",
    imageAlt: "Illustration of fixed deposits and bonds with coins and documents",
    eyebrow: "Fixed income",
    what: [
      "A fixed deposit places money with a bank or eligible institution for a set period at a stated rate. A bond is a debt security issued by a government, company or other entity that typically pays interest and returns principal at maturity.",
      "Both can play a stabilising role in a portfolio, but they are not identical. A bank deposit and a corporate bond carry different issuer, credit, liquidity and interest-rate risks.",
      "The original Investrow service page was not fully captured in the research pack. This overview therefore stays general and does not claim specific products, issuers or rates.",
    ],
    how: [
      {
        title: "Define the money's role",
        text: "Is this an emergency reserve, a short-term goal or a stabilising allocation? The answer changes the suitable tenure.",
      },
      {
        title: "Match the tenure",
        text: "Align maturity with when you need the money. Early exit can attract penalties or market-price risk.",
      },
      {
        title: "Assess the issuer",
        text: "For bonds, review credit quality, issuer profile, secured status and liquidity — not only the coupon.",
      },
      {
        title: "Understand the tax",
        text: "Interest is generally taxable, but treatment varies by instrument and year. Confirm current rules before investing.",
      },
    ],
    types: [
      {
        title: "Bank fixed deposits",
        text: "Term deposits with scheduled banks, typically carrying deposit insurance up to the applicable limit.",
      },
      {
        title: "Corporate deposits",
        text: "Deposits with eligible non-banking institutions. They can offer higher rates but carry issuer credit risk.",
      },
      {
        title: "Government securities",
        text: "Bonds issued by governments, generally considered lower credit risk but still subject to price and reinvestment risk.",
      },
      {
        title: "Corporate bonds",
        text: "Debt issued by companies. Coupon, credit rating, liquidity and default risk vary widely.",
      },
      {
        title: "Target-maturity options",
        text: "Products designed to mature around a chosen date. Availability and structure must be verified with the team.",
      },
    ],
    taxTitle: "Tax treatment",
    taxNote:
      "Interest income and bond capital gains are taxed under different rules depending on the instrument, holding period and investor category. The research pack did not capture the original page's tax copy. Verify current treatment with a tax professional before investing.",
    caveat:
      "The exact product range and permissions offered by Investrow were not confirmed in the source pack. Please confirm availability, issuer details and current rates with the team.",
    metaTitle: "FDs & Bonds | Investrow Financial Services",
    metaDescription:
      "Understand the difference between fixed deposits and bonds, including tenure, yield, liquidity, issuer risk and tax considerations.",
  },
  {
    slug: "stock-market-demat",
    title: "Stock Market & Demat",
    proseTitle: "stock market and demat",
    index: "07",
    icon: "candlestick",
    teaser:
      "Support with demat documentation and the discipline around market investing.",
    summary:
      "A demat account holds securities electronically. Investrow lists stock market and demat account opening support among its services.",
    image: "/assets/services/stock-market-demat.png",
    imageAlt:
      "Illustration of stock market charts, demat account and investments",
    eyebrow: "Market access",
    what: [
      "A demat (dematerialised) account holds shares and other securities in electronic form. It is used for settlement and holding, alongside a trading account where transactions are executed.",
      "Investrow lists stock market and demat account opening support among its service lines. This page does not imply that Investrow provides brokerage, trade execution or investment advisory services. The exact scope and authorisations should be confirmed with the team.",
      "Direct equity investing requires time, research and tolerance for volatility. It should be considered alongside your overall asset allocation, not in isolation.",
    ],
    how: [
      {
        title: "Confirm the scope",
        text: "Ask which entity provides the trading and demat accounts, and what support Investrow provides in the process.",
      },
      {
        title: "Complete KYC",
        text: "Prepare identity, address and bank details. Requirements depend on the intermediary and current regulations.",
      },
      {
        title: "Understand the costs",
        text: "Review account charges, brokerage, taxes and other transaction costs before you begin.",
      },
      {
        title: "Set an approach",
        text: "Define position size, diversification and review discipline. Avoid trading decisions driven by short-term noise.",
      },
    ],
    types: [
      {
        title: "Demat account",
        text: "An electronic account for holding shares and securities.",
      },
      {
        title: "Trading account",
        text: "The account through which buy and sell orders are placed with a broker.",
      },
      {
        title: "Delivery investing",
        text: "Buying securities to hold in the demat account rather than trading intraday.",
      },
      {
        title: "Portfolio review",
        text: "Periodically reviewing holdings, concentration and alignment with goals.",
      },
    ],
    taxTitle: "Tax treatment",
    taxNote:
      "Equity transaction taxes, capital-gains treatment and reporting depend on the instrument, holding period and current law. The research pack did not capture the original page's tax copy. Verify current rules with a tax professional and read the broker's disclosures.",
    caveat:
      "The research pack flags a possible copy mismatch on this page (an AIF reference). This rebuild avoids implying brokerage, execution or advisory authorisation. Confirm the actual service scope with Investrow.",
    metaTitle: "Stock Market & Demat | Investrow Financial Services",
    metaDescription:
      "Understand demat accounts, KYC and the difference between holding and trading. Confirm the exact scope of stock market support offered by Investrow.",
  },
  {
    slug: "nps",
    title: "National Pension System",
    proseTitle: "the National Pension System (NPS)",
    index: "08",
    icon: "sprout",
    teaser:
      "A structured, long-horizon way to build a retirement corpus.",
    summary:
      "The National Pension System is a long-term retirement savings framework with regulated contribution and withdrawal rules.",
    image: "/assets/services/nps.png",
    imageAlt: "Illustration of retirement planning with a growth chart",
    eyebrow: "Retirement savings",
    what: [
      "The National Pension System (NPS) is a long-term retirement savings framework. Contributions are invested according to the chosen scheme and asset allocation, and withdrawals are governed by NPS rules.",
      "NPS can sit alongside EPF, PPF and mutual funds as part of a retirement plan. Its rules, tax treatment and annuity requirements should be understood before contributing.",
      "The research pack did not fully capture Investrow's NPS page or confirm its distribution permissions. This overview is general and should be verified with the team and official NPS sources.",
    ],
    how: [
      {
        title: "Check eligibility",
        text: "Confirm the current eligibility and account-opening requirements from official NPS sources.",
      },
      {
        title: "Choose the account",
        text: "Understand Tier I and Tier II accounts, including withdrawal and tax differences.",
      },
      {
        title: "Set the allocation",
        text: "Choose auto or active choice according to your age, risk tolerance and involvement.",
      },
      {
        title: "Contribute consistently",
        text: "Build a contribution habit that fits your cash flow and review the allocation periodically.",
      },
      {
        title: "Plan withdrawals",
        text: "Understand the annuity and lump-sum rules that apply at exit before you reach retirement.",
      },
    ],
    types: [
      {
        title: "Tier I account",
        text: "The primary retirement account, with restricted withdrawals and specific exit rules.",
      },
      {
        title: "Tier II account",
        text: "A voluntary investment account that generally offers greater flexibility, subject to NPS rules.",
      },
      {
        title: "Auto choice",
        text: "A life-cycle allocation that automatically adjusts equity exposure with age.",
      },
      {
        title: "Active choice",
        text: "An allocation chosen by the subscriber within the permitted equity and debt limits.",
      },
    ],
    taxTitle: "Tax treatment",
    taxNote:
      "NPS tax treatment, contribution limits, withdrawal rules and annuity requirements are subject to change. The research pack explicitly flags these for verification. This page does not state current tax benefits or deduction limits; confirm with a tax professional and official NPS sources.",
    caveat:
      "The research pack flags a possible copy mismatch on the NPS page (a Portfolio Management Services reference). Investrow's current NPS permissions and product scope should be confirmed before relying on this page.",
    metaTitle: "National Pension System (NPS) | Investrow Financial Services",
    metaDescription:
      "Understand NPS Tier I and Tier II accounts, auto and active choice, contribution discipline and the withdrawal questions to ask before you start.",
  },
];

export const goals: Goal[] = [
  {
    slug: "dream-home",
    title: "Dream Home",
    index: "01",
    icon: "home",
    teaser: "Turn a distant down payment into a dated, funded plan.",
    summary:
      "A home purchase usually combines a down payment, registration costs, EMIs and interiors. Planning the whole number early gives you more choices later.",
    intro:
      "A home is rarely just one payment. The deposit, stamp duty and registration, loan processing, furnishing and the ongoing EMI all need to fit together. Start with the target date and work backwards to a monthly amount.",
    horizon: "3–10 years",
    considerations: [
      {
        title: "The full cost",
        text: "Include down payment, registration, brokerage or legal fees, furnishing and any emergency reserve you want to keep after the purchase.",
      },
      {
        title: "Loan readiness",
        text: "A steady income record, manageable existing EMIs and a healthy credit profile can affect borrowing capacity and terms.",
      },
      {
        title: "Liquidity",
        text: "Keep short-term money in lower-volatility options. Equity investments intended for a near-term down payment can fall just when you need them.",
      },
      {
        title: "The EMI after purchase",
        text: "A comfortable EMI should leave room for insurance, savings and everyday life — not consume every surplus rupee.",
      },
    ],
    steps: [
      "Set the likely purchase date and the total budget, not just the property price.",
      "Work out how much you can invest each month toward the down payment.",
      "Use the goal-setting calculator to see the gap between the target and the projected corpus.",
      "Protect the plan with adequate health and term cover before taking on a long loan.",
      "Review the plan annually and after any change in income or family circumstances.",
    ],
    calculator: {
      label: "Open the goal-setting calculator",
      href: "/calculators/goal-setting",
    },
    metaTitle: "Plan for a Dream Home | Investrow Financial Services",
    metaDescription:
      "Plan a home purchase beyond the down payment: registration costs, loan readiness, liquidity and a monthly investment target.",
  },
  {
    slug: "wealth-creation",
    title: "Wealth Creation",
    index: "02",
    icon: "trending",
    teaser: "Let time and consistency do more of the work.",
    summary:
      "Wealth creation is the long game: a diversified plan, a sustainable contribution habit and enough patience to let compounding work.",
    intro:
      "Wealth rarely arrives from a single decision. It is usually the result of repeated contributions, sensible diversification and the discipline to stay invested through different market conditions. The aim is progress you can sustain, not a perfect forecast.",
    horizon: "8+ years",
    considerations: [
      {
        title: "Define what wealth is for",
        text: "A number without a purpose is easy to abandon. Link the corpus to freedom, family, a business or a later phase of life.",
      },
      {
        title: "Diversify deliberately",
        text: "Spread exposure across asset classes and within them. Diversification cannot remove risk, but it can reduce dependence on one outcome.",
      },
      {
        title: "Keep costs visible",
        text: "Fund costs, advisory fees and taxes compound too. Understand what you are paying and why.",
      },
      {
        title: "Separate the emergency fund",
        text: "Keep near-term money outside long-term investments so a sudden expense does not force a sale at the wrong time.",
      },
    ],
    steps: [
      "Write down the purpose, time horizon and amount you are working toward.",
      "Build an emergency reserve before increasing long-term market exposure.",
      "Choose a contribution schedule you can maintain through busy and difficult months.",
      "Review asset allocation at planned intervals rather than reacting to headlines.",
      "Increase contributions as income rises, where cash flow allows.",
    ],
    calculator: {
      label: "Explore the SIP calculator",
      href: "/calculators/sip",
    },
    metaTitle: "Wealth Creation | Investrow Financial Services",
    metaDescription:
      "Build wealth with a diversified, long-term plan and a contribution habit you can sustain. Explore SIP projections and planning principles.",
  },
  {
    slug: "retirement",
    title: "Retirement",
    index: "03",
    icon: "palmtree",
    teaser: "Fund the life after work, including the costs that creep in.",
    summary:
      "Retirement planning translates today's lifestyle into a future income need, then builds a corpus designed to support it.",
    intro:
      "Retirement is a long holiday with a long bill. Everyday expenses will rise with inflation, healthcare may take a larger share, and the income stops while the costs do not. A useful plan starts with the life you want, not a generic corpus number.",
    horizon: "10–35 years",
    considerations: [
      {
        title: "Lifestyle, not just survival",
        text: "Estimate the annual spending that would let you live the retirement you want, then add a buffer for health and family support.",
      },
      {
        title: "Inflation",
        text: "A rupee today will buy less later. Even moderate inflation changes the corpus required over a multi-decade horizon.",
      },
      {
        title: "Healthcare",
        text: "Keep health insurance active and budget separately for costs that a policy may not cover.",
      },
      {
        title: "Withdrawal order",
        text: "How you draw from the corpus matters. A planned withdrawal strategy can reduce the risk of exhausting it too early.",
      },
    ],
    steps: [
      "Estimate current monthly expenses and the retirement age you are targeting.",
      "Use a realistic inflation assumption and review it periodically.",
      "Add up existing retirement savings across EPF, PPF, NPS and investments.",
      "Use the retirement calculator to estimate the corpus and the gap.",
      "Increase contributions where possible and keep nominatee details up to date.",
    ],
    calculator: {
      label: "Open the retirement calculator",
      href: "/calculators/retirement",
    },
    metaTitle: "Retirement Planning | Investrow Financial Services",
    metaDescription:
      "Estimate the corpus you may need for retirement, account for inflation and healthcare, and see how existing savings and SIPs can contribute.",
  },
  {
    slug: "child-education",
    title: "Child's Education",
    index: "04",
    icon: "graduation",
    teaser: "Give the next decision room to be about the child, not the fee.",
    summary:
      "Education costs rise over time. A dated goal and a consistent saving habit can make a large future expense more manageable.",
    intro:
      "Education planning begins with a target — a course, a country, a stage of schooling — and a date. From there, the future cost can be estimated and translated into a monthly contribution. The earlier the start, the more time the plan has to work.",
    horizon: "5–18 years",
    considerations: [
      {
        title: "Define the ambition",
        text: "Domestic or overseas, school or university, professional or vocational. The range matters when estimating future cost.",
      },
      {
        title: "Use education inflation",
        text: "Education costs can rise at a different pace from general inflation. Use a specific assumption and review it.",
      },
      {
        title: "Keep the timeline",
        text: "As the admission year approaches, shift the money toward lower-volatility options to protect the corpus.",
      },
      {
        title: "Do not sacrifice retirement",
        text: "Education and retirement both need funding. A balanced plan avoids borrowing heavily from one for the other.",
      },
    ],
    steps: [
      "Choose the education stage and the year the money will be needed.",
      "Estimate today's cost for that path and apply an explicit education-inflation assumption.",
      "Use the child education planner to estimate the monthly investment required.",
      "Review the plan as the child's direction becomes clearer.",
      "Reduce equity exposure as the goal date gets closer.",
    ],
    calculator: {
      label: "Open the child education planner",
      href: "/calculators/children-education",
    },
    metaTitle: "Child's Education Planning | Investrow Financial Services",
    metaDescription:
      "Estimate future education costs, account for education inflation and calculate a monthly saving plan for your child's education.",
  },
  {
    slug: "child-wedding",
    title: "Child's Wedding",
    index: "05",
    icon: "gem",
    teaser: "Plan for a celebration without borrowing from the future.",
    summary:
      "A wedding is a dated, often large expense. Estimating the budget early lets the family spread the cost without disrupting other goals.",
    intro:
      "Wedding costs are deeply personal and easy to underestimate. A useful plan separates the essential from the optional, sets a realistic budget and gives the family enough time to save. The aim is a celebration that does not require compromising retirement or emergency savings.",
    horizon: "5–15 years",
    considerations: [
      {
        title: "Set the budget together",
        text: "Agree the scope early — venue, guests, travel, gifts and contingencies — and revisit it as plans firm up.",
      },
      {
        title: "Use a specific inflation rate",
        text: "Wedding costs may rise faster than general prices. Use a clear assumption rather than today's bill.",
      },
      {
        title: "Protect other goals",
        text: "Do not divert the emergency fund or retirement corpus. A separate, dated bucket makes trade-offs visible.",
      },
      {
        title: "Shift to stability near the date",
        text: "As the event approaches, protect the accumulated amount from market volatility.",
      },
    ],
    steps: [
      "Estimate today's cost for the kind of celebration the family wants.",
      "Set the year and apply an explicit inflation assumption.",
      "Use the goal-setting calculator to find a monthly contribution.",
      "Keep the wedding fund separate from everyday accounts.",
      "Review annually and reduce risk as the date approaches.",
    ],
    calculator: {
      label: "Open the goal-setting calculator",
      href: "/calculators/goal-setting",
    },
    metaTitle: "Child's Wedding Planning | Investrow Financial Services",
    metaDescription:
      "Plan for a child's wedding with a dated budget, an explicit inflation assumption and a monthly saving target that protects other goals.",
  },
];

export const calculators: CalculatorMeta[] = [
  {
    slug: "sip",
    title: "SIP Return Calculator",
    shortTitle: "SIP return",
    icon: "trending",
    teaser:
      "See how a monthly investment could grow over time at an assumed return.",
    description:
      "Estimate the future value of a monthly systematic investment plan, along with the amount invested and the illustrative growth.",
    metaTitle: "SIP Return Calculator | Investrow Financial Services",
    metaDescription:
      "Estimate SIP future value, total invested and illustrative growth using a transparent monthly compounding formula.",
  },
  {
    slug: "sip-step-up",
    title: "SIP Step-Up Calculator",
    shortTitle: "Step-up SIP",
    icon: "stairs",
    teaser:
      "Raise your SIP each year and see the effect of compounding on a growing contribution.",
    description:
      "Estimate how an annual step-up in your monthly SIP can change the future value of your investment.",
    metaTitle: "SIP Step-Up Calculator | Investrow Financial Services",
    metaDescription:
      "See how increasing your SIP every year could affect the future value of your investments.",
  },
  {
    slug: "retirement",
    title: "Retirement Calculator",
    shortTitle: "Retirement",
    icon: "palmtree",
    teaser:
      "Translate today's lifestyle into a retirement corpus and a monthly investment.",
    description:
      "Estimate the corpus required to fund retirement expenses, compare it with your projected savings and find the monthly gap.",
    metaTitle: "Retirement Calculator | Investrow Financial Services",
    metaDescription:
      "Estimate the retirement corpus needed for your expenses, compare projected savings and see the monthly investment gap.",
  },
  {
    slug: "goal-setting",
    title: "Goal Setting Calculator",
    shortTitle: "Goal setting",
    icon: "target",
    teaser:
      "Turn a future target into a monthly investment amount.",
    description:
      "Work backwards from a financial target and a date to estimate the monthly investment required at an assumed return.",
    metaTitle: "Goal Setting Calculator | Investrow Financial Services",
    metaDescription:
      "Turn a future financial target into an estimated monthly investment using a clear compound-growth formula.",
  },
  {
    slug: "children-education",
    title: "Children Education Planner",
    shortTitle: "Child education",
    icon: "graduation",
    teaser:
      "Estimate a future education cost and the saving needed to meet it.",
    description:
      "Adjust today's education cost for inflation, then estimate the monthly investment required by the admission year.",
    metaTitle: "Children Education Planner | Investrow Financial Services",
    metaDescription:
      "Estimate future education costs with inflation and calculate the monthly saving required for your child's education.",
  },
  {
    slug: "emi",
    title: "EMI Calculator",
    shortTitle: "EMI",
    icon: "home",
    teaser: "See the monthly payment, total interest and total cost of a loan.",
    description:
      "Calculate the equated monthly instalment for a loan and see how tenure and rate affect the total interest paid.",
    metaTitle: "EMI Calculator | Investrow Financial Services",
    metaDescription:
      "Calculate home loan EMI, total interest and total repayment for different principals, rates and tenures.",
  },
  {
    slug: "ppf",
    title: "PPF Calculator",
    shortTitle: "PPF",
    icon: "landmark",
    teaser:
      "Project the maturity value of a yearly Public Provident Fund contribution.",
    description:
      "Estimate PPF maturity, total contributions and interest using a stated annual rate assumption.",
    metaTitle: "PPF Calculator | Investrow Financial Services",
    metaDescription:
      "Estimate PPF maturity value from annual contributions, tenure and an assumed interest rate.",
  },
  {
    slug: "epf",
    title: "EPF Calculator",
    shortTitle: "EPF",
    icon: "briefcase",
    teaser:
      "See how monthly employee and employer contributions could build over time.",
    description:
      "Project an Employees' Provident Fund balance using your salary, contribution percentages, current balance and an assumed rate.",
    metaTitle: "EPF Calculator | Investrow Financial Services",
    metaDescription:
      "Estimate EPF retirement corpus from monthly salary, employee and employer contributions, current balance and an assumed interest rate.",
  },
  {
    slug: "asset-allocation",
    title: "Asset Allocation Calculator",
    shortTitle: "Asset allocation",
    icon: "pie",
    teaser:
      "Explore an illustrative equity, debt and gold split by age and risk profile.",
    description:
      "See a rules-based allocation illustration based on age, horizon and stated risk tolerance. It is an educational starting point, not advice.",
    metaTitle: "Asset Allocation Calculator | Investrow Financial Services",
    metaDescription:
      "Explore an illustrative asset allocation across equity, debt and gold based on age, horizon and risk tolerance.",
  },
];

export const team = [
  {
    name: "Surendra Prasad",
    role: "Founder & Director",
    image: "/assets/team/surendra-prasad.png",
    bio: "Leads Investrow's vision and client relationships with a focus on reliable, result-oriented financial solutions. His approach is built on trust, transparency and long-term commitment — understanding each client's goals before recommending a path.",
    focus: ["Vision & strategy", "Client relationships", "Long-term planning"],
  },
  {
    name: "Dipankar Moi",
    role: "Business Development Manager",
    image: "/assets/team/dipankar-moi.png",
    bio: "Works closely with clients to understand their financial aspirations and translate them into practical plans. He focuses on transparent, client-centric service, growth opportunities and informed decisions with ongoing support.",
    focus: ["Client experience", "Practical planning", "Business growth"],
  },
  {
    name: "Birendra Kumar",
    role: "Accounts & Compliance",
    image: "/assets/team/birendra-kumar.png",
    bio: "Oversees financial discipline, regulatory compliance and accuracy across operations. His work centres on transparent reporting, accountability and keeping processes aligned with legal and ethical requirements.",
    focus: ["Compliance", "Accounts", "Operational accuracy"],
  },
];

export const pillars = [
  {
    letter: "I",
    title: "Integrity",
    text: "Advice should hold up when no one is watching. We aim to put the client's interest before the sale.",
  },
  {
    letter: "N",
    title: "Nurturing Wealth",
    text: "Wealth needs patient care: regular contributions, sensible risk and time to compound.",
  },
  {
    letter: "V",
    title: "Visionary Planning",
    text: "Start with the life you are building, then choose the financial path that supports it.",
  },
  {
    letter: "E",
    title: "Expertise",
    text: "Product knowledge matters, but so does knowing when a product is not right for the goal.",
  },
  {
    letter: "S",
    title: "Smart Investing",
    text: "Diversification, discipline and cost awareness do more reliable work than prediction.",
  },
  {
    letter: "T",
    title: "Trust",
    text: "Trust is built through clear explanations, honest limitations and consistent follow-through.",
  },
  {
    letter: "R",
    title: "Risk Management",
    text: "Protection, liquidity and asset allocation come before the pursuit of higher returns.",
  },
  {
    letter: "O",
    title: "Opportunity",
    text: "Markets create opportunities, but they should be pursued within a plan and a suitable horizon.",
  },
  {
    letter: "W",
    title: "Wealth Creation",
    text: "The goal is not a number on a screen; it is freedom, security and choice over time.",
  },
];

export const testimonials = [
  {
    name: "Akash Kumar",
    quote: "Nice experience overall. Easy process and helpful team.",
  },
  {
    name: "Sanjeev Kashyap",
    quote:
      "Inki sabse acchi baat hai ki sirf invest karwane pe focus nahi karte, balki proper guidance dete hain. Kaafi genuine lage.",
  },
  {
    name: "Mukesh Kumar Mahato",
    quote:
      "Pehle mujhe mutual fund ke baare me jyada idea nahi tha, lekin yahan sab kuch easy tareeke se samjhaya gaya. Ab regular SIP chal raha hai.",
  },
  {
    name: "Jyoti Kumari",
    quote: "Team ne patiently sab samjhaya, accha laga.",
  },
  {
    name: "Soni Kumari",
    quote: "Team helpful hai, sab clearly samjhate hain.",
  },
  {
    name: "Shammi Kumari",
    quote: "Very good experience with Investrow.",
  },
  {
    name: "Bhadulal Mahato",
    quote: "Good support and service. Great work.",
  },
];

export const publishedFigures = [
  {
    value: "23+",
    label: "Years of experience",
    note: "The source site also says the company began in 2021. This may refer to combined team experience; clarify before using.",
  },
  {
    value: "₹250 cr+",
    label: "Total AUM managed",
    note: "Current figure, reporting date and definition were not confirmed in the pack.",
  },
  {
    value: "3,000+",
    label: "Happy clients",
    note: "Current count and definition were not confirmed in the pack.",
  },
  {
    value: "10+",
    label: "Awards",
    note: "Supporting certificates and issuer details were not fully transcribed.",
  },
];

export const faqs = [
  {
    question: "What is a mutual fund?",
    answer:
      "A mutual fund is a professionally managed pool of money from multiple investors. The fund manager invests it across equities, bonds and money-market instruments according to the scheme's stated objective. Each investor holds units that represent a share of the fund's portfolio.",
  },
  {
    question: "How do AMCs manage mutual fund investments?",
    answer:
      "An asset management company (AMC) employs fund managers and research teams who select and monitor investments according to the scheme's objective. The AMC also handles operations, valuations and disclosures, while the fund's NAV reflects the value of its underlying holdings after expenses.",
  },
  {
    question: "What are open-ended and closed-ended mutual funds?",
    answer:
      "Open-ended schemes allow investors to buy and redeem units on an ongoing basis at the prevailing NAV. Closed-ended schemes have a fixed maturity and a defined unit base; units may need to be bought or sold on an exchange. Each structure has different liquidity and pricing considerations.",
  },
  {
    question: "How is a SIP different from a lump sum?",
    answer:
      "A lump sum invests a larger amount at one time. A SIP invests a fixed amount at regular intervals, which spreads purchases across market levels and can make investing easier to sustain. Both approaches should be matched to your cash flow, goal and comfort with volatility.",
  },
  {
    question: "Is Investrow an AMFI-registered mutual fund distributor?",
    answer:
      "The company's public website identifies Investrow as an AMFI-registered mutual fund distributor with ARN-194720. Regulatory identifiers and the scope of permissions should be verified directly with Investrow and on the relevant official registries before relying on them.",
  },
  {
    question: "Does Investrow guarantee investment returns?",
    answer:
      "No. Mutual fund investments are subject to market risks and returns are not guaranteed. The illustrations on this website are based on assumed rates and are not forecasts. Read all scheme-related documents carefully before investing.",
  },
  {
    question: "How do I prepare for a first conversation?",
    answer:
      "Bring a clear sense of your goals, time horizons, current income and expenses, existing investments, loans and insurance cover. It also helps to write down how much short-term volatility you could tolerate without changing course. Do not share passwords or sensitive account credentials.",
  },
  {
    question: "How can I contact Investrow?",
    answer:
      `Call ${company.phones[0]} or ${company.phones[1]}, or email ${company.email}. The head office is at ${company.headOffice}, with a branch at ${company.branch}.`,
  },
];

export const investorServices = [
  {
    title: "KYC and account readiness",
    text: "Understand the identity, address and bank details typically needed for mutual fund KYC, and what to check before starting an application.",
    icon: "user",
  },
  {
    title: "SIP and scheme changes",
    text: "Get help reviewing an existing SIP, changing a contribution amount or understanding the documentation for a scheme-level request.",
    icon: "repeat",
  },
  {
    title: "Portfolio and statement review",
    text: "Walk through your holdings, contributions and goals with the team. Bring your latest statement; never share your password or OTP.",
    icon: "file",
  },
  {
    title: "Nomination and contact details",
    text: "Keep nominee and contact information current. The team can guide you on the correct form and the records required.",
    icon: "users",
  },
  {
    title: "Claims and servicing support",
    text: "For insurance claims or policy servicing, contact the insurer's official channel and keep the team informed so documentation can be coordinated.",
    icon: "shield",
  },
  {
    title: "Grievances",
    text: "Raise a concern directly with the relevant AMC, insurer, intermediary or regulator. The team can help you identify the right escalation route.",
    icon: "message",
  },
];

export const offices = [
  {
    label: "Head office",
    address: company.headOffice,
    mapQuery: "Investrow Financial Services Pvt Ltd, Dhanbad, Jharkhand",
  },
  {
    label: "Branch",
    address: company.branch,
    mapQuery: "MOCP Thakur More, Jharia, Dhanbad, Jharkhand",
  },
];
