# Toolsy

Minimal utilities for daily tasks: unit converter, notes, and a Naira-aware discount calculator. Built with Expo + React Native.

Built with ❤️ by Aluminate

A compact collection of utility tools built with Expo + React Native (Expo Router). Toolsy favors a strict monochrome design system and small, focused utilities that are easy to extend. The app uses simple, reusable components and a file-based routing approach.

This README explains the project layout, how to run the app, how to add new tools, and a quick tour of important implementation details (including the discount calculator, Convert tool, Notes tool, and Naira formatting).

---

Table of contents
- Project summary
- Features
- Quick start
- Project structure
- Important conventions & styling
- Tool details
  - Discount Calculator
  - Convert (Unit Converter)
  - Notes & To-Do
- Adding a new tool / screen
- Testing & debugging
- Localization / currency (₦)
- Developer notes & best practices
- License & credits

---

Project summary
---------------
Toolsy is an Expo app containing small productivity utilities. Each tool lives in the `app/` router tree as a route/screen. The app emphasizes:

- Monochrome UI (neutral colors only)
- Clean, utility-first UX
- Small, reusable components
- Lightweight, single-file tools that can be refactored when complexity grows

Current notable tools:
- Discount Calculator (with Nigerian naira support)
- Unit Converter
- Notes & To-Do

Features
--------
- File-based routing with Expo Router
- Monochrome design tokens and Tailwind-like utility classes
- Discount calculator
  - Live calculation (original price, discount %, optional tax %)
  - Naira formatting (₦) everywhere money is displayed
  - Reset button and a detailed breakdown (discount amount, tax, subtotal, final total)
- Convert tool (unit conversions across length, weight, temperature)
- Notes tool (simple local CRUD with AsyncStorage)
- Reusable UI components and utility functions under `components/` and `utils/`

Quick start
-----------
1. Install dependencies
   ```bash
   npm install
   ```

2. Start the dev server
   ```bash
   npx expo start
   ```
   Use the Expo Dev Tools to open on iOS Simulator, Android Emulator, or a physical device (Expo Dev client / Expo Go).

3. Run on a specific platform
   - iOS simulator:
     ```bash
     npx expo run:ios
     ```
   - Android emulator:
     ```bash
     npx expo run:android
     ```

Project structure
-----------------
Key folders and files:

- `app/`
  - `(tabs)/` - tabbed screens (home, convert, calculate, notes, etc.)
    - `calculate.tsx` - discount calculator screen (page-level composition)
    - `convert.tsx` - unit converter screen (page-level composition)
    - `notes.tsx` - notes list screen
    - `create-note.tsx` - create note screen
  - `_layout.tsx` - app shell / top-level layout
  - `index.tsx` - home screen and entry
- `components/`
  - `calculator/` - calculator component pieces (input, result, summary)
  - `convert/` - ConvertBox, ConvertSwitch
  - `ui/` - shared UI components (Note, ToolCard, etc.)
  - `topbar/` - topbar components
- `contexts/` - React contexts (e.g., notes)
- `utils/`
  - `calculator.ts` - discount parsing, calculation, formatting utilities (₦ formatting)
  - `convert.ts` - conversion algorithms used by the convert tool
- `constants/` - conversion data, tools list, types
- `assets/` - images, fonts (if present)
- `global.css` - global styles

Important conventions & styling
------------------------------
- Monochrome only: use neutral colors (`bg-neutral-100`, `bg-neutral-900`, `text-neutral-500`, etc.) — no colored accents.
- Typography: headings use `Manrope_700Bold` where applied in-line (see pattern across screens).
- Layout: pages use a shared spacing system (top padding 24, horizontal padding 24, bottom padding 32).
- UI pattern:
  - Page header (uppercase, bold) + muted subtitle + left black divider line
  - White cards for input/content
  - Dark/black cards for emphasis/results
  - Buttons/pressables follow the app color rules (e.g., `bg-neutral-900` for primary actions)
- Tailwind-like `className` props are used across components — keep consistent class names for spacing and typography.

Tool details
------------

Discount Calculator
-------------------
- Page: `app/(tabs)/calculate.tsx`
- Components:
  - `components/calculator/CalculatorInputField.tsx` — single input row with optional inline prefix (used to show `₦`)
  - `components/calculator/CalculatorInputSection.tsx` — composed block of inputs and reset action
  - `components/calculator/CalculatorResultCard.tsx` — dark emphasis result card
  - `components/calculator/CalculatorSummaryRow.tsx` — summary rows for breakdown
- Logic:
  - Utilities in `utils/calculator.ts`:
    - `parseUserNumber` — tolerant numeric parsing (handles comma as decimal separator, ignores incomplete values like `-` or `.`)
    - `calculateDiscount(originalPrice: string, discountPercent: string, taxPercent: string)` — returns a structured result (`discountAmount`, `discountedSubtotal`, `taxAmount`, `finalTotal`, etc.)
    - `formatNaira` — formats numbers with `₦` and `en-NG` grouping and two decimals
    - `formatPercent` — fixed 2 decimals with `%`
  - Inputs are strings (to avoid mid-edit numeric issues). The utilities parse & validate for calculation.
  - Discount and tax rates are clamped to [0, 100].
- UX notes:
  - Original price has an inline `₦` prefix to make currency explicit while typing.
  - Calculation is live (no explicit calculate button).
  - Reset clears fields to defaults.
  - Monetary output always uses naira formatting.

Convert (Unit Converter)
------------------------
- Page: `app/(tabs)/convert.tsx`
- Purpose: instant conversion between units across categories (length, weight, temperature).
- Main components:
  - `components/convert/ConvertSwitch.tsx`
    - Reusable category switch tiles (e.g., Length, Weight, Temperature).
    - Each tile follows the app’s monochrome tile style; active tile uses `bg-neutral-900` for emphasis.
  - `components/convert/ConvertBox.tsx`
    - Input/output box that contains:
      - numeric input (editable for the "From" box, disabled for the "To" box)
      - a unit selector dropdown
    - Uses `react-native-element-dropdown` for unit selection on supported platforms.
- Constants & data:
  - `constants/convert-data.ts` defines categories and units (labels).
  - `constants/types.ts` includes the `ConvertTypes` union for type-safety.
- Conversion logic:
  - `utils/convert.ts` contains the conversion engines:
    - category-specific helpers (e.g., `lengthToMetre`, `metreToLength`, `weightToKilogram`, `kilogramToWeight`, `tempToCelsius`, `celsiusToTemp`)
    - `convertMetric(metric, input, selectedUnit, outputUnit)` performs the full conversion using intermediate canonical units.
  - Parsing: the ConvertBox component normalizes input (commas -> dots) and uses `parseFloat` to feed numeric converters. It returns NaN for invalid values.
  - Rounding: results are rounded to a reasonable precision (commonly 4 decimal places or as needed).
- UX & behavior:
  - Category switches change the available units and reset selected units appropriately.
  - From/To boxes visually indicate editable vs. result state.
  - Inputs use numeric keyboards; placeholder/highlighting follow the app style.
- Extending:
  - Add or change units in `constants/convert-data.ts`.
  - Add conversion helpers in `utils/convert.ts` and wire into `convertMetric`.
  - Keep UI consistent by reusing `ConvertBox` and `ConvertSwitch`.

Notes & To-Do
-------------
- Pages:
  - `app/(tabs)/notes.tsx` — list view & main notes screen
  - `app/create-note.tsx` — create note view
- State & persistence:
  - `contexts/NotesContext.tsx` implements a small notes context that:
    - persists notes to local storage (`@react-native-async-storage/async-storage`)
    - exposes operations: `addNote`, `toggleNoteDone`, `removeNote`, `clearNotes`
    - stores notes with shape:
      ```ts
      type NoteItem = {
        id: string;
        title: string;
        body: string;
        done: boolean;
        createdAt: string;
      };
      ```
  - Storage key: `toolsy.notes`
- Behavior:
  - Notes are loaded on mount and validated before being set to state.
  - `addNote` trims inputs and prevents empty bodies.
  - `toggleNoteDone` flips the `done` boolean.
  - `removeNote` is typically gated behind a delete confirmation in the UI.
  - Notes are sorted on the list view with unfinished notes first and by creation date within groups.
- Components:
  - `components/ui/Note.tsx` — visual representation of a note with actions (toggle done, delete).
  - `components/ui/ToolCard.tsx` — used in the Home screen to list available tools.
- UX:
  - Floating action button (FAB) is used to create a new note (`bg-neutral-900` with white icon).
  - Create screen uses `TextInput` with underlined style and uppercase labels consistent with the app.
  - Basic validation alerts the user when required fields are empty.
- Extending:
  - To add tags, reminders, or syncing, keep notes context as the gate to persist & expose new operations.
  - For remote sync, implement a sync layer and fallback to AsyncStorage for offline use.

Adding a new tool / screen
--------------------------
1. Create a route file inside `app/(tabs)` or `app/` depending on desired navigation.
   Example: `app/(tabs)/my-tool.tsx`.

2. Follow the page pattern:
   - Use a `ScrollView` with `className="flex-1 bg-neutral-100 text-neutral-900"` and `contentContainerStyle` padding.
   - Start with the header block:
     - Title (Manrope bold, uppercase, `text-4xl`)
     - Divider + subtitle (muted text)
   - Compose white input cards + dark result cards as necessary.

3. If the tool has shared logic or complexity, place helpers in:
   - `components/<tool>/` for UI pieces
   - `utils/<tool>.ts` for parsing/formatting logic

4. Export or import any constants from `constants/` if needed (e.g., supported tools, unit lists).

Testing & debugging
-------------------
- Basic runtime diagnostics: run the app and verify the different tools:
  - Convert: test across unit boundaries and edge cases (e.g., 0, extremely large values).
  - Calculator: test invalid inputs, percent = 0, percent = 100, tax included/excluded.
  - Notes: test persistence across restarts, add/remove, and toggling done.
- When components render unexpectedly, inspect `className` utility classes and container paddings — layout issues are often spacing or missing font family lines.
- Prefer `toLocaleString` for user-facing number formatting to get proper grouping and decimal handling per locale.
- Add unit tests for numeric utilities if you plan to expand logic or accepted input forms.

Localization & currency
-----------------------
- The discount calculator currently uses Nigerian naira (`₦`) as the primary currency.
- Formatting is implemented in `utils/calculator.ts` using `toLocaleString("en-NG")` and prefixing with `₦`.
- If you add multi-currency support:
  - Move formatting into a general `utils/currency.ts`
  - Add a lightweight currency selector and persist the selected currency in local storage or app context.

Developer notes & best practices
-------------------------------
- Keep components small and focused; extract only when code is reused or when a single file grows beyond ~200 lines.
- Reuse the header and card patterns to keep visual consistency.
- Avoid color usage outside the neutral palette; keep contrast and typographic hierarchy to communicate emphasis.
- Document helper utilities with small JSDoc comments for future maintainers.
- When adding numeric inputs, use string state and parsing helpers to avoid edit-time numeric corner cases.

Stage 1 - Task/Checklist Manager additions
------------------------------------------
This repository has been updated to meet the Stage 1 Mobile Track requirements by extending the existing Notes / To‑Do feature into a simple task manager with edit capability and clear build/upload guidance for Appetize. Summary of what was added and where to look:

What was added
- Edit existing tasks:
  - A new `updateNote` operation was introduced in `contexts/NotesContext.tsx` (context API now exposes an edit/update function).
  - The `create-note` screen (`app/create-note.tsx`) was extended to support both create and edit modes (when called with an `id` route param it pre-fills fields and saves updates).
  - `components/ui/Note.tsx` includes an Edit action that navigates to the create-note screen in edit mode.
- Create & mark tasks completed:
  - Existing `addNote` and `toggleNoteDone` remain in place and continue to be used.
- Delete tasks:
  - Existing `removeNote` remains, with a delete confirmation in the list UI.
- Local persistence (offline):
  - Storage continues to use `@react-native-async-storage/async-storage` under the key `toolsy.notes`. This provides offline persistence for tasks.

Changed / important files
- `Toolsy/contexts/NotesContext.tsx` — added `updateNote` and updated the exported context type to include this operation; `NoteItem` remains the canonical task shape for now.
- `Toolsy/app/create-note.tsx` — now supports create + edit modes (prefill when `id` param is provided).
- `Toolsy/components/ui/Note.tsx` — added an Edit action (navigates to `/create-note?id=<note.id>`), alongside the existing delete and toggle behaviors.

How to build an APK and upload to Appetize (quick guide)
1. Prepare:
   - Ensure `eas.json` is present and configured for your build profiles (this repo includes an `eas.json`).
   - Install EAS CLI and authenticate:
     - `npm install -g eas-cli`
     - `eas login`
2. Build (Android APK preview):
   - Run: `eas build -p android --profile preview`
   - When the build completes, download the generated `.apk` from the EAS build console or via `eas build:list` and `eas build:download`.
3. Upload to Appetize:
   - Visit https://appetize.io/upload
   - Upload the APK and follow the prompts to generate a public preview link.
   - Save the public URL and include it with your submission.
4. iOS (optional):
   - Building an IPA requires Apple credentials. Use `eas build -p ios` and follow EAS prompts for credentials or configure them in App Store Connect.
5. Add the Appetize public URL to this README (under "Appetize preview link") and include it in your submission form.

Verification checklist (what to test)
- Edit flow:
  - Open the Notes screen, tap Edit on an existing note, modify fields, and save — changes persist and show immediately.
- Create / Delete / Toggle:
  - Create a new note, mark it done/undone, delete it with confirmation.
- Persistence:
  - Close the app fully and restart; tasks should persist via AsyncStorage (key: `toolsy.notes`).
- If you need checklist/subtask support in the future, extend `NoteItem` in `contexts/NotesContext.tsx` with a `subtasks` array and surface operations in the context.

Submission checklist
- Appetize preview link (public)
- GitHub repository link (this repo)
- LinkedIn/X post describing:
  - Development process
  - Challenges encountered
  - Purpose of the task
  - How the task improved your workflow
  - Tag the HNG Internship account in the post

Next steps I can take for you
- Open a PR with the concrete code changes (implementing `updateNote`, wiring the edit mode in `create-note`, and adding the Edit action in the Note UI).
- Provide the exact EAS commands you should run locally and what to expect from the build output.
- Draft a short LinkedIn/X post you can publish for the submission.

Built with ❤️ by Aluminate
