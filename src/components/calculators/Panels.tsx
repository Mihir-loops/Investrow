import { useId, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  allocationFor,
  educationProjection,
  emiSchedule,
  epfSeries,
  goalProjection,
  ppfSeries,
  retirementProjection,
  sipFutureValue,
  sipSeries,
  stepUpSeries,
  type RiskProfile,
} from "../../lib/finance";
import { compactINR, inr, numberIN, percent } from "../../lib/format";
import { GrowthChart } from "../GrowthChart";
import {
  CalculatorNote,
  NumberField,
  ResetButton,
  ResultGrid,
  ResultHero,
  SegmentedField,
} from "../CalculatorUI";
import { Icon } from "../Icon";

const today = () =>
  new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function Panel({
  title,
  label,
  children,
  note,
  onReset,
  output,
}: {
  title: string;
  label: string;
  children: ReactNode;
  note: ReactNode;
  onReset: () => void;
  output: ReactNode;
}) {
  return (
    <div className="calc-panel">
      <div className="calc-panel__inputs">
        <div className="calc-panel__head">
          <p className="eyebrow">
            <span aria-hidden="true" />
            {label}
          </p>
          <h2>{title}</h2>
        </div>
        <div className="calc-panel__fields">{children}</div>
        <div className="calc-panel__foot">
          <ResetButton onClick={onReset} />
          <span>
            Illustration date: <strong>{today()}</strong>
          </span>
        </div>
      </div>
      <div className="calc-panel__output" aria-live="polite">
        {output}
        <CalculatorNote>{note}</CalculatorNote>
      </div>
    </div>
  );
}

const chartColors = {
  value: "var(--chart-value, #176B50)",
  invested: "var(--chart-invested, #9AAB9F)",
  secondary: "var(--chart-secondary, #238361)",
  target: "var(--chart-target, #5C6F66)",
};

export function SipPanel() {
  const id = useId();
  const [monthly, setMonthly] = useState(9000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(15);

  const result = useMemo(() => {
    const safeMonthly = Math.max(0, monthly);
    const safeYears = Math.max(1, Math.min(40, years));
    const safeRate = Math.max(0, Math.min(30, rate));
    const futureValue = sipFutureValue(safeMonthly, safeRate, safeYears);
    const invested = safeMonthly * 12 * safeYears;
    return {
      futureValue,
      invested,
      growth: futureValue - invested,
      series: sipSeries(safeMonthly, safeRate, safeYears),
    };
  }, [monthly, rate, years]);

  return (
    <Panel
      label="SIP return calculator"
      title="See what a monthly habit could become."
      onReset={() => {
        setMonthly(9000);
        setYears(15);
        setRate(15);
      }}
      note={
        <>
          Uses the future value of a monthly investment made at the start of
          each month: FV = P × [((1 + i)ⁿ − 1) ÷ i] × (1 + i), where i is the
          monthly rate. The 15% default follows Investrow&apos;s source page and
          is an assumption, not a forecast. Actual returns vary and may be
          negative over short periods.
        </>
      }
      output={
        <>
          <ResultHero
            label="Estimated future value"
            value={inr(result.futureValue)}
            note={`After ${numberIN(years)} years at ${percent(rate, 1)} assumed annual return`}
          />
          <ResultGrid
            items={[
              { label: "Total invested", value: inr(result.invested) },
              {
                label: "Illustrative growth",
                value: inr(result.growth),
                tone: "accent",
              },
              {
                label: "Monthly investment",
                value: inr(monthly),
              },
            ]}
          />
          <GrowthChart
            ariaLabel={`Line chart comparing total invested and estimated value for a monthly SIP of ${inr(
              monthly,
            )} over ${years} years at ${percent(rate, 1)}.`}
            series={[
              {
                label: "Estimated value",
                color: chartColors.value,
                values: result.series.map((point) => ({
                  x: point.year,
                  y: point.value,
                })),
                area: true,
              },
              {
                label: "Total invested",
                color: chartColors.invested,
                values: result.series.map((point) => ({
                  x: point.year,
                  y: point.invested,
                })),
                area: false,
                dashed: true,
              },
            ]}
          />
        </>
      }
    >
      <NumberField
        id={`${id}-sip-amount`}
        label="Monthly investment"
        value={monthly}
        onChange={setMonthly}
        min={500}
        max={200000}
        step={500}
        prefix="₹"
        hint="The amount you invest every month."
      />
      <NumberField
        id={`${id}-sip-years`}
        label="Investment duration"
        value={years}
        onChange={setYears}
        min={1}
        max={40}
        suffix="yrs"
        hint="Longer periods give compounding more time, but also carry more uncertainty."
      />
      <NumberField
        id={`${id}-sip-rate`}
        label="Assumed annual return"
        value={rate}
        onChange={setRate}
        min={1}
        max={30}
        step={0.5}
        suffix="%"
        hint="A planning assumption, not a promised or predicted return."
      />
    </Panel>
  );
}

export function StepUpPanel() {
  const id = useId();
  const [monthly, setMonthly] = useState(9000);
  const [stepUp, setStepUp] = useState(10);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(12);
  const result = useMemo(
    () => stepUpSeries(monthly, stepUp, rate, Math.max(1, years)),
    [monthly, rate, stepUp, years],
  );

  return (
    <Panel
      label="Step-up SIP"
      title="Increase the investment as your income grows."
      onReset={() => {
        setMonthly(9000);
        setStepUp(10);
        setYears(15);
        setRate(12);
      }}
      note="The starting SIP is increased once a year by the step-up percentage. Contributions are assumed at the start of each month. A higher step-up is only useful if it remains affordable; do not assume a rising income will always cover it."
      output={
        <>
          <ResultHero
            label="Estimated future value"
            value={inr(result.futureValue)}
            note={`Starting at ${inr(monthly)} per month, with a ${percent(stepUp)} annual step-up`}
          />
          <ResultGrid
            items={[
              { label: "Total invested", value: inr(result.invested) },
              { label: "Illustrative growth", value: inr(result.growth), tone: "accent" },
              { label: "Final monthly SIP", value: inr(result.finalMonthly) },
            ]}
          />
          <GrowthChart
            ariaLabel={`Step-up SIP projection over ${years} years with a ${percent(stepUp)} annual increase at an assumed ${percent(rate)} return.`}
            series={[
              {
                label: "Estimated value",
                color: chartColors.value,
                values: result.series.map((point) => ({ x: point.year, y: point.value })),
              },
              {
                label: "Total invested",
                color: chartColors.invested,
                values: result.series.map((point) => ({ x: point.year, y: point.invested })),
                dashed: true,
              },
            ]}
          />
        </>
      }
    >
      <NumberField id={`${id}-step-amount`} label="Starting monthly SIP" value={monthly} onChange={setMonthly} min={500} max={200000} step={500} prefix="₹" />
      <NumberField id={`${id}-step-percent`} label="Annual step-up" value={stepUp} onChange={setStepUp} min={0} max={30} suffix="%" hint="The percentage by which the SIP rises each year." />
      <NumberField id={`${id}-step-years`} label="Investment duration" value={years} onChange={setYears} min={1} max={40} suffix="yrs" />
      <NumberField id={`${id}-step-rate`} label="Assumed annual return" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
    </Panel>
  );
}

export function RetirementPanel() {
  const id = useId();
  const defaults = {
    currentAge: 30,
    retirementAge: 60,
    monthlyExpenses: 40000,
    currentSavings: 500000,
    monthlyInvestment: 10000,
    inflation: 6,
    preReturn: 10,
    postReturn: 7,
    lifeExpectancy: 85,
  };
  const [values, setValues] = useState(defaults);
  const result = useMemo(
    () =>
      retirementProjection({
        ...values,
        retirementAge: Math.max(values.currentAge + 1, values.retirementAge),
        lifeExpectancy: Math.max(values.retirementAge + 1, values.lifeExpectancy),
      }),
    [values],
  );

  const set = (key: keyof typeof defaults) => (value: number) =>
    setValues((current) => ({ ...current, [key]: value }));

  return (
    <Panel
      label="Retirement projection"
      title="Put a number on the life after work."
      onReset={() => setValues(defaults)}
      note={`Assumes retirement expenses rise with inflation and that withdrawals are made at the start of each year from retirement to age ${values.lifeExpectancy}. The post-retirement return is an assumption. This is a planning illustration, not a guarantee that the corpus will last.`}
      output={
        <>
          <ResultHero
            label="Estimated corpus required"
            value={inr(result.requiredCorpus)}
            note={`At age ${values.retirementAge}, with ${result.retirementYears} years of retirement income to plan for`}
          />
          <ResultGrid
            items={[
              { label: "Projected at current savings + SIP", value: inr(result.projectedCorpus) },
              { label: "Estimated shortfall", value: result.gap > 0 ? inr(result.gap) : "No shortfall at these assumptions", tone: "accent" },
              { label: "Additional monthly investment", value: result.gap > 0 ? inr(result.extraMonthly) : "—" },
              { label: "Future monthly expenses", value: inr(result.futureMonthlyExpenses) },
            ]}
          />
          <GrowthChart
            ariaLabel={`Retirement chart showing projected savings reaching ${inr(result.projectedCorpus)} against a required corpus of ${inr(result.requiredCorpus)}.`}
            series={[
              {
                label: "Projected corpus",
                color: chartColors.value,
                values: result.series.map((point) => ({ x: point.year, y: point.value })),
              },
              {
                label: "Required corpus",
                color: chartColors.target,
                values: [
                  { x: 0, y: result.requiredCorpus },
                  { x: result.yearsToRetirement, y: result.requiredCorpus },
                ],
                dashed: true,
                area: false,
              },
            ]}
          />
        </>
      }
    >
      <div className="field-row">
        <NumberField id={`${id}-current-age`} label="Current age" value={values.currentAge} onChange={set("currentAge")} min={18} max={70} suffix="yrs" />
        <NumberField id={`${id}-retire-age`} label="Retirement age" value={values.retirementAge} onChange={set("retirementAge")} min={35} max={80} suffix="yrs" />
      </div>
      <NumberField id={`${id}-expenses`} label="Current monthly expenses" value={values.monthlyExpenses} onChange={set("monthlyExpenses")} min={5000} max={500000} step={1000} prefix="₹" />
      <div className="field-row">
        <NumberField id={`${id}-savings`} label="Current retirement savings" value={values.currentSavings} onChange={set("currentSavings")} min={0} max={100000000} step={10000} prefix="₹" />
        <NumberField id={`${id}-monthly`} label="Current monthly investment" value={values.monthlyInvestment} onChange={set("monthlyInvestment")} min={0} max={500000} step={1000} prefix="₹" />
      </div>
      <div className="field-row">
        <NumberField id={`${id}-inflation`} label="Inflation assumption" value={values.inflation} onChange={set("inflation")} min={0} max={15} step={0.5} suffix="%" />
        <NumberField id={`${id}-pre-return`} label="Return before retirement" value={values.preReturn} onChange={set("preReturn")} min={1} max={25} step={0.5} suffix="%" />
      </div>
      <div className="field-row">
        <NumberField id={`${id}-post-return`} label="Return after retirement" value={values.postReturn} onChange={set("postReturn")} min={1} max={20} step={0.5} suffix="%" />
        <NumberField id={`${id}-life`} label="Plan to age" value={values.lifeExpectancy} onChange={set("lifeExpectancy")} min={70} max={100} suffix="yrs" />
      </div>
    </Panel>
  );
}

export function GoalPanel() {
  const id = useId();
  const [target, setTarget] = useState(2500000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const result = useMemo(
    () => goalProjection(target, rate, Math.max(1, years)),
    [rate, target, years],
  );

  return (
    <Panel
      label="Goal setting"
      title="Start with the target, then find the monthly number."
      onReset={() => {
        setTarget(2500000);
        setYears(10);
        setRate(12);
      }}
      note="Calculates the monthly investment needed to reach the target at an assumed return, with contributions at the start of each month. It does not account for tax, fund expenses or changes in the contribution amount. Review the assumption regularly."
      output={
        <>
          <ResultHero
            label="Monthly investment required"
            value={inr(result.monthly)}
            note={`To reach ${inr(target)} in ${numberIN(years)} years at ${percent(rate, 1)} assumed annual return`}
          />
          <ResultGrid
            items={[
              { label: "Target amount", value: inr(target) },
              { label: "Total invested", value: inr(result.invested) },
              { label: "Illustrative growth", value: inr(result.growth), tone: "accent" },
            ]}
          />
          <GrowthChart
            ariaLabel={`Goal chart showing a target of ${inr(target)} reached over ${years} years with a monthly investment of ${inr(result.monthly)}.`}
            series={[
              {
                label: "Projected value",
                color: chartColors.value,
                values: result.series.map((point) => ({ x: point.year, y: point.value })),
              },
              {
                label: "Total invested",
                color: chartColors.invested,
                values: result.series.map((point) => ({ x: point.year, y: point.invested })),
                dashed: true,
              },
            ]}
          />
        </>
      }
    >
      <NumberField id={`${id}-goal-target`} label="Target amount" value={target} onChange={setTarget} min={50000} max={100000000} step={50000} prefix="₹" hint="The future amount you want to accumulate." />
      <NumberField id={`${id}-goal-years`} label="Years to goal" value={years} onChange={setYears} min={1} max={40} suffix="yrs" />
      <NumberField id={`${id}-goal-rate`} label="Assumed annual return" value={rate} onChange={setRate} min={1} max={25} step={0.5} suffix="%" />
    </Panel>
  );
}

export function EducationPanel() {
  const id = useId();
  const [cost, setCost] = useState(200000);
  const [years, setYears] = useState(12);
  const [inflation, setInflation] = useState(8);
  const [rate, setRate] = useState(12);
  const result = useMemo(
    () => educationProjection(cost, Math.max(1, years), inflation, rate),
    [cost, inflation, rate, years],
  );

  return (
    <Panel
      label="Child education planner"
      title="Estimate the future fee before it arrives."
      onReset={() => {
        setCost(200000);
        setYears(12);
        setInflation(8);
        setRate(12);
      }}
      note="Today's annual cost is inflated at the education-inflation assumption to estimate a future cost. The monthly investment is then calculated using the assumed return. Education inflation and investment returns are both uncertain; review the plan as the goal gets closer."
      output={
        <>
          <ResultHero
            label="Estimated future annual cost"
            value={inr(result.futureCost)}
            note={`In ${numberIN(years)} years, assuming ${percent(inflation, 1)} annual education inflation`}
          />
          <ResultGrid
            items={[
              { label: "Monthly investment required", value: inr(result.monthly), tone: "accent" },
              { label: "Total invested", value: inr(result.invested) },
              { label: "Illustrative growth", value: inr(result.growth) },
              { label: "Today's annual cost", value: inr(cost) },
            ]}
          />
          <GrowthChart
            ariaLabel={`Education planning chart projecting a future annual cost of ${inr(result.futureCost)} and a monthly investment of ${inr(result.monthly)}.`}
            series={[
              {
                label: "Projected corpus",
                color: chartColors.value,
                values: result.series.map((point) => ({ x: point.year, y: point.value })),
              },
              {
                label: "Total invested",
                color: chartColors.invested,
                values: result.series.map((point) => ({ x: point.year, y: point.invested })),
                dashed: true,
              },
            ]}
          />
        </>
      }
    >
      <NumberField id={`${id}-education-cost`} label="Today's annual cost" value={cost} onChange={setCost} min={10000} max={5000000} step={10000} prefix="₹" />
      <NumberField id={`${id}-education-years`} label="Years to admission" value={years} onChange={setYears} min={1} max={25} suffix="yrs" />
      <NumberField id={`${id}-education-inflation`} label="Education inflation" value={inflation} onChange={setInflation} min={0} max={20} step={0.5} suffix="%" />
      <NumberField id={`${id}-education-rate`} label="Assumed annual return" value={rate} onChange={setRate} min={1} max={25} step={0.5} suffix="%" />
    </Panel>
  );
}

export function EmiPanel() {
  const id = useId();
  const [principal, setPrincipal] = useState(3000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const result = useMemo(
    () => emiSchedule(principal, rate, Math.max(1, years)),
    [principal, rate, years],
  );

  return (
    <Panel
      label="EMI calculator"
      title="See the monthly payment and the interest behind it."
      onReset={() => {
        setPrincipal(3000000);
        setRate(8.5);
        setYears(20);
      }}
      note="Uses the standard reducing-balance EMI formula. It does not include processing fees, insurance, prepayment charges or changes in a floating interest rate. Your lender's sanction letter is the authoritative repayment schedule."
      output={
        <>
          <ResultHero
            label="Monthly EMI"
            value={inr(result.payment)}
            note={`For ${inr(principal)} at ${percent(rate, 2)} for ${numberIN(years)} years`}
          />
          <ResultGrid
            items={[
              { label: "Total interest", value: inr(result.totalInterest), tone: "accent" },
              { label: "Total repayment", value: inr(result.totalPayment) },
              { label: "Loan amount", value: inr(principal) },
              { label: "Tenure", value: `${numberIN(result.months)} months` },
            ]}
          />
          <GrowthChart
            ariaLabel={`EMI chart showing outstanding loan balance and cumulative interest over ${years} years.`}
            series={[
              {
                label: "Outstanding balance",
                color: chartColors.value,
                values: result.points.map((point) => ({ x: point.year, y: point.balance })),
              },
              {
                label: "Interest paid",
                color: chartColors.invested,
                values: result.points.map((point) => ({ x: point.year, y: point.interestPaid })),
                dashed: true,
              },
            ]}
          />
        </>
      }
    >
      <NumberField id={`${id}-emi-principal`} label="Loan amount" value={principal} onChange={setPrincipal} min={100000} max={100000000} step={100000} prefix="₹" />
      <NumberField id={`${id}-emi-rate`} label="Annual interest rate" value={rate} onChange={setRate} min={1} max={25} step={0.1} suffix="%" />
      <NumberField id={`${id}-emi-years`} label="Loan tenure" value={years} onChange={setYears} min={1} max={30} suffix="yrs" />
    </Panel>
  );
}

export function PpfPanel() {
  const id = useId();
  const [annual, setAnnual] = useState(150000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(7.1);
  const result = useMemo(
    () => ppfSeries(annual, rate, Math.max(1, years)),
    [annual, rate, years],
  );

  return (
    <Panel
      label="PPF projection"
      title="See how yearly contributions could compound."
      onReset={() => {
        setAnnual(150000);
        setYears(15);
        setRate(7.1);
      }}
      note="Assumes the annual contribution is made at the start of each year and compounds annually. The 7.1% default is an illustrative assumption, not the current PPF rate. Actual rates are notified periodically and the official PPF rules govern deposits and withdrawals."
      output={
        <>
          <ResultHero
            label="Estimated maturity value"
            value={inr(result.maturity)}
            note={`After ${numberIN(years)} years at ${percent(rate, 1)} assumed annual interest`}
          />
          <ResultGrid
            items={[
              { label: "Total contributions", value: inr(result.invested) },
              { label: "Estimated interest", value: inr(result.interest), tone: "accent" },
              { label: "Yearly contribution", value: inr(annual) },
            ]}
          />
          <GrowthChart
            ariaLabel={`PPF projection reaching ${inr(result.maturity)} after ${years} years.`}
            series={[
              {
                label: "Projected balance",
                color: chartColors.value,
                values: result.series.map((point) => ({ x: point.year, y: point.value })),
              },
              {
                label: "Total contributions",
                color: chartColors.invested,
                values: result.series.map((point) => ({ x: point.year, y: point.invested })),
                dashed: true,
              },
            ]}
          />
        </>
      }
    >
      <NumberField id={`${id}-ppf-annual`} label="Yearly contribution" value={annual} onChange={setAnnual} min={500} max={2000000} step={5000} prefix="₹" />
      <NumberField id={`${id}-ppf-years`} label="Duration" value={years} onChange={setYears} min={1} max={50} suffix="yrs" hint="PPF has a statutory maturity period; this calculator does not replace the official rules." />
      <NumberField id={`${id}-ppf-rate`} label="Assumed annual interest" value={rate} onChange={setRate} min={1} max={15} step={0.1} suffix="%" />
    </Panel>
  );
}

export function EpfPanel() {
  const id = useId();
  const [salary, setSalary] = useState(30000);
  const [employee, setEmployee] = useState(12);
  const [employer, setEmployer] = useState(12);
  const [current, setCurrent] = useState(200000);
  const [years, setYears] = useState(25);
  const [rate, setRate] = useState(8.25);
  const result = useMemo(
    () => epfSeries(salary, employee, employer, current, rate, Math.max(1, years)),
    [current, employee, employer, rate, salary, years],
  );

  return (
    <Panel
      label="EPF projection"
      title="Build a picture of the retirement balance."
      onReset={() => {
        setSalary(30000);
        setEmployee(12);
        setEmployer(12);
        setCurrent(200000);
        setYears(25);
        setRate(8.25);
      }}
      note="A simplified projection using monthly compounding on the combined employee and employer contribution. Actual EPF interest is calculated under official rules and may exclude certain components; the employer share may include EPS diversion. Use your EPF passbook for an authoritative balance."
      output={
        <>
          <ResultHero
            label="Estimated EPF balance"
            value={inr(result.maturity)}
            note={`After ${numberIN(years)} years, including a current balance of ${inr(current)}`}
          />
          <ResultGrid
            items={[
              { label: "Employee contributions", value: inr(result.employeeTotal) },
              { label: "Employer contributions", value: inr(result.employerTotal) },
              { label: "Estimated interest", value: inr(result.interest), tone: "accent" },
              { label: "Monthly contribution", value: inr(result.monthlyContribution) },
            ]}
          />
          <GrowthChart
            ariaLabel={`EPF projection reaching ${inr(result.maturity)} after ${years} years.`}
            series={[
              {
                label: "Projected balance",
                color: chartColors.value,
                values: result.series.map((point) => ({ x: point.year, y: point.value })),
              },
              {
                label: "Contributions + opening balance",
                color: chartColors.invested,
                values: result.series.map((point) => ({ x: point.year, y: point.invested })),
                dashed: true,
              },
            ]}
          />
        </>
      }
    >
      <NumberField id={`${id}-epf-salary`} label="Monthly basic + DA" value={salary} onChange={setSalary} min={5000} max={1000000} step={1000} prefix="₹" />
      <div className="field-row">
        <NumberField id={`${id}-epf-employee`} label="Employee contribution" value={employee} onChange={setEmployee} min={0} max={25} step={0.5} suffix="%" />
        <NumberField id={`${id}-epf-employer`} label="Employer contribution" value={employer} onChange={setEmployer} min={0} max={25} step={0.5} suffix="%" />
      </div>
      <NumberField id={`${id}-epf-current`} label="Current EPF balance" value={current} onChange={setCurrent} min={0} max={100000000} step={10000} prefix="₹" />
      <div className="field-row">
        <NumberField id={`${id}-epf-years`} label="Years to retirement" value={years} onChange={setYears} min={1} max={40} suffix="yrs" />
        <NumberField id={`${id}-epf-rate`} label="Assumed annual interest" value={rate} onChange={setRate} min={1} max={15} step={0.05} suffix="%" />
      </div>
    </Panel>
  );
}

function AllocationDonut({
  equity,
  debt,
  gold,
}: {
  equity: number;
  debt: number;
  gold: number;
}) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const segments = [
    { value: equity, color: "var(--color-equity, #176B50)", label: "Equity" },
    { value: debt, color: "var(--color-debt, #9AAB9F)", label: "Debt" },
    { value: gold, color: "var(--color-gold, #D7F36A)", label: "Gold" },
  ];
  let offset = 0;

  return (
    <div className="allocation-donut">
      <svg viewBox="0 0 200 200" role="img" aria-label={`Illustrative allocation: ${equity}% equity, ${debt}% debt, ${gold}% gold.`}>
        <circle cx="100" cy="100" r={radius} fill="none" stroke="var(--line, #E6EEE3)" strokeWidth="22" />
        {segments.map((segment) => {
          const length = (segment.value / 100) * circumference;
          const dash = `${length} ${circumference - length}`;
          const currentOffset = offset;
          offset += length;
          return (
            <circle
              key={segment.label}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="22"
              strokeDasharray={dash}
              strokeDashoffset={-currentOffset}
              transform="rotate(-90 100 100)"
              className="allocation-donut__segment"
            />
          );
        })}
        <text x="100" y="96" textAnchor="middle" className="allocation-donut__value">
          {equity}%
        </text>
        <text x="100" y="116" textAnchor="middle" className="allocation-donut__label">
          equity
        </text>
      </svg>
      <ul>
        {segments.map((segment) => (
          <li key={segment.label}>
            <span style={{ background: segment.color }} aria-hidden="true" />
            {segment.label}
            <strong>{segment.value}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AllocationPanel() {
  const id = useId();
  const [age, setAge] = useState(30);
  const [horizon, setHorizon] = useState(20);
  const [risk, setRisk] = useState<RiskProfile>("medium");
  const result = useMemo(
    () => allocationFor(age, horizon, risk),
    [age, horizon, risk],
  );

  const rationale =
    risk === "low"
      ? "A lower-risk tilt reduces equity exposure and holds a larger debt and gold cushion. It may suit a shorter horizon or a lower tolerance for volatility, but it can also reduce long-term growth potential."
      : risk === "high"
        ? "A higher-risk tilt increases equity exposure for a longer horizon. It may offer more growth potential, but drawdowns can be deeper and longer."
        : "A balanced tilt keeps a meaningful equity allocation for long-term growth while holding debt and gold for stability.";

  return (
    <Panel
      label="Asset allocation"
      title="A starting point for the equity–debt mix."
      onReset={() => {
        setAge(30);
        setHorizon(20);
        setRisk("medium");
      }}
      note="This is a rules-based educational illustration, not a personalised recommendation. It does not account for your income, liabilities, emergency fund, existing portfolio, tax position or specific goals. Speak to a qualified adviser before acting."
      output={
        <>
          <ResultHero
            label="Illustrative equity allocation"
            value={`${result.equity}%`}
            note={`Based on age ${age}, a ${horizon}-year horizon and a ${risk} risk tolerance`}
          />
          <AllocationDonut equity={result.equity} debt={result.debt} gold={result.gold} />
          <p className="allocation-rationale">{rationale}</p>
          <div className="allocation-bars" aria-hidden="true">
            <div><span>Equity</span><i style={{ width: `${result.equity}%` }} /></div>
            <div><span>Debt</span><i style={{ width: `${result.debt}%` }} /></div>
            <div><span>Gold</span><i style={{ width: `${result.gold}%` }} /></div>
          </div>
        </>
      }
    >
      <NumberField id={`${id}-allocation-age`} label="Current age" value={age} onChange={setAge} min={18} max={80} suffix="yrs" />
      <NumberField id={`${id}-allocation-horizon`} label="Investment horizon" value={horizon} onChange={setHorizon} min={1} max={40} suffix="yrs" />
      <SegmentedField
        label="Risk tolerance"
        value={risk}
        onChange={setRisk}
        options={[
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ]}
      />
      <div className="calc-callout">
        <Icon name="info" size={17} />
        <p>
          A longer horizon can support more equity exposure, but only if you can
          stay invested through a difficult market. Your behaviour matters as
          much as the model.
        </p>
      </div>
    </Panel>
  );
}

export const calculatorPanels: Record<string, () => JSX.Element> = {
  sip: SipPanel,
  "sip-step-up": StepUpPanel,
  retirement: RetirementPanel,
  "goal-setting": GoalPanel,
  "children-education": EducationPanel,
  emi: EmiPanel,
  ppf: PpfPanel,
  epf: EpfPanel,
  "asset-allocation": AllocationPanel,
};

export const chartValueLabel = (value: number) => compactINR(value);
