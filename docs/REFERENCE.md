# color-scheme — implementation reference

Source revision: `2220cbaca13b55e54a773f0a81c7a4fda76f01f7`. This reference records source declarations; it is not a transcript of a successful run.

## Entrypoint and runtime

[package.json](https://github.com/NickCirv/color-scheme/blob/2220cbaca13b55e54a773f0a81c7a4fda76f01f7/package.json) declares `index.js`. Node.js `>=20` and npm.

Executable mapping: `color-scheme` → `./index.js`, `colors` → `./index.js`.

## Supported workflow

Source-color extraction; conversions and previews; palette generation; contrast, lint and export commands.

Source extraction uses text patterns and can miss dynamic values or context. Pairwise contrast is only one accessibility check; palette linting is not a full design audit.

## Command reference

The commands below use the installed executable name. From the pinned checkout, replace it with the `node` entrypoint shown above. Options and command branches were cross-checked against captured source; examples are not execution transcripts.

| Command | Description |
|---|---|
| `extract <file>` | Extract all unique colors from CSS/SCSS/JSON; optional `--format hex\|rgb\|hsl` |
| `convert <color> --to <format>` | Convert between `hex`, `rgb`, and `hsl` |
| `contrast <color1> <color2>` | WCAG 2.1 contrast ratio with AA/AAA pass/fail |
| `palette <color> --scheme <type>` | Generate complementary, analogous, triadic, split, or monochromatic palette |
| `preview <color>` | ANSI terminal swatch with hex, RGB, and HSL readout |
| `lint <file> --palette <palette.json>` | Find off-palette colors; exits 1 for CI integration |
| `export --input <file> --format <type>` | Export as CSS custom properties, SCSS variables, or Tailwind config |

## Package scripts

| Script | Exact command |
| --- | --- |
| `test` | `node --test` |

## Implementation sources

[index.js](https://github.com/NickCirv/color-scheme/blob/2220cbaca13b55e54a773f0a81c7a4fda76f01f7/index.js).

## Verification boundary

No repository code, tests, network operation, hook installer or migration was executed for this review. Source inspection supports the documented interface; runtime correctness and external-service compatibility remain unverified.
