# Quantum Effects

A React and JavaScript website with a home page, collapsible article navigation, and interactive calculations.

## Run

Use Node.js 24 (for example, `nvm use 24`), then:

```sh
npm install
npm run dev
```

## Project structure

```text
src/
  App.jsx                          # Imports pages and handles navigation
  App.css                          # Shared responsive styling
  main.jsx                         # React entry point
  components/
    HomePage.jsx                   # Landing page
    QuantumComputerGraphic.jsx     # Accessible SVG computer illustration
    IntroductionPage.jsx           # Qubit state-space article
    SingleQubitFidelityPage.jsx     # Single-qubit fidelity article
    TwoQubitFidelityPage.jsx        # Two-qubit fidelity article
    ArticleLayout.jsx              # Shared article wrapper
    Calculator.jsx                 # Inputs, validation, and results
  scripts/
    introduction.js                # Basis-state count
    singleQubitFidelity.ts          # single_qubit_F(tg, T1, T2)
    twoQubitFidelity.ts             # two_qubit_F(tg, T1a, T1b, T2a, T2b)
    calculations.test.js           # Calculation checks
```

Each article component imports its calculation from `src/scripts/`. Calculations run locally in the browser when the reader submits the form; no server is required. The calculator clears old results when inputs change and displays validation errors. Page input state resets when navigating away.

To add an article, create a page component and calculation script, import the page into `App.jsx`, and add it to the `pages` array. Pass input definitions and a calculation callback to `Calculator`.

The home image is an original, scalable SVG concept illustration of a quantum computer dilution refrigerator.

## Verify

```sh
npm test
npm run build
```

The fidelity scripts are TypeScript translations of the supplied Python formulas. Gate time `tg` is supplied in nanoseconds; all T1 and T2 inputs remain in microseconds. Both scripts convert `tg / 1000` before evaluating the formulas. Outputs show decoherence-limited fidelity F as both a number and a percentage, without clamping. Node.js 24 runs the TypeScript scripts in tests using built-in type stripping; Vite transpiles them for the browser.
