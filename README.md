# QubitLab

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

Both fidelity pages offer single gate time and 10–100 ns range modes (1 ns steps). Range mode uses the shared `InfidelityPlot` component with logarithmic Y-axis by default, a linear-axis option, and direct mouse, touch, and keyboard inspection on the plot with values beside the selected point. Optional measured fidelity is entered as 0–100% with a measured gate time in ns. Its infidelity (`1 - percentage / 100`) appears as a red star labeled “Measured data” in the legend. A 100% measurement switches to linear scale because its infidelity is zero.

## Transmon calculator

`src/components/TransmonPage.jsx` imports `src/scripts/transmon.ts`. Enter EJ/h in GHz and EC/h in MHz. The script uses Eq. (6) and every bracket term through ξ²⁴ in Eqs. (B1) and (B2) of [Didier et al., arXiv:1706.06566v2](https://arxiv.org/pdf/1706.06566v2). It returns frequency in GHz, positive paper-convention anharmonicity in MHz, signed anharmonicity in MHz, ξ, and EJ/EC. A model-validity note appears for EJ/EC < 50. These are perturbative estimates; the displayed precision is not an accuracy guarantee.

Tests include an independent 30-state oscillator diagonalization reference at EJ/h = 10 GHz and EC/h = 200 MHz, unit scaling, sign conventions, and invalid inputs.

## Page URLs and navigation

Home is `/qbit-lab/`. Articles use `/qbit-lab/learn/introduction`, `/qbit-lab/calculators/single-qubit-fidelity`, `/qbit-lab/calculators/two-qubit-fidelity`, and `/qbit-lab/calculators/transmon`. The header Articles dropdown replaces the sidebar. Navigation updates browser history, so Back/Forward restores the previous page. Direct article links and reloads work with Vite.

For production hosting, configure an SPA fallback: serve `index.html` for unknown paths so direct article URLs work. The app displays a page-not-found view for unrecognized routes.

The home page includes Anuj Aggarwal and Pankaj Kumar Deswal with their provided LinkedIn profile links.

Run `npm run build` followed by `npm run preview` to open http://localhost:4173/qbit-lab/. All navigation and asset URLs use the configured Vite base path.

The home page uses `src/assets/schrodinger-cat.png`, generated with the built-in image generation tool. The generation and final edit prompts are saved in `src/assets/schrodinger-cat.prompt.txt`.

## UI review updates

Applied the shared UI review to the home hierarchy, sticky header, Learn/Calculators groups, compact About section, article breadcrumbs, typography, responsive controls, and calculator inputs/results. Calculators now show units beside fields, reset controls, empty result states, result interpretation, and prominent fidelity values. Fidelity formulas are available in expandable details. The existing Articles dropdown remains; the previously removed sidebar is not reintroduced. Scientific calculation scripts and URL paths are unchanged.

Navigation now uses Home, Learn, Calculators, and About on desktop and mobile; the Articles dropdown has been removed. The palette uses neutral grey-white surfaces and one primary blue for actions and results, with red reserved for errors and measured data.

QubitLab uses the supplied Bloch-sphere image at `src/assets/qubit-bloch-sphere.jpeg`. Learn, Calculators, and About navigate to home sections after React renders the destination, supporting direct hash URLs and browser Back/Forward. The existing `/qbit-lab/` deployment base is retained.

## QubitLab deployment paths

Home: `/qbit-lab/`. Learning pages use `/qbit-lab/learn/<topic>`; tools use `/qbit-lab/calculators/<topic>`. Both sections resolve all four topics, including `single-qubit-fidelity`. Home cards link to Learn for the introduction and Calculators for tools. Header section links still scroll to the corresponding home sections.

Vite builds static HTML entry points for each route so GitHub Pages supports direct links and reloads, plus a 404 entry. The deployment workflow tests and verifies those entries before uploading. For the standard GitHub project site at `https://Pankaj-Deswal.github.io/qbit-lab/`, rename the GitHub repository from `quantum-effects` to `qbit-lab` and update your local Git remote. The local changes do not rename the remote repository or deploy the site.
