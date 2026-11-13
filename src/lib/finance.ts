/**
 * All calculators use transparent, conventional formulas.
 * Every figure is illustrative and based on the assumed return entered by the user.
 */

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const monthlyRate = (annualRatePercent: number) =>
  annualRatePercent / 100 / 12;

/** Future value of a monthly investment made at the start of each month. */
export const annuityDueFV = (
  payment: number,
  monthlyInterest: number,
  months: number,
) => {
  if (months <= 0) return 0;
  if (monthlyInterest === 0) return payment * months;
  return (
    payment *
    ((Math.pow(1 + monthlyInterest, months) - 1) / monthlyInterest) *
    (1 + monthlyInterest)
  );
};

export const sipFutureValue = (
  monthly: number,
  annualRate: number,
  years: number,
) => annuityDueFV(monthly, monthlyRate(annualRate), Math.round(years * 12));

export type SeriesPoint = { year: number; value: number; invested: number };

export const sipSeries = (
  monthly: number,
  annualRate: number,
  years: number,
): SeriesPoint[] => {
  const wholeYears = Math.max(1, Math.round(years));
  return Array.from({ length: wholeYears + 1 }, (_, year) => ({
    year,
    value: sipFutureValue(monthly, annualRate, year),
    invested: monthly * 12 * year,
  }));
};

export const stepUpSeries = (
  startingMonthly: number,
  annualStepUp: number,
  annualRate: number,
  years: number,
) => {
  const i = monthlyRate(annualRate);
  let value = 0;
  let monthly = startingMonthly;
  let invested = 0;
  const points: SeriesPoint[] = [{ year: 0, value: 0, invested: 0 }];

  for (let year = 1; year <= years; year += 1) {
    for (let month = 0; month < 12; month += 1) {
      value = (value + monthly) * (1 + i);
      invested += monthly;
    }
    points.push({ year, value, invested });
    monthly *= 1 + annualStepUp / 100;
  }

  return {
    series: points,
    futureValue: value,
    invested,
    growth: value - invested,
    finalMonthly: monthly / (1 + annualStepUp / 100),
  };
};

export const emi = (
  principal: number,
  annualRate: number,
  years: number,
) => {
  const months = Math.round(years * 12);
  if (months <= 0) return 0;
  const r = monthlyRate(annualRate);
  if (r === 0) return principal / months;
  return (
    (principal * r * Math.pow(1 + r, months)) /
    (Math.pow(1 + r, months) - 1)
  );
};

export const emiSchedule = (
  principal: number,
  annualRate: number,
  years: number,
) => {
  const months = Math.round(years * 12);
  const payment = emi(principal, annualRate, years);
  const r = monthlyRate(annualRate);
  let balance = principal;
  let interestPaid = 0;
  const points: { year: number; balance: number; interestPaid: number }[] = [
    { year: 0, balance, interestPaid: 0 },
  ];

  for (let month = 1; month <= months; month += 1) {
    const interest = balance * r;
    const principalPaid = Math.min(payment - interest, balance);
    balance = Math.max(0, balance - principalPaid);
    interestPaid += interest;
    if (month % 12 === 0 || month === months) {
      points.push({
        year: Math.ceil(month / 12),
        balance,
        interestPaid,
      });
    }
  }

  return {
    payment,
    totalPayment: payment * months,
    totalInterest: payment * months - principal,
    points,
    months,
  };
};

export const ppfSeries = (
  annualContribution: number,
  annualRate: number,
  years: number,
) => {
  const r = annualRate / 100;
  let balance = 0;
  const points: SeriesPoint[] = [{ year: 0, value: 0, invested: 0 }];
  for (let year = 1; year <= years; year += 1) {
    balance = (balance + annualContribution) * (1 + r);
    points.push({
      year,
      value: balance,
      invested: annualContribution * year,
    });
  }
  return {
    series: points,
    maturity: balance,
    invested: annualContribution * years,
    interest: balance - annualContribution * years,
  };
};

export const epfSeries = (
  monthlySalary: number,
  employeePercent: number,
  employerPercent: number,
  currentBalance: number,
  annualRate: number,
  years: number,
) => {
  const monthlyContribution =
    (monthlySalary * (employeePercent + employerPercent)) / 100;
  const r = monthlyRate(annualRate);
  let balance = currentBalance;
  const employeeMonthly = (monthlySalary * employeePercent) / 100;
  const employerMonthly = (monthlySalary * employerPercent) / 100;
  const points: SeriesPoint[] = [
    { year: 0, value: currentBalance, invested: currentBalance },
  ];

  for (let year = 1; year <= years; year += 1) {
    for (let month = 0; month < 12; month += 1) {
      balance = (balance + monthlyContribution) * (1 + r);
    }
    const employeeTotal = employeeMonthly * 12 * year;
    const employerTotal = employerMonthly * 12 * year;
    points.push({
      year,
      value: balance,
      invested: currentBalance + employeeTotal + employerTotal,
    });
  }

  const employeeTotal = employeeMonthly * 12 * years;
  const employerTotal = employerMonthly * 12 * years;
  return {
    series: points,
    maturity: balance,
    employeeTotal,
    employerTotal,
    invested: currentBalance + employeeTotal + employerTotal,
    interest: balance - (currentBalance + employeeTotal + employerTotal),
    monthlyContribution,
  };
};

export const retirementProjection = (inputs: {
  currentAge: number;
  retirementAge: number;
  monthlyExpenses: number;
  currentSavings: number;
  monthlyInvestment: number;
  inflation: number;
  preReturn: number;
  postReturn: number;
  lifeExpectancy: number;
}) => {
  const {
    currentAge,
    retirementAge,
    monthlyExpenses,
    currentSavings,
    monthlyInvestment,
    inflation,
    preReturn,
    postReturn,
    lifeExpectancy,
  } = inputs;

  const yearsToRetirement = Math.max(1, retirementAge - currentAge);
  const retirementYears = Math.max(1, lifeExpectancy - retirementAge);
  const inf = inflation / 100;
  const pre = preReturn / 100;
  const post = postReturn / 100;

  const futureMonthlyExpenses =
    monthlyExpenses * Math.pow(1 + inf, yearsToRetirement);
  const annualExpenseAtRetirement = futureMonthlyExpenses * 12;

  // Present value at retirement of an inflation-growing annual withdrawal,
  // taken at the start of each retirement year.
  let requiredCorpus = 0;
  for (let year = 0; year < retirementYears; year += 1) {
    requiredCorpus +=
      annualExpenseAtRetirement *
      Math.pow(1 + inf, year) /
      Math.pow(1 + post, year);
  }

  const i = monthlyRate(preReturn);
  const monthsToRetirement = yearsToRetirement * 12;
  const projectedCorpus =
    currentSavings * Math.pow(1 + pre, yearsToRetirement) +
    annuityDueFV(monthlyInvestment, i, monthsToRetirement);

  const gap = Math.max(0, requiredCorpus - projectedCorpus);
  const extraMonthly =
    i === 0
      ? gap / monthsToRetirement
      : (gap * i) /
        ((Math.pow(1 + i, monthsToRetirement) - 1) * (1 + i));

  const series: SeriesPoint[] = [];
  let value = currentSavings;
  for (let year = 0; year <= yearsToRetirement; year += 1) {
    series.push({
      year,
      value,
      invested: currentSavings + monthlyInvestment * 12 * year,
    });
    for (let month = 0; month < 12; month += 1) {
      value = (value + monthlyInvestment) * (1 + i);
    }
  }

  return {
    yearsToRetirement,
    retirementYears,
    futureMonthlyExpenses,
    annualExpenseAtRetirement,
    requiredCorpus,
    projectedCorpus,
    gap,
    extraMonthly,
    series,
    target: requiredCorpus,
  };
};

/** Monthly investment required to reach a target, contributions at month start. */
export const requiredMonthlyInvestment = (
  target: number,
  annualRate: number,
  years: number,
) => {
  const months = Math.round(years * 12);
  if (months <= 0) return target;
  const i = monthlyRate(annualRate);
  if (i === 0) return target / months;
  return (
    (target * i) /
    ((Math.pow(1 + i, months) - 1) * (1 + i))
  );
};

export const goalProjection = (
  target: number,
  annualRate: number,
  years: number,
) => {
  const monthly = requiredMonthlyInvestment(target, annualRate, years);
  const invested = monthly * 12 * years;
  const points = Array.from({ length: Math.round(years) + 1 }, (_, year) => ({
    year,
    value: annuityDueFV(
      monthly,
      monthlyRate(annualRate),
      Math.round(year * 12),
    ),
    invested: monthly * 12 * year,
  }));
  return {
    monthly,
    invested,
    growth: target - invested,
    series: points,
  };
};

export const educationProjection = (
  currentAnnualCost: number,
  years: number,
  inflation: number,
  annualRate: number,
) => {
  const futureCost = currentAnnualCost * Math.pow(1 + inflation / 100, years);
  const goal = goalProjection(futureCost, annualRate, years);
  return { futureCost, ...goal };
};

export type RiskProfile = "low" | "medium" | "high";

export const allocationFor = (
  age: number,
  horizon: number,
  risk: RiskProfile,
) => {
  let equity = 100 - age + (horizon - 10) * 0.6;
  if (risk === "low") equity -= 20;
  if (risk === "high") equity += 10;
  equity = clamp(equity, 10, 85);

  let gold = risk === "low" ? 15 : risk === "high" ? 5 : 10;
  gold = clamp(gold, 5, 15);

  let debt = 100 - equity - gold;
  if (debt < 10) {
    equity = 100 - gold - 10;
    debt = 10;
  }

  const roundedEquity = Math.round(equity);
  const roundedGold = Math.round(gold);
  return {
    equity: roundedEquity,
    debt: 100 - roundedEquity - roundedGold,
    gold: roundedGold,
  };
};

export const clampValue = clamp;
