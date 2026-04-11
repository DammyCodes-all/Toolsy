import type { ToolCardType } from "@/components/ui/ToolCard";

export const tools: ToolCardType[] = [
  {
    name: "Unit Converter",
    description:
      "Instant translation across length, mass, and digital volume with high precision output.",
    icon: "convert",
    href: "/convert",
  },
  {
    name: "Notes & To-Do",
    description:
      "Capture thoughts and maintain task lists with a sterile, focus-driven environment.",
    icon: "notes",
    href: "/notes",
  },
  {
    name: "Discount Calculator",
    description:
      "Rapid financial deductions and percentage analysis for professional use.",
    icon: "calculate",
    href: "/calculate",
  },
];
