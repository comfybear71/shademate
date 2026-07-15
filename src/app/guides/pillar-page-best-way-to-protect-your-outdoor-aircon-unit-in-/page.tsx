import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { readFile } from "node:fs/promises";
import path from "node:path";

const title =
  "Best Way to Protect Your Outdoor Aircon Unit in Australia";
const mdPath =
  "content/guides/pillar-page-best-way-to-protect-your-outdoor-aircon-unit-in-.md";

export const metadata: Metadata = {
  title,
};

function stripFrontmatter(raw: string): string {
  if (!raw.startsWith("---")) return raw;
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return raw;
  return raw.slice(end + 4).replace(/^\s+/, "");
}

/** Drop leading H1 — LegalPage already renders the title. */
function stripLeadingH1(md: string): string {
  return md.replace(/^#\s+[^\n]+\n+/, "");
}

function inlineMd(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-ocean-700 underline">$1</a>',
    );
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
      if (trimmed.startsWith("## ")) {
        return `<h2>${inlineMd(trimmed.slice(3))}</h2>`;
      }
      if (trimmed.startsWith("### ")) {
        return `<h3>${inlineMd(trimmed.slice(4))}</h3>`;
      }
      if (/^(- |\d+\. )/.test(trimmed)) {
        const items = trimmed
          .split("\n")
          .map((l) => l.replace(/^(- |\d+\. )/, "").trim())
          .filter(Boolean)
          .map((l) => `<li>${inlineMd(l)}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${inlineMd(trimmed.replace(/\n/g, "<br/>"))}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

export default async function GuidePage() {
  const filePath = path.join(process.cwd(), mdPath);
  const raw = await readFile(filePath, "utf8");
  const body = stripLeadingH1(stripFrontmatter(raw));
  const html = mdToHtml(body);

  return (
    <LegalPage title={title} lastUpdated="July 2026">
      <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-slate-700">
        Note: this page still renders the ComfyMart <strong>brief</strong> (not
        the finished long-form article). Expand the Markdown before promoting it
        as the main SEO pillar — see{" "}
        <Link
          href="/guides/why-outdoor-aircon-needs-shade-cover"
          className="text-ocean-700 underline"
        >
          Why Your Outdoor Aircon Unit Needs a Shade Cover
        </Link>{" "}
        for the polished guide.
      </p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <p>
        <Link href="/guides" className="text-ocean-700 underline">
          ← All guides
        </Link>
      </p>
    </LegalPage>
  );
}