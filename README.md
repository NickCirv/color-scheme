<div align="center">

# color-scheme

**Extract, convert, and lint colors from CSS — with WCAG contrast checks and terminal palette previews.**

[![License: MIT](https://img.shields.io/badge/License-MIT-0B0A09?style=flat-square)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-0B0A09?style=flat-square)](package.json)
[![Node >=18](https://img.shields.io/badge/node-%3E%3D18-0B0A09?style=flat-square)](package.json)

</div>

## Install

```bash
npx github:NickCirv/color-scheme
```

## Usage

```bash
# Extract all colors from a stylesheet
colors extract styles.css

# Convert a color between formats
colors convert "#ff5733" --to hsl

# Check WCAG 2.1 contrast ratio
colors contrast "#ffffff" "#1a1a2e"

# Generate a harmonious palette
colors palette "#3498db" --scheme triadic

# Preview a color as an ANSI swatch
colors preview "#e74c3c"
```

| Command | Description |
|---|---|
| `extract <file>` | Extract all unique colors from CSS/SCSS/JSON; optional `--format hex\|rgb\|hsl` |
| `convert <color> --to <format>` | Convert between `hex`, `rgb`, and `hsl` |
| `contrast <color1> <color2>` | WCAG 2.1 contrast ratio with AA/AAA pass/fail |
| `palette <color> --scheme <type>` | Generate complementary, analogous, triadic, split, or monochromatic palette |
| `preview <color>` | ANSI terminal swatch with hex, RGB, and HSL readout |
| `lint <file> --palette <palette.json>` | Find off-palette colors; exits 1 for CI integration |
| `export --input <file> --format <type>` | Export as CSS custom properties, SCSS variables, or Tailwind config |

## What it does

Parses hex, RGB, RGBA, HSL, HSLA, and 148 named CSS colors. The `contrast` command calculates WCAG 2.1 relative luminance and reports AA/AAA pass/fail at both normal and large text sizes. The `lint` command exits with code `1` on violations, so it integrates cleanly into CI pipelines. All output is rendered in the terminal with ANSI color swatches.

---

<sub>Zero dependencies · Node ≥18 · MIT · by <a href="https://github.com/NickCirv">NickCirv</a></sub>
