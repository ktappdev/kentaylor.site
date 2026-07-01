import sharp from "sharp";

export const OG_SOCIAL_SIZE = { width: 1200, height: 630 } as const;

export const OG_STRUCTURED_SIZES = {
  "16x9": { width: 1600, height: 900 },
  "4x3": { width: 1600, height: 1200 },
  "1x1": { width: 1200, height: 1200 },
} as const;

export type OgStructuredRatio = keyof typeof OG_STRUCTURED_SIZES;

interface CreateOgImageOptions {
  title: string;
  excerpt: string;
  tags: string[];
  width: number;
  height: number;
}

export async function createBlogOgImage(
  options: CreateOgImageOptions,
): Promise<Buffer> {
  const svg = buildSvg(options);
  return sharp(Buffer.from(svg), { density: 144 }).png().toBuffer();
}

export function isOgStructuredRatio(value: string): value is OgStructuredRatio {
  return value in OG_STRUCTURED_SIZES;
}

function buildSvg({
  title,
  excerpt,
  tags,
  width,
  height,
}: CreateOgImageOptions): string {
  const padding = Math.round(width * 0.06);
  const accent = "#00ff88";
  const surface = "#141414";
  const text = "#fafafa";
  const muted = "#9ca3af";
  const isSquare = width === height;
  const titleFontSize = isSquare ? 92 : width >= 1500 ? 88 : 80;
  const excerptFontSize = isSquare ? 36 : width >= 1500 ? 34 : 32;
  const labelFontSize = isSquare ? 22 : 20;
  const brandFontSize = isSquare ? 28 : 24;
  const titleMaxChars = isSquare ? 18 : width >= 1500 ? 24 : 22;
  const excerptMaxChars = isSquare ? 24 : width >= 1500 ? 44 : 40;
  const titleLineHeight = titleFontSize + 14;
  const excerptLineHeight = excerptFontSize + 12;
  // Title baseline starts below the "BLOG POST" pill with a gap for cap height
  const titleTop = padding + 76 + 44 + 28 + Math.round(titleFontSize * 0.75);
  const bottomY = height - padding - 64;
  const dividerY = bottomY - 48;
  const titleGap = isSquare ? 48 : 28;
  // Cap title lines to available space before the divider
  const maxTitleLinesBySpace = Math.max(
    1,
    Math.floor((dividerY - titleTop) / titleLineHeight) + 1,
  );
  const titleLines = wrapText(
    title,
    titleMaxChars,
    Math.min(isSquare ? 5 : 3, maxTitleLinesBySpace),
  );
  // Excerpt starts after the last title baseline + descender + gap
  const excerptTop =
    titleTop +
    (titleLines.length - 1) * titleLineHeight +
    Math.round(titleFontSize * 0.25) +
    titleGap;
  // Cap excerpt lines to available space before the divider
  const availableExcerptSpace = dividerY - excerptTop;
  const maxExcerptLinesBySpace =
    availableExcerptSpace >= excerptFontSize
      ? 1 + Math.floor((availableExcerptSpace - excerptFontSize) / excerptLineHeight)
      : 0;
  const excerptLines = wrapText(
    excerpt,
    excerptMaxChars,
    Math.max(0, Math.min(isSquare ? 4 : 3, maxExcerptLinesBySpace)),
  );
  const tagText = tags.slice(0, 4).map((tag) => `#${tag}`).join("   ");
  const maxExcerptWidth = width - padding * 2;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="panel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${surface}" />
      <stop offset="100%" stop-color="#101010" />
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#7affc0" stop-opacity="0.35" />
    </linearGradient>
  </defs>

  <rect width="${width}" height="${height}" fill="#0a0a0a" />
  <rect x="${padding / 2}" y="${padding / 2}" width="${width - padding}" height="${height - padding}" rx="${Math.round(width * 0.03)}" fill="url(#panel)" stroke="rgba(255,255,255,0.08)" />

  <g opacity="0.08">
    ${buildGrid(width, height, padding)}
  </g>

  <rect x="${padding}" y="${padding}" width="${Math.round(width * 0.2)}" height="12" rx="6" fill="url(#glow)" />
  <text x="${padding}" y="${padding + 48}" fill="${muted}" font-size="${brandFontSize}" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" letter-spacing="3">KENTAYLOR.DEV</text>

  <g>
    <rect x="${padding}" y="${padding + 76}" width="${isSquare ? 218 : 196}" height="44" rx="22" fill="rgba(0,255,136,0.12)" stroke="rgba(0,255,136,0.35)" />
    <text x="${padding + 26}" y="${padding + 105}" fill="${accent}" font-size="${labelFontSize}" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" letter-spacing="2">BLOG POST</text>
  </g>

  <g>
    ${titleLines
      .map(
        (line, index) => `<text x="${padding}" y="${titleTop + index * (titleFontSize + 14)}" fill="${text}" font-size="${titleFontSize}" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(line)}</text>`,
      )
      .join("")}
  </g>

  <g>
    ${excerptLines
      .map(
        (line, index) => `<text x="${padding}" y="${excerptTop + index * (excerptFontSize + 12)}" fill="${muted}" font-size="${excerptFontSize}" font-family="Arial, Helvetica, sans-serif">${escapeXml(line)}</text>`,
      )
      .join("")}
  </g>

  <line x1="${padding}" x2="${padding + maxExcerptWidth}" y1="${dividerY}" y2="${dividerY}" stroke="rgba(255,255,255,0.12)" />

  <text x="${padding}" y="${bottomY}" fill="${accent}" font-size="${labelFontSize + 2}" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace">${escapeXml(tagText || "#kentaylor")}</text>
  <text x="${width - padding}" y="${bottomY}" fill="${text}" font-size="${brandFontSize}" text-anchor="end" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace">/KT</text>
</svg>`;
}

function buildGrid(width: number, height: number, padding: number): string {
  const lines: string[] = [];
  const gap = Math.round(width * 0.06);

  for (let x = padding; x < width - padding; x += gap) {
    lines.push(
      `<line x1="${x}" y1="${padding / 2}" x2="${x}" y2="${height - padding / 2}" stroke="#ffffff" stroke-width="1" />`,
    );
  }

  for (let y = padding; y < height - padding; y += gap) {
    lines.push(
      `<line x1="${padding / 2}" y1="${y}" x2="${width - padding / 2}" y2="${y}" stroke="#ffffff" stroke-width="1" />`,
    );
  }

  return lines.join("");
}

function wrapText(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";
  let wordIndex = 0;

  while (wordIndex < words.length && lines.length < maxLines) {
    const word = words[wordIndex];
    const candidate = currentLine ? `${currentLine} ${word}` : word;

    if (candidate.length <= maxChars) {
      currentLine = candidate;
      wordIndex += 1;
      continue;
    }

    if (!currentLine) {
      lines.push(truncate(word, maxChars));
      wordIndex += 1;
      continue;
    }

    lines.push(currentLine);
    currentLine = "";
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  if (wordIndex < words.length && lines.length) {
    const lastLine = lines[lines.length - 1] ?? "";
    lines[lines.length - 1] = truncate(`${lastLine}…`, maxChars);
  }

  return lines;
}

function truncate(value: string, maxChars: number): string {
  if (value.length <= maxChars) {
    return value;
  }

  return `${value.slice(0, Math.max(0, maxChars - 1)).trim()}…`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
