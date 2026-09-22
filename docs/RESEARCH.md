# color-scheme — documentation research

Reviewed 21 September 2026. Public GitHub source only.

## Revision and scope

- Commit: [`2220cbaca13b55e54a773f0a81c7a4fda76f01f7`](https://github.com/NickCirv/color-scheme/commit/2220cbaca13b55e54a773f0a81c7a4fda76f01f7).
- Tree: `524da692b318d7591d06a3ae74395560655b5388`; truncated: `false`.
- Capture: 6 of 6 eligible text files; all eligible text files.
- Method: package and entrypoint inspection, implementation-interface review, targeted behavior/limitation inspection, and test-source review. This is not an exhaustive correctness or security audit.
- Commands run against repository code: **none**. External services, deployment and npm publication were not verified.

## Claim and evidence map

| Documentation claim | Pinned evidence | Assessment |
| --- | --- | --- |
| Runtime, executable and development commands | [package.json](https://github.com/NickCirv/color-scheme/blob/2220cbaca13b55e54a773f0a81c7a4fda76f01f7/package.json) | Source declaration inspected; runtime unverified |
| Extracts and transforms source color values and generates palette exports. | [index.js](https://github.com/NickCirv/color-scheme/blob/2220cbaca13b55e54a773f0a81c7a4fda76f01f7/index.js) | Implementation interfaces inspected; behavior not executed |
| Source-color extraction; conversions and previews; palette generation; contrast, lint and export commands. | [index.js](https://github.com/NickCirv/color-scheme/blob/2220cbaca13b55e54a773f0a81c7a4fda76f01f7/index.js) | Source-backed scope, not a test result |
| Source extraction uses text patterns and can miss dynamic values or context. Pairwise contrast is only one accessibility check; palette linting is not a full design audit. | [index.js](https://github.com/NickCirv/color-scheme/blob/2220cbaca13b55e54a773f0a81c7a4fda76f01f7/index.js) | Material limits documented; service compatibility remains open |
| Existing checks | [test/smoke.test.js](https://github.com/NickCirv/color-scheme/blob/2220cbaca13b55e54a773f0a81c7a4fda76f01f7/test/smoke.test.js) | Test source read; no passing-run claim |

## Documentation inventory and disposition

| Existing document | Decision |
| --- | --- |
| [README.md](https://github.com/NickCirv/color-scheme/blob/2220cbaca13b55e54a773f0a81c7a4fda76f01f7/README.md) | Rewritten with source-specific purpose, direct checkout setup, limitations and verification status. Old section fragments retained where practical. |

Added `docs/REFERENCE.md` for the observed implementation and command surface, and this research record. Protected license and attribution files remain in their original locations without edits. No source or product UI was changed.

## Quality dimensions

| Dimension | Status | Evidence / next step |
| --- | --- | --- |
| Pinned provenance | Verified | Captured commit, tree and per-file hashes recorded below |
| Interface documentation | Partially verified | Source inspection only; run clean-checkout quickstart |
| Runtime behavior | Unverified | No repository execution in this review |
| Test results | Unverified | Existing tests were not run |
| Deployment / package availability | Unverified | No remote publish or live-service check |
| Visual / link checks | Unverified | Portfolio renderer and independent QA are separate from this authoring step |

## Unresolved issues

Source extraction uses text patterns and can miss dynamic values or context. Pairwise contrast is only one accessibility check; palette linting is not a full design audit.

## Captured source inventory

This lists captured provenance, not a claim that every line received a full audit. Binary/generated/excluded files are outside the eligible text capture.

| File | SHA-256 | Bytes |
| --- | --- | --- |
| [LICENSE](https://github.com/NickCirv/color-scheme/blob/2220cbaca13b55e54a773f0a81c7a4fda76f01f7/LICENSE) | `68729cab364d82364078b08d8580ccfa51dc69c81a7d64e8d8d47a1da6c9349d` | 1072 |
| [README.md](https://github.com/NickCirv/color-scheme/blob/2220cbaca13b55e54a773f0a81c7a4fda76f01f7/README.md) | `53143ac7a29b2701b221153f25bd6df99f0eb2340dd289b8c16234e423068c21` | 2059 |
| [package.json](https://github.com/NickCirv/color-scheme/blob/2220cbaca13b55e54a773f0a81c7a4fda76f01f7/package.json) | `0f1c986147b3eb989cfc7e8011da65fab45cf60435a149081153574f3ff04d8c` | 785 |
| [.github/workflows/ci.yml](https://github.com/NickCirv/color-scheme/blob/2220cbaca13b55e54a773f0a81c7a4fda76f01f7/.github/workflows/ci.yml) | `e818f4e6bd805f798665dbbf04964d02f12fc59dd7f18903ad63d26d374ae3f0` | 380 |
| [index.js](https://github.com/NickCirv/color-scheme/blob/2220cbaca13b55e54a773f0a81c7a4fda76f01f7/index.js) | `224981ddf1fceb316dc4c812551f29580e93b8d6e0c6db88fea1aab4233965bf` | 21200 |
| [test/smoke.test.js](https://github.com/NickCirv/color-scheme/blob/2220cbaca13b55e54a773f0a81c7a4fda76f01f7/test/smoke.test.js) | `1a21876fce1d7148992311342c9114e36a5249adac865ad0988db7d997043aba` | 334 |
