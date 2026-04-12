import { ConvertTypes } from "@/constants/types";

const lengthToMetre = (value: number, unit: string): number => {
  if (!Number.isFinite(value)) return NaN;

  if (unit === "Metres") return value;
  if (unit === "Centimetres") return value / 100;
  if (unit === "Millimetres") return value / 1000;
  if (unit === "Kilometres") return value * 1000;
  if (unit === "Inches") return value * 0.0254;
  if (unit === "Feet") return value * 0.3048;
  if (unit === "Yards") return value * 0.9144;
  if (unit === "Miles") return value * 1609.34;

  return NaN;
};

const metreToLength = (metres: number, unit: string): number => {
  if (!Number.isFinite(metres)) return NaN;

  if (unit === "Metres") return metres;
  if (unit === "Centimetres") return metres * 100;
  if (unit === "Millimetres") return metres * 1000;
  if (unit === "Kilometres") return metres / 1000;
  if (unit === "Inches") return metres / 0.0254;
  if (unit === "Feet") return metres / 0.3048;
  if (unit === "Yards") return metres / 0.9144;
  if (unit === "Miles") return metres / 1609.34;

  return NaN;
};

const weightToKilogram = (value: number, unit: string): number => {
  if (!Number.isFinite(value)) return NaN;

  if (unit === "Kilograms") return value;
  if (unit === "Grams") return value / 1000;
  if (unit === "Milligrams") return value / 1_000_000;
  if (unit === "Pounds") return value * 0.45359237;

  return NaN;
};

const kilogramToWeight = (kg: number, unit: string): number => {
  if (!Number.isFinite(kg)) return NaN;

  if (unit === "Kilograms") return kg;
  if (unit === "Grams") return kg * 1000;
  if (unit === "Milligrams") return kg * 1_000_000;
  if (unit === "Pounds") return kg / 0.45359237;

  return NaN;
};

const tempToCelsius = (value: number, unit: string): number => {
  if (!Number.isFinite(value)) return NaN;

  if (unit === "Celsius") return value;
  if (unit === "Fahrenheit") return (value - 32) * (5 / 9);
  if (unit === "Kelvin") return value - 273.15;

  return NaN;
};

const celsiusToTemp = (c: number, unit: string): number => {
  if (!Number.isFinite(c)) return NaN;

  if (unit === "Celsius") return c;
  if (unit === "Fahrenheit") return c * (9 / 5) + 32;
  if (unit === "Kelvin") return c + 273.15;

  return NaN;
};

/**
 * Convert metric value using exact display unit names from convert-data.ts.
 * Returns a number rounded to 4 decimal places, or NaN if conversion fails.
 */
export const convertMetric = (
  metric: ConvertTypes,
  input: number,
  selectedUnit: string,
  outputUnit: string,
): number => {
  if (!Number.isFinite(input)) return NaN;

  let result: number = NaN;

  if (metric === "length") {
    const metres