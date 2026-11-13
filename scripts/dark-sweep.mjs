/**
 * Dark-theme sweep: mechanical literal token flips across CSS.
 * Role-consistent replacements only; contextual fixes happen after.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = [
  "src/styles/base.css",
  "src/styles/layout.css",
  "src/styles/components.css",
  "src/styles/pages.css",
  "src/styles/animations.css",
];

const rules = [
  // card/form/panel surfaces -> dark panel
  ["background: var(--white)", "background: var(--panel)"],
  // text on dark bands (footer, section--dark, CTA) -> pure white
  ["color: var(--offwhite)", "color: var(--white)"],
  // light solid panels/bgs -> canvas
  ["background: var(--offwhite)", "background: var(--canvas)"],
  // gradient fade stops into the old page bg -> canvas
  [", var(--offwhite))", ", var(--canvas))"],
  // translucent white "glass" fills -> translucent dark glass
  ["rgba(255, 255, 255, 0.55)", "rgba(255, 255, 255, 0.06)"],
  ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.05)"],
  ["rgba(255, 255, 255, 0.85)", "rgba(15, 23, 19, 0.85)"],
  ["rgba(255, 255, 255, 0.86)", "rgba(15, 23, 19, 0.86)"],
  ["rgba(255, 255, 255, 0.92)", "rgba(12, 19, 15, 0.92)"],
  ["rgba(247, 248, 243, 0.92)", "rgba(9, 14, 12, 0.92)"],
  ["rgba(247, 248, 243, 0.85)", "rgba(10, 16, 13, 0.85)"],
  // green-alpha rings/glows -> brighter for dark panels
  ["rgba(23, 107, 80, 0.1)", "rgba(215, 243, 106, 0.14)"],
  ["rgba(23, 107, 80, 0.22)", "rgba(46, 160, 120, 0.36)"],
  ["rgba(23, 107, 80, 0.24)", "rgba(46, 160, 120, 0.4)"],
  ["rgba(23, 107, 80, 0.3)", "rgba(46, 160, 120, 0.45)"],
  // calculator input side + range track
  ["background: #f1f4ec", "background: #0d1411"],
  ["#d3ddd0", "rgba(255, 255, 255, 0.16)"],
];

for (const rel of files) {
  const file = path.join(root, rel);
  let css = fs.readFileSync(file, "utf8");
  let count = 0;
  for (const [from, to] of rules) {
    const parts = css.split(from);
    if (parts.length > 1) {
      count += parts.length - 1;
      css = parts.join(to);
    }
  }
  fs.writeFileSync(file, css);
  console.log(`${rel}: ${count} replacements`);
}
