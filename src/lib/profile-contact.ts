import type { ProfileRow } from "../types/database";
import {
  extractJsonLinks,
  isRecord,
  jsonString,
  normalizeHref,
  type TextLink,
} from "./data-utils";

export function getProfileContactLinks(profile: ProfileRow): TextLink[] {
  const links: TextLink[] = [];

  const contact = profile.contact;

  if (!isRecord(contact)) {
    return links;
  }

  const email = jsonString(contact.email);
  if (email) {
    links.push({ label: "Email", url: `mailto:${email}` });
  }

  if (isRecord(contact.social)) {
    links.push(...extractJsonLinks(contact.social));
  }

  return links
    .map((link) => ({ ...link, url: normalizeHref(link.url) ?? "" }))
    .filter((link) => link.url.length > 0)
    .sort(
      (left, right) =>
        getContactLinkOrder(left.label) - getContactLinkOrder(right.label),
    );
}

function getContactLinkOrder(label: string): number {
  const normalized = label.trim().toLowerCase();

  switch (normalized) {
    case "linkedin":
      return 0;
    case "email":
      return 1;
    case "github":
      return 2;
    case "instagram":
      return 3;
    case "x":
      return 4;
    default:
      return 5;
  }
}
