import type { IconType } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub, SiInstagram, SiX } from "react-icons/si";
import type { Socials } from "@/data/content";

/** Icons + labels for the social links in content.site.socials (LinkedIn isn't in Simple Icons anymore). */
export const socialMeta: Record<keyof Socials, { label: string; Icon: IconType }> = {
  github: { label: "GitHub", Icon: SiGithub },
  linkedin: { label: "LinkedIn", Icon: FaLinkedinIn },
  x: { label: "X", Icon: SiX },
  instagram: { label: "Instagram", Icon: SiInstagram },
};

/** The socials that actually have a URL, in display order. */
export function listSocials(socials: Socials) {
  return (Object.keys(socialMeta) as (keyof Socials)[])
    .filter((key) => socials[key])
    .map((key) => ({ key, href: socials[key] as string, ...socialMeta[key] }));
}
