import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const metadata: Metadata = {
  title: "Pillar Page: Best Way to Protect Your Outdoor Aircon Unit in Australia",
};

function stripFrontmatter(raw: string): string {
  if (!raw.startsWith("---")) return raw;
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return raw;
  return raw.slice(end + 4).replace(/^\s+/, "");
}

function mdToHtml(md: string): string {
  const escaped = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("# ")) {
        return `<h1>${trimmed.slice(2)}</h1>`;
      }
      if (trimmed.startsWith("## ")) {
        return `<h2>${trimmed.slice(3)}</h2>`;
      }
      if (trimmed.startsWith("### ")) {
        return `<h3>${trimmed.slice(4)}</h3>`;
      }
      if (trimmed.startsWith("- ")) {
        const items = trimmed
          .split("\n")
          .filter((l) => l.startsWith("- "))
          .map((l) => `<li>${l.slice(2)}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

export default async function GuidePage() {
  const filePath = path.join(process.cwd(), "content/guides/pillar-page-best-way-to-protect-your-outdoor-aircon-unit-in-.md");
  const raw = await readFile(filePath, "utf8");
  const body = stripFrontmatter(raw);
  const html = mdToHtml(body);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <article
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <p className="mt-12 text-sm text-neutral-500">
        Guide: {"pillar-page-best-way-to-protect-your-outdoor-aircon-unit-in-"} · published via ComfyMart
      </p>
    </main>
  );
}
