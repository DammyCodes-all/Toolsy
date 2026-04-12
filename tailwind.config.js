/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Map Tailwind's sans family to the exact font asset name loaded by the
      // @expo-google-fonts/manrope loader so `font-sans` resolves to the correct
      // native font file on iOS/Android.
      fontFamily: {
        sans: [
          "Manrope_400Regular",
          "Manrope",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [
    // Add utilities that explicitly set the fontFamily to the loaded Manrope
    // asset names. On native platforms you must set the exact font family
    // (e.g. "Manrope_700Bold") for bold/semibold faces to render correctly.
    plugin(function ({ addUtilities }) {
      addUtilities(
        {
          ".font-sans": {
            fontFamily: "Manrope_400Regular",
          },

          ".font-normal": {
            fontFamily: "Manrope_400Regular",
          },
          ".font-medium": {
            fontFamily: "Manrope_500Medium",
          },
          ".font-semibold": {
            fontFamily: "Manrope_600SemiBold",
          },
          ".font-bold": {
            fontFamily: "Manrope_700Bold",
          },
          ".font-black": {
            fontFamily: "Manrope_700Bold",
          },
        },
        {
          variants: ["responsive"],
        },
      );
    }),
  ],
};
