# color-scheme

> Extract, convert, and generate color palettes. WCAG contrast. Terminal preview. Zero deps.

```
  ▓▓▓▓▓▓▓▓  #3498db   →   hsl(204, 70%, 53%)
  ▓▓▓▓▓▓▓▓  #e74c3c   complementary
  ▓▓▓▓▓▓▓▓  #2980b9   analogous
  Contrast 4.54:1  ✓ AA Pass
```

## Install

```bash
npx color-scheme [command]
```

Or install globally:

```bash
npm install -g color-scheme
```

---

## Quick Start

```bash
# Extract all colors from a stylesheet
colors extract styles.css

# Convert a single color
colors convert "#ff5733" --to hsl

# Check WCAG contrast
colors contrast "#ffffff" "#1a1a2e"

# Generate a palette
colors palette "#3498db" --scheme triadic

# Preview a color in the terminal
colors preview "#e74c3c"
```

---

## Commands

### `extract <file>`

Extract all unique colors from a CSS, SCSS, or JSON file.

```bash
colors extract styles.css
colors extract styles.css --format hex
colors extract styles.css --format rgb
colors extract styles.css --format hsl
```

Detects: `#rrggbb`, `#rgb`, `rgb()`, `rgba()`, `hsl()`, `hsla()`, 148 named CSS colors.

---

### `convert <color> --to <format>`

Convert a color between `hex`, `rgb`, and `hsl`.

```bash
colors convert "#ff5733" --to rgb
# rgb(255, 87, 51)

colors convert "rgb(255, 87, 51)" --to hsl
# hsl(14, 100%, 60%)

colors convert "hsl(204, 70%, 53%)" --to hex
# #3498db

colors convert "tomato" --to hex
# #ff6347
```

---

### `contrast <color1> <color2>`

Calculate WCAG 2.1 contrast ratio and pass/fail for all levels.

```bash
colors contrast "#ffffff" "#000000"
# Contrast Ratio : 21.00:1
# AA  Normal     : ✓ Pass (≥4.5:1)
# AA  Large      : ✓ Pass (≥3.0:1)
# AAA Normal     : ✓ Pass (≥7.0:1)
# AAA Large      : ✓ Pass (≥4.5:1)

colors contrast "#777777" "#ffffff"
# Contrast Ratio : 4.48:1
# AA  Normal     : ✗ Fail (≥4.5:1)
# AA  Large      : ✓ Pass (≥3.0:1)
```

---

### `palette <color> --scheme <type>`

Generate a harmonious color palette from a base color.

```bash
colors palette "#3498db" --scheme complementary
colors palette "#3498db" --scheme analogous
colors palette "#3498db" --scheme triadic
colors palette "#3498db" --scheme split
colors palette "#3498db" --scheme monochromatic
colors palette "#3498db" --scheme monochromatic --count 7
```

**Schemes:**

| Scheme | Colors | Description |
|---|---|---|
| `complementary` | 2 | Opposite on the color wheel |
| `analogous` | 3 | Adjacent hues (±30°) |
| `triadic` | 3 | Evenly spaced 120° apart |
| `split` | 3 | Base + two colors 150°/210° away |
| `monochromatic` | N | Same hue, varying lightness |

---

### `preview <color>`

Display a large ANSI color block with all format representations.

```bash
colors preview "#ff5733"
colors preview "royalblue"
colors preview "hsl(120, 60%, 40%)"
```

Output includes hex, RGB, and HSL values alongside the color swatch.

---

### `lint <file> --palette <palette.json>`

Find colors in a CSS/SCSS file that are not in your defined palette.

```bash
colors lint styles.css --palette palette.json
```

**palette.json** can be an array or object:

```json
["#3498db", "#2ecc71", "#e74c3c", "#f39c12"]
```

```json
{
  "primary": "#3498db",
  "success": "#2ecc71",
  "danger": "#e74c3c"
}
```

Exits with code `1` if violations found — integrates cleanly into CI pipelines.

---

### `export --input <file> --format <type>`

Export a color palette as CSS custom properties, SCSS variables, or a Tailwind config snippet.

```bash
colors export --input palette.json --format css-vars
colors export --input palette.json --format scss-vars
colors export --input palette.json --format tailwind
```

**Input format** (`palette.json`):

```json
{
  "primary": "#3498db",
  "accent": "#e74c3c",
  "neutral": "#95a5a6"
}
```

**css-vars output:**

```css
:root {
  --color-primary: #3498db;
  --color-accent: #e74c3c;
  --color-neutral: #95a5a6;
}
```

**scss-vars output:**

```scss
$color-primary: #3498db;
$color-accent: #e74c3c;
$color-neutral: #95a5a6;
```

**tailwind output:**

```js
// Add to tailwind.config.js → theme.extend.colors
{
  "primary": "#3498db",
  "accent": "#e74c3c",
  "neutral": "#95a5a6"
}
```

---

## Color Formats

All commands accept colors in any of these formats:

| Format | Example |
|---|---|
| Hex 6-digit | `#3498db` |
| Hex 3-digit | `#36b` |
| RGB | `rgb(52, 152, 219)` |
| RGBA | `rgba(52, 152, 219, 0.8)` |
| HSL | `hsl(204, 70%, 53%)` |
| HSLA | `hsla(204, 70%, 53%, 1)` |
| Named | `royalblue`, `tomato`, `cornflowerblue` |

148 named CSS colors supported.

---

## Use Cases

- **Design systems** — lint CSS against your token palette
- **Accessibility** — check WCAG contrast before shipping
- **Palette exploration** — generate harmonious color schemes
- **Format migration** — batch convert hex → HSL for maintainable CSS
- **CI integration** — `colors lint` exits 1 on violations

---

## Requirements

- Node.js 18+
- Zero external dependencies

---

Built with Node.js · Zero dependencies · MIT License
