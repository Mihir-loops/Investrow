export const inr = (value: number, maximumFractionDigits = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);

export const numberIN = (value: number, maximumFractionDigits = 0) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);

export const compactINR = (value: number) => {
  const absolute = Math.abs(value);
  if (absolute >= 1e7) {
    const crores = value / 1e7;
    return `₹${crores.toFixed(crores >= 10 ? 0 : 1)} Cr`;
  }
  if (absolute >= 1e5) {
    const lakhs = value / 1e5;
    return `₹${lakhs.toFixed(lakhs >= 10 ? 0 : 1)} L`;
  }
  if (absolute >= 1e3) {
    const thousands = value / 1e3;
    return `₹${thousands.toFixed(thousands >= 10 ? 0 : 1)}k`;
  }
  return `₹${Math.round(value)}`;
};

export const percent = (value: number, digits = 0) =>
  `${Number(value).toFixed(digits)}%`;

export const toNumber = (value: string, fallback: number) => {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
};
