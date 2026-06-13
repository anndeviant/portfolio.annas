import type { Json } from "../types/database";

export type TextLink = {
  label: string;
  url: string;
};

export function splitList(value: string | null | undefined): string[] {
  if (!value) {
    return [];
  }

  const trimmed = value.trim();

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed: unknown = JSON.parse(trimmed);

      if (Array.isArray(parsed)) {
        return parsed.filter(isNonEmptyString).map((item) => item.trim());
      }
    } catch {
      return [];
    }
  }

  return trimmed
    .split(/[,|]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function splitParagraphs(value: string | null | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function splitBullets(value: string | null | undefined): string[] {
  return splitParagraphs(value).map((item) => item.replace(/^-\s*/, "").trim());
}

export function isRecord(value: Json | undefined): value is Record<string, Json> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function jsonString(value: Json | undefined): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

export function normalizeHref(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function labelFromKey(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function extractJsonLinks(value: Json | null | undefined): TextLink[] {
  if (!isRecord(value)) {
    return [];
  }

  return Object.entries(value)
    .map(([key, item]) => {
      if (typeof item === "string") {
        return {
          label: labelFromKey(key),
          url: item,
        };
      }

      if (isRecord(item)) {
        const url = jsonString(item.url) ?? jsonString(item.href);
        const label = jsonString(item.label) ?? jsonString(item.name) ?? labelFromKey(key);

        if (url) {
          return { label, url };
        }
      }

      return null;
    })
    .filter((item): item is TextLink => Boolean(item));
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
