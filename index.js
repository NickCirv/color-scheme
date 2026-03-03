#!/usr/bin/env node
// color-scheme — Extract, convert, and generate color palettes. Zero deps.

import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// ─── Named CSS Colors ──────────────────────────────────────────────────────────
const NAMED_COLORS = {
  aliceblue:'#f0f8ff',antiquewhite:'#faebd7',aqua:'#00ffff',aquamarine:'#7fffd4',
  azure:'#f0ffff',beige:'#f5f5dc',bisque:'#ffe4c4',black:'#000000',
  blanchedalmond:'#ffebcd',blue:'#0000ff',blueviolet:'#8a2be2',brown:'#a52a2a',
  burlywood:'#deb887',cadetblue:'#5f9ea0',chartreuse:'#7fff00',chocolate:'#d2691e',
  coral:'#ff7f50',cornflowerblue:'#6495ed',cornsilk:'#fff8dc',crimson:'#dc143c',
  cyan:'#00ffff',darkblue:'#00008b',darkcyan:'#008b8b',darkgoldenrod:'#b8860b',
  darkgray:'#a9a9a9',darkgreen:'#006400',darkgrey:'#a9a9a9',darkkhaki:'#bdb76b',
  darkmagenta:'#8b008b',darkolivegreen:'#556b2f',darkorange:'#ff8c00',
  darkorchid:'#9932cc',darkred:'#8b0000',darksalmon:'#e9967a',darkseagreen:'#8fbc8f',
  darkslateblue:'#483d8b',darkslategray:'#2f4f4f',darkslategrey:'#2f4f4f',
  darkturquoise:'#00ced1',darkviolet:'#9400d3',deeppink:'#ff1493',deepskyblue:'#00bfff',
  dimgray:'#696969',dimgrey:'#696969',dodgerblue:'#1e90ff',firebrick:'#b22222',
  floralwhite:'#fffaf0',forestgreen:'#228b22',fuchsia:'#ff00ff',gainsboro:'#dcdcdc',
  ghostwhite:'#f8f8ff',gold:'#ffd700',goldenrod:'#daa520',gray:'#808080',
  green:'#008000',greenyellow:'#adff2f',grey:'#808080',honeydew:'#f0fff0',
  hotpink:'#ff69b4',indianred:'#cd5c5c',indigo:'#4b0082',ivory:'#fffff0',
  khaki:'#f0e68c',lavender:'#e6e6fa',lavenderblush:'#fff0f5',lawngreen:'#7cfc00',
  lemonchiffon:'#fffacd',lightblue:'#add8e6',lightcoral:'#f08080',lightcyan:'#e0ffff',
  lightgoldenrodyellow:'#fafad2',lightgray:'#d3d3d3',lightgreen:'#90ee90',
  lightgrey:'#d3d3d3',lightpink:'#ffb6c1',lightsalmon:'#ffa07a',lightseagreen:'#20b2aa',
  lightskyblue:'#87cefa',lightslategray:'#778899',lightslategrey:'#778899',
  lightsteelblue:'#b0c4de',lightyellow:'#ffffe0',lime:'#00ff00',limegreen:'#32cd32',
  linen:'#faf0e6',magenta:'#ff00ff',maroon:'#800000',mediumaquamarine:'#66cdaa',
  mediumblue:'#0000cd',mediumorchid:'#ba55d3',mediumpurple:'#9370db',
  mediumseagreen:'#3cb371',mediumslateblue:'#7b68ee',mediumspringgreen:'#00fa9a',
  mediumturquoise:'#48d1cc',mediumvioletred:'#c71585',midnightblue:'#191970',
  mintcream:'#f5fffa',mistyrose:'#ffe4e1',moccasin:'#ffe4b5',navajowhite:'#ffdead',
  navy:'#000080',oldlace:'#fdf5e6',olive:'#808000',olivedrab:'#6b8e23',
  orange:'#ffa500',orangered:'#ff4500',orchid:'#da70d6',palegoldenrod:'#eee8aa',
  palegreen:'#98fb98',paleturquoise:'#afeeee',palevioletred:'#db7093',papayawhip:'#ffefd5',
  peachpuff:'#ffdab9',peru:'#cd853f',pink:'#ffc0cb',plum:'#dda0dd',powderblue:'#b0e0e6',
  purple:'#800080',rebeccapurple:'#663399',red:'#ff0000',rosybrown:'#bc8f8f',
  royalblue:'#4169e1',saddlebrown:'#8b4513',salmon:'#fa8072',sandybrown:'#f4a460',
  seagreen:'#2e8b57',seashell:'#fff5ee',sienna:'#a0522d',silver:'#c0c0c0',
  skyblue:'#87ceeb',slateblue:'#6a5acd',slategray:'#708090',slategrey:'#708090',
  snow:'#fffafa',springgreen:'#00ff7f',steelblue:'#4682b4',tan:'#d2b48c',
  teal:'#008080',thistle:'#d8bfd8',tomato:'#ff6347',turquoise:'#40e0d0',
  violet:'#ee82ee',wheat:'#f5deb3',white:'#ffffff',whitesmoke:'#f5f5f5',
  yellow:'#ffff00',yellowgreen:'#9acd32'
}

// ─── Color Parsing ─────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const h = hex.replace('#', '')
  if (h.length === 3) {
    return {
      r: parseInt(h[0] + h[0], 16),
      g: parseInt(h[1] + h[1], 16),
      b: parseInt(h[2] + h[2], 16)
    }
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16)
  }
}

function rgbToHex({ r, g, b }) {
  return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('')
}

function rgbToHsl({ r, g, b }) {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
  let h, s, l = (max + min) / 2
  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break
      case gn: h = ((bn - rn) / d + 2) / 6; break
      case bn: h = ((rn - gn) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToRgb({ h, s, l }) {
  const sn = s / 100, ln = l / 100
  const c = (1 - Math.abs(2 * ln - 1)) * sn
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = ln - c / 2
  let r = 0, g = 0, b = 0
  if (h < 60)       { r = c; g = x; b = 0 }
  else if (h < 120) { r = x; g = c; b = 0 }
  else if (h < 180) { r = 0; g = c; b = x }
  else if (h < 240) { r = 0; g = x; b = c }
  else if (h < 300) { r = x; g = 0; b = c }
  else              { r = c; g = 0; b = x }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  }
}

function parseColor(input) {
  const s = input.trim().toLowerCase()

  // Named color
  if (NAMED_COLORS[s]) return hexToRgb(NAMED_COLORS[s])

  // Hex #rrggbb or #rgb
  const hexMatch = s.match(/^#([0-9a-f]{3,6})$/)
  if (hexMatch) return hexToRgb(s)

  // rgb(r, g, b) or rgba(r, g, b, a)
  const rgbMatch = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (rgbMatch) return { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3] }

  // hsl(h, s%, l%) or hsla(...)
  const hslMatch = s.match(/^hsla?\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/)
  if (hslMatch) return hslToRgb({ h: +hslMatch[1], s: +hslMatch[2], l: +hslMatch[3] })

  return null
}

function formatColor(rgb, format) {
  if (format === 'hex') return rgbToHex(rgb)
  if (format === 'rgb') return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  if (format === 'hsl') {
    const { h, s, l } = rgbToHsl(rgb)
    return `hsl(${h}, ${s}%, ${l}%)`
  }
  return rgbToHex(rgb)
}

// ─── ANSI Terminal Preview ─────────────────────────────────────────────────────
function ansiPreview(rgb, label) {
  const { r, g, b } = rgb
  // Choose readable text color (white or black) based on luminance
  const lum = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255)
  const fg = lum > 0.5 ? '\x1b[30m' : '\x1b[97m'
  const bg = `\x1b[48;2;${r};${g};${b}m`
  const reset = '\x1b[0m'
  const swatch = '▓▓▓▓▓▓▓▓'
  return `  ${bg}${fg} ${swatch} ${reset}  ${label}`
}

// ─── WCAG Contrast ─────────────────────────────────────────────────────────────
function relativeLuminance({ r, g, b }) {
  const chan = [r, g, b].map(v => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * chan[0] + 0.7152 * chan[1] + 0.0722 * chan[2]
}

function contrastRatio(rgb1, rgb2) {
  const l1 = relativeLuminance(rgb1)
  const l2 = relativeLuminance(rgb2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// ─── Palette Generation ────────────────────────────────────────────────────────
function generatePalette(hex, scheme, count = 5) {
  const rgb = parseColor(hex)
  if (!rgb) return []
  const { h, s, l } = rgbToHsl(rgb)

  const hue = (deg) => ((deg % 360) + 360) % 360

  switch (scheme) {
    case 'complementary':
      return [hex, rgbToHex(hslToRgb({ h: hue(h + 180), s, l }))]

    case 'analogous':
      return [
        rgbToHex(hslToRgb({ h: hue(h - 30), s, l })),
        hex,
        rgbToHex(hslToRgb({ h: hue(h + 30), s, l }))
      ]

    case 'triadic':
      return [
        hex,
        rgbToHex(hslToRgb({ h: hue(h + 120), s, l })),
        rgbToHex(hslToRgb({ h: hue(h + 240), s, l }))
      ]

    case 'split':
      return [
        hex,
        rgbToHex(hslToRgb({ h: hue(h + 150), s, l })),
        rgbToHex(hslToRgb({ h: hue(h + 210), s, l }))
      ]

    case 'monochromatic': {
      const n = Math.max(2, count)
      const result = []
      for (let i = 0; i < n; i++) {
        const lightness = Math.round(15 + (70 / (n - 1)) * i)
        result.push(rgbToHex(hslToRgb({ h, s, l: lightness })))
      }
      return result
    }

    default:
      return [hex]
  }
}

// ─── Color Extraction from CSS/SCSS ───────────────────────────────────────────
function extractColorsFromSource(source) {
  const found = new Set()

  // hex colors
  const hexRe = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g
  for (const m of source.matchAll(hexRe)) found.add(m[0].toLowerCase())

  // rgb / rgba
  const rgbRe = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\s*\)/g
  for (const m of source.matchAll(rgbRe)) found.add(m[0].replace(/\s+/g, ' '))

  // hsl / hsla
  const hslRe = /hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%(?:\s*,\s*[\d.]+)?\s*\)/g
  for (const m of source.matchAll(hslRe)) found.add(m[0].replace(/\s+/g, ' '))

  // named colors (word boundary)
  const namedRe = new RegExp(`\\b(${Object.keys(NAMED_COLORS).join('|')})\\b`, 'gi')
  for (const m of source.matchAll(namedRe)) {
    found.add(m[0].toLowerCase())
  }

  return [...found]
}

// ─── Export Formats ────────────────────────────────────────────────────────────
function exportColors(colors, format) {
  switch (format) {
    case 'css-vars': {
      const lines = ['/* Generated by color-scheme */\n:root {']
      colors.forEach(({ name, value }) => {
        lines.push(`  --color-${name}: ${value};`)
      })
      lines.push('}')
      return lines.join('\n')
    }
    case 'scss-vars': {
      const lines = ['// Generated by color-scheme']
      colors.forEach(({ name, value }) => {
        lines.push(`$color-${name}: ${value};`)
      })
      return lines.join('\n')
    }
    case 'tailwind': {
      const pairs = {}
      colors.forEach(({ name, value }) => { pairs[name] = value })
      return [
        '// Generated by color-scheme',
        '// Add to tailwind.config.js → theme.extend.colors',
        JSON.stringify(pairs, null, 2)
      ].join('\n')
    }
    default:
      return JSON.stringify(colors, null, 2)
  }
}

// ─── Lint ─────────────────────────────────────────────────────────────────────
function lintColors(sourceColors, paletteColors) {
  const palette = new Set(
    paletteColors.map(c => {
      const rgb = parseColor(c)
      return rgb ? rgbToHex(rgb).toLowerCase() : c.toLowerCase()
    })
  )
  const violations = []
  for (const color of sourceColors) {
    const rgb = parseColor(color)
    const hex = rgb ? rgbToHex(rgb).toLowerCase() : color.toLowerCase()
    if (!palette.has(hex)) violations.push({ color, normalized: hex })
  }
  return violations
}

// ─── CLI ──────────────────────────────────────────────────────────────────────
function printHelp() {
  console.log(`
color-scheme — Extract, convert, and generate color palettes. Zero deps.

USAGE
  colors <command> [args] [options]

COMMANDS
  extract <file>           Extract all colors from a CSS/SCSS/JSON file
    --format hex|rgb|hsl   Convert extracted colors to format (default: original)

  convert <color> --to <format>
                           Convert a color between hex, rgb, hsl

  contrast <color1> <color2>
                           WCAG 2.1 contrast ratio + AA/AAA pass/fail

  palette <color> --scheme <type>
                           Generate harmonious palette
    Schemes: complementary | analogous | triadic | split | monochromatic
    --count <n>            Number of shades (monochromatic only, default: 5)

  preview <color>          ANSI terminal color block preview

  lint <file> --palette <palette.json>
                           Find colors not in defined palette

  export --input <file> --format <type>
                           Export colors as CSS/SCSS variables or Tailwind config
    Formats: css-vars | scss-vars | tailwind

OPTIONS
  --help, -h               Show this help
  --version, -v            Show version

EXAMPLES
  colors extract styles.css
  colors extract styles.css --format hex
  colors convert "#ff5733" --to rgb
  colors convert "rgb(255, 87, 51)" --to hsl
  colors contrast "#ffffff" "#000000"
  colors palette "#3498db" --scheme complementary
  colors palette "#3498db" --scheme monochromatic --count 7
  colors preview "#ff5733"
  colors lint styles.css --palette palette.json
  colors export --input colors.json --format css-vars
`)
}

function parseArgs(argv) {
  const args = { positional: [], flags: {}, options: {} }
  let i = 0
  while (i < argv.length) {
    const a = argv[i]
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const next = argv[i + 1]
      if (next && !next.startsWith('--')) {
        args.options[key] = next
        i += 2
      } else {
        args.flags[key] = true
        i++
      }
    } else if (a.startsWith('-') && a.length === 2) {
      args.flags[a.slice(1)] = true
      i++
    } else {
      args.positional.push(a)
      i++
    }
  }
  return args
}

function die(msg) {
  console.error(`error: ${msg}`)
  process.exit(1)
}

// ─── Command Handlers ──────────────────────────────────────────────────────────
function cmdExtract(positional, options) {
  const filePath = positional[0]
  if (!filePath) die('usage: colors extract <file> [--format hex|rgb|hsl]')
  if (!existsSync(filePath)) die(`file not found: ${filePath}`)

  const source = readFileSync(resolve(filePath), 'utf8')
  const colors = extractColorsFromSource(source)

  if (colors.length === 0) {
    console.log('No colors found.')
    return
  }

  const fmt = options.format || null
  console.log(`\nFound ${colors.length} unique color(s) in ${filePath}:\n`)

  for (const color of colors) {
    const rgb = parseColor(color)
    if (!rgb) {
      console.log(`  ${color}`)
      continue
    }
    const display = fmt ? formatColor(rgb, fmt) : color
    console.log(ansiPreview(rgb, display))
  }
  console.log()
}

function cmdConvert(positional, options) {
  const colorStr = positional[0]
  const to = options.to
  if (!colorStr || !to) die('usage: colors convert <color> --to hex|rgb|hsl')

  const rgb = parseColor(colorStr)
  if (!rgb) die(`cannot parse color: ${colorStr}`)

  const result = formatColor(rgb, to)
  console.log(`\n  ${colorStr}  →  ${result}`)
  console.log(ansiPreview(rgb, result))
  console.log()
}

function cmdContrast(positional) {
  if (positional.length < 2) die('usage: colors contrast <color1> <color2>')
  const [c1str, c2str] = positional
  const rgb1 = parseColor(c1str)
  const rgb2 = parseColor(c2str)
  if (!rgb1) die(`cannot parse color: ${c1str}`)
  if (!rgb2) die(`cannot parse color: ${c2str}`)

  const ratio = contrastRatio(rgb1, rgb2)
  const ratioStr = ratio.toFixed(2) + ':1'

  const aaLarge  = ratio >= 3.0
  const aaNormal = ratio >= 4.5
  const aaaNormal = ratio >= 7.0
  const aaaLarge = ratio >= 4.5

  console.log(`\n  ${ansiPreview(rgb1, c1str).trim()}`)
  console.log(`  ${ansiPreview(rgb2, c2str).trim()}`)
  console.log()
  console.log(`  Contrast Ratio : ${ratioStr}`)
  console.log(`  AA  Normal     : ${aaNormal  ? '✓ Pass' : '✗ Fail'} (≥4.5:1)`)
  console.log(`  AA  Large      : ${aaLarge   ? '✓ Pass' : '✗ Fail'} (≥3.0:1)`)
  console.log(`  AAA Normal     : ${aaaNormal ? '✓ Pass' : '✗ Fail'} (≥7.0:1)`)
  console.log(`  AAA Large      : ${aaaLarge  ? '✓ Pass' : '✗ Fail'} (≥4.5:1)`)
  console.log()
}

function cmdPalette(positional, options) {
  const colorStr = positional[0]
  if (!colorStr) die('usage: colors palette <color> --scheme <type> [--count n]')

  const scheme = options.scheme || 'monochromatic'
  const count = options.count ? parseInt(options.count, 10) : 5
  const validSchemes = ['complementary', 'analogous', 'triadic', 'split', 'monochromatic']
  if (!validSchemes.includes(scheme)) die(`invalid scheme. Use: ${validSchemes.join(', ')}`)

  const palette = generatePalette(colorStr, scheme, count)
  if (!palette.length) die(`cannot parse color: ${colorStr}`)

  console.log(`\n  Palette — ${scheme} (base: ${colorStr})\n`)
  for (const hex of palette) {
    const rgb = parseColor(hex)
    if (rgb) console.log(ansiPreview(rgb, hex))
  }
  console.log()
}

function cmdPreview(positional) {
  const colorStr = positional[0]
  if (!colorStr) die('usage: colors preview <color>')
  const rgb = parseColor(colorStr)
  if (!rgb) die(`cannot parse color: ${colorStr}`)

  const { h, s, l } = rgbToHsl(rgb)
  const hex = rgbToHex(rgb)

  console.log()
  console.log(ansiPreview(rgb, `  ${' '.repeat(16)}`))
  console.log(ansiPreview(rgb, `  ${' '.repeat(16)}`))
  console.log(ansiPreview(rgb, `  ${' '.repeat(16)}`))
  console.log()
  console.log(`  Input : ${colorStr}`)
  console.log(`  HEX   : ${hex}`)
  console.log(`  RGB   : rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
  console.log(`  HSL   : hsl(${h}, ${s}%, ${l}%)`)
  console.log()
}

function cmdLint(positional, options) {
  const filePath = positional[0]
  const palettePath = options.palette
  if (!filePath) die('usage: colors lint <file> --palette <palette.json>')
  if (!palettePath) die('--palette <palette.json> is required for lint')
  if (!existsSync(filePath)) die(`file not found: ${filePath}`)
  if (!existsSync(palettePath)) die(`palette file not found: ${palettePath}`)

  const source = readFileSync(resolve(filePath), 'utf8')
  const paletteRaw = JSON.parse(readFileSync(resolve(palettePath), 'utf8'))

  const paletteColors = Array.isArray(paletteRaw)
    ? paletteRaw
    : Object.values(paletteRaw)

  const sourceColors = extractColorsFromSource(source)
  const violations = lintColors(sourceColors, paletteColors)

  if (violations.length === 0) {
    console.log(`\n  ✓ All colors are in the defined palette.\n`)
    return
  }

  console.log(`\n  Found ${violations.length} color(s) not in palette:\n`)
  for (const { color, normalized } of violations) {
    const rgb = parseColor(color)
    if (rgb) {
      console.log(ansiPreview(rgb, `${color}  (${normalized})`))
    } else {
      console.log(`  ✗  ${color}`)
    }
  }
  console.log()
  process.exit(1)
}

function cmdExport(options) {
  const inputPath = options.input
  const format = options.format
  if (!inputPath) die('--input <file> is required for export')
  if (!format) die('--format css-vars|scss-vars|tailwind is required for export')
  if (!existsSync(inputPath)) die(`file not found: ${inputPath}`)

  const raw = JSON.parse(readFileSync(resolve(inputPath), 'utf8'))
  let colors

  if (Array.isArray(raw)) {
    // Array of hex strings or objects
    colors = raw.map((item, i) => {
      if (typeof item === 'string') return { name: `color-${i + 1}`, value: item }
      if (item.name && item.value) return item
      return { name: `color-${i + 1}`, value: String(item) }
    })
  } else {
    // Object: { "primary": "#3498db", ... }
    colors = Object.entries(raw).map(([name, value]) => ({ name, value }))
  }

  const output = exportColors(colors, format)
  console.log(output)
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function main() {
  const argv = process.argv.slice(2)
  const { positional, flags, options } = parseArgs(argv)

  if (flags.version || flags.v) {
    console.log('color-scheme 1.0.0')
    return
  }

  if (flags.help || flags.h || positional.length === 0) {
    printHelp()
    return
  }

  const [command, ...rest] = positional

  switch (command) {
    case 'extract': return cmdExtract(rest, options)
    case 'convert': return cmdConvert(rest, options)
    case 'contrast': return cmdContrast(rest)
    case 'palette': return cmdPalette(rest, options)
    case 'preview': return cmdPreview(rest)
    case 'lint':    return cmdLint(rest, options)
    case 'export':  return cmdExport(options)
    default:
      console.error(`unknown command: ${command}`)
      printHelp()
      process.exit(1)
  }
}

main()
