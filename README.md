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

Both fidelity pages offer single gate time and 10–100 ns range modes (1 ns steps). Range mode uses the shared `InfidelityPlot` component with logarithmic Y-axis by default, a linear-axis option, and a slider to inspect calculated points. Optional measured fidelity is entered as 0–100% with a measured gate time in ns. Its infidelity (`1 - percentage / 100`) appears as a red star labeled “Measured data” in the legend. A 100% measurement switches to linear scale because its infidelity is zero.

## Transmon calculator

`src/components/TransmonPage.jsx` imports `src/scripts/transmon.ts`. Enter EJ/h in GHz and EC/h in MHz. The script uses Eq. (6) and every bracket term through ξ²⁴ in Eqs. (B1) and (B2) of [Didier et al., arXiv:1706.06566v2](https://arxiv.org/pdf/1706.06566v2). It returns frequency in GHz, positive paper-convention anharmonicity in MHz, signed anharmonicity in MHz, ξ, and EJ/EC. A model-validity note appears for EJ/EC < 50. These are perturbative estimates; the displayed precision is not an accuracy guarantee.

Tests include an independent 30-state oscillator diagonalization reference at EJ/h = 10 GHz and EC/h = 200 MHz, unit scaling, sign conventions, and invalid inputs.

## Page URLs and navigation

Home is `/quantum-effects/`. Articles use `/quantum-effects/articles/introduction`, `/quantum-effects/articles/single-qubit-fidelity`, `/quantum-effects/articles/two-qubit-fidelity`, and `/quantum-effects/articles/transmon`. The header Articles dropdown replaces the sidebar. Navigation updates browser history, so Back/Forward restores the previous page. Direct article links and reloads work with Vite.

For production hosting, configure an SPA fallback: serve `index.html` for unknown paths so direct article URLs work. The app displays a page-not-found view for unrecognized routes.

The home page includes Anuj Aggarwal and Pankaj Kumar Deswal with their provided LinkedIn profile links.

Run `npm run build` followed by `npm run preview` to open http://localhost:4173/quantum-effects/. All navigation and asset URLs use the configured Vite base path.
