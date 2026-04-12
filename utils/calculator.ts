export type DiscountCalculation = {
  isReady: boolean;
  original: number;
  discountRate: number;
  taxRate: number;
  discountAmount: number;
  discountedSubtotal: number;
  taxAmount: number;
  finalTotal: number;
  totalSavings: number;
};

function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function parseUserNumber(value: string): number {
  if (typeof value !== "string") return NaN;

  const trimmed = value.trim();

  if (
    trimmed === "" ||
    trimmed === "-" ||
    trimmed === "." ||
    trimmed === "-."
  ) {
    return NaN;
  }

  const normalized = trimmed.replace(/,/g, ".");
  const parsed = parseFloat(normalized);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return NaN;
  }

  return parsed;
}

export function calculateDiscount(
  originalPrice: string,
  discountPercent: string,
  taxPercent: string,
): DiscountCalculation {
  const original = parseUserNumber(originalPrice);
  const discount = parseUserNumber(discountPercent);
  const tax = parseUserNumber(taxPercent);

  const hasOriginal = Number.isFinite(original);
  const hasDiscount = Number.isFinite(discount);
  const safeTax = Number.isFinite(tax) ? tax : 0;

  if (!hasOriginal || !hasDiscount) {
    return {
      isReady: false,
      original: 0,
      discountRate: 0,
      taxRate: safeTax,
      discountAmount: 0,
      discountedSubtotal: 0,
      taxAmount: 0,
      finalTotal: 0,
      totalSavings: 0,
    };
  }

  const discountRate = clampNumber(discount, 0, 100);
  const taxRate = clampNumber(safeTax, 0, 100);

  const discountAmount = original * (discountRate / 100);
  const discountedSubtotal = original - discountAmount;
  const taxAmount = discountedSubtotal * (taxRate / 100);
  const finalTotal = discountedSubtotal + taxAmount;

  return {
    isReady: true,
    original,
    discountRate,
    taxRate,
    discountAmount,
    discountedSubtotal,
    taxAmount,
    finalTotal,
    totalSavings: discountAmount,
  };
}

export function formatNaira(value: number) {
  if (!Number.isFinite(value)) return "—";

  return `₦${value.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(2)}%`;
}
